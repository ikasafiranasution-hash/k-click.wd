import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, Order } from '../../types';
import { uploadProtectedPaymentProofFile, deleteProtectedStorageFile } from '../../services/firebase';
import { isPhotoboothFrameProduct } from '../../data/mockProducts';
import { siteConfig } from '../../config/siteConfig';
import { X, QrCode, Upload, CheckCircle2, ShieldCheck, Clock, Camera, Download, Loader2 } from 'lucide-react';

interface CheckoutModalProps {
  product: Product;
  onClose: () => void;
}

const generateUniqueOrderId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `ORD-${Date.now()}-${crypto.randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase()}`;
  }
  const randomSuffix = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `ORD-${Date.now()}-${randomSuffix}`;
};

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ product, onClose }) => {
  const {
    user,
    createOrder,
    downloadProductFile,
    applyProductToPhotobooth,
    setActiveTab,
    showToast,
    setIsAuthModalOpen,
  } = useApp();

  const [orderId] = useState<string>(() => generateUniqueOrderId());
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreviewUrl, setProofPreviewUrl] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const paymentCfg = siteConfig.payment;
  const isFree = product.price === 0;
  const isFrameTemplate = isPhotoboothFrameProduct(product);

  const handleInstantFreeClaim = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    setIsUploading(true);
    try {
      const freeOrder: Order = {
        id: orderId,
        buyerId: user.id,
        buyerName: user.name,
        buyerEmail: user.email,
        productId: product.id,
        productName: product.name,
        creatorId: product.creatorId,
        amount: 0,
        status: 'paid',
        verifiedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      await createOrder(freeOrder);
      setIsSubmitted(true);
      showToast('Karya gratis berhasil ditambahkan ke koleksi My Gallery!', 'success');
      if (product.productFile) {
        await downloadProductFile(product, orderId);
      }
    } catch (err: any) {
      console.error('Free claim error:', err);
      showToast(err?.message || 'Gagal mengklaim karya gratis. Silakan coba lagi.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate format: JPG, JPEG, PNG, WEBP
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      showToast('Format gambar tidak valid. Gunakan file JPG, PNG, atau WEBP.', 'error');
      return;
    }

    // Validate size: max 5MB
    if (file.size > 5 * 1024 * 1024) {
      showToast('Ukuran file bukti pembayaran terlalu besar (maksimal 5MB).', 'error');
      return;
    }

    setProofFile(file);
    setProofPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmitProof = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!proofFile) {
      showToast('Silakan pilih file bukti pembayaran terlebih dahulu.', 'error');
      return;
    }

    setIsUploading(true);
    let uploadedStoragePath: string | null = null;
    try {
      // Upload directly to protected Firebase Storage: payments/{userId}/{orderId}/proof.{ext}
      const ext = proofFile.name.split('.').pop() || 'jpg';
      const storagePath = `payments/${user.id}/${orderId}/proof.${ext}`;
      await uploadProtectedPaymentProofFile(proofFile, storagePath);
      uploadedStoragePath = storagePath;

      const newOrder: Order = {
        id: orderId,
        buyerId: user.id,
        buyerName: user.name,
        buyerEmail: user.email,
        productId: product.id,
        productName: product.name,
        creatorId: product.creatorId,
        amount: product.price,
        status: 'waiting_verification',
        proofImage: storagePath,
        createdAt: new Date().toISOString(),
      };

      await createOrder(newOrder);
      setIsSubmitted(true);
      showToast(
        `Bukti pembayaran "${product.name}" berhasil dikirim! Menunggu persetujuan Admin (klick.wd@gmail.com).`,
        'info'
      );
    } catch (err) {
      console.error('Failed to upload proof or create order:', err);
      // Clean up uploaded file if order creation failed to prevent orphan storage files
      if (uploadedStoragePath) {
        try {
          await deleteProtectedStorageFile(uploadedStoragePath);
        } catch (cleanupErr) {
          console.warn('Gagal menghapus orphan payment proof:', cleanupErr);
        }
      }
      showToast('Gagal memproses pesanan dan bukti pembayaran. Silakan coba kembali.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="text-center mb-6">
              <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-pink-100 text-pink-700 tracking-wider">
                Digital Checkout
              </span>
              <h3 className="text-2xl font-bold font-display text-slate-900 mt-2">
                Konfirmasi Pembelian
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Order ID: <span className="font-mono font-bold text-slate-700">{orderId}</span>
              </p>
            </div>

            {/* Product Summary Card */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
              <img
                src={product.previewImage}
                alt={product.name}
                className="w-16 h-16 rounded-xl object-cover border border-slate-200"
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-pink-600 uppercase tracking-wide">
                  {product.category}
                </div>
                <div className="text-sm font-bold text-slate-900 truncate">
                  {product.name}
                </div>
                <div className="text-xs text-slate-500">Karya oleh {product.creatorName}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-extrabold text-slate-900">
                  {product.price === 0 ? 'FREE' : `Rp ${product.price.toLocaleString('id-ID')}`}
                </div>
              </div>
            </div>

            {/* If product is Free */}
            {isFree ? (
              <div className="text-center py-4">
                <p className="text-sm text-slate-600 mb-5">
                  Item ini disediakan gratis oleh kreator! Klik tombol di bawah untuk langsung menambahkan ke galeri dan mendapatkan file resolusi tinggi.
                </p>
                <button
                  onClick={handleInstantFreeClaim}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-sm shadow-lg shadow-pink-500/25 active:scale-95 transition-all"
                >
                  Klaim & Download Sekarang (Gratis)
                </button>
              </div>
            ) : (
              /* Official Manual QRIS Payment System */
              <div className="space-y-5">
                <div className="p-5 rounded-3xl bg-slate-900 text-white shadow-lg relative overflow-hidden">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-[11px] font-bold mb-2 border border-pink-500/30">
                      <QrCode className="w-3.5 h-3.5 text-pink-400" />
                      <span>QRIS Standar Pembayaran Nasional</span>
                    </div>

                    <div className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
                      Rp {product.price.toLocaleString('id-ID')}
                    </div>
                    <div className="text-xs font-semibold text-pink-300 mt-1">
                      K-CLICK, DIGITAL & KREATIF
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      NMID: ID1026592549699
                    </div>
                  </div>

                  {/* Official QRIS Image Container - Generous Whitespace, No Overlay, Uncropped */}
                  <div className="max-w-[280px] sm:max-w-[310px] bg-white p-3 rounded-2xl mx-auto shadow-2xl border border-slate-100 flex flex-col items-center justify-center">
                    <img
                      src={paymentCfg.qrImageUrl || '/qris-kclick.png'}
                      alt="QRIS Pembayaran Resmi K-CLICK, DIGITAL & KREATIF"
                      className="w-full h-auto object-contain rounded-xl select-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Clear, focused instructions */}
                  <div className="mt-4 text-[11px] text-slate-300 space-y-1.5 bg-black/30 p-3 rounded-2xl border border-white/10">
                    <div className="font-bold text-pink-300 text-[11px] uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-pink-400" />
                      <span>Instruksi Pembayaran:</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed">
                      1. Buka aplikasi e-wallet (GoPay, ShopeePay, Dana, OVO) atau mobile banking (BCA, Mandiri, BRI, BNI, dll.).
                    </p>
                    <p className="text-slate-200 leading-relaxed">
                      2. Pindai kode QRIS di atas dan pastikan nama merchant tertera <strong>K-CLICK, DIGITAL & KREATIF</strong>.
                    </p>
                    <p className="text-slate-200 leading-relaxed">
                      3. Pastikan nominal pembayaran tepat <strong>Rp {product.price.toLocaleString('id-ID')}</strong>.
                    </p>
                    <p className="text-slate-200 leading-relaxed">
                      4. Simpan bukti pembayaran resmi QRIS berhasil (screenshot atau tanda terima transaksi), lalu unggah pada bagian di bawah untuk diverifikasi manual oleh admin.
                    </p>
                  </div>
                </div>

                {/* Upload Payment Proof Section */}
                <div className="p-4 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-center">
                  <div className="text-xs font-bold text-slate-800 mb-1">
                    Upload Bukti Pembayaran (Screenshot / Tanda Terima QRIS)
                  </div>
                  <p className="text-[11px] text-slate-500 mb-3">
                    Format file JPG, PNG, atau WebP
                  </p>

                  {proofPreviewUrl ? (
                    <div className="relative max-w-[200px] mx-auto rounded-xl overflow-hidden border border-slate-200 mb-2">
                      <img src={proofPreviewUrl} alt="Bukti Pembayaran" className="w-full h-28 object-cover" />
                      <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold">
                        Siap Kirim ✓
                      </div>
                    </div>
                  ) : null}

                  <label className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 cursor-pointer transition-colors shadow-xs">
                    <Upload className="w-4 h-4 text-slate-500" />
                    <span>{proofFile ? 'Ganti File Bukti' : 'Pilih Bukti Pembayaran (Maks 5MB)'}</span>
                    <input 
                      type="file" 
                      accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" 
                      onChange={handleProofUpload} 
                      disabled={isUploading}
                      className="hidden" 
                    />
                  </label>
                </div>

                <button
                  onClick={handleSubmitProof}
                  disabled={!proofFile || isUploading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-pink-500/25 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mengunggah Bukti ke Cloud Storage...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Kirim Bukti Pembayaran</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        ) : isFree ? (
          /* Free Order Instant Activation Status */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-bold font-display text-slate-900">
              Karya Gratis Berhasil Diambil!
            </h3>

            <div className="mt-2 text-xs text-slate-600 max-w-sm mx-auto space-y-3">
              <p>
                Order ID: <span className="font-mono font-bold text-slate-800">{orderId}</span>
              </p>
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-left text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Status: Aktif & Siap Digunakan</span>
                </div>
                <p className="text-[11px] text-emerald-700 leading-relaxed">
                  {isFrameTemplate
                    ? `Frame "${product.name}" telah dibuka untuk akunmu! Kamu bisa langsung mengaplikasikan frame ini di Photobooth Live atau mengunduh file Master PNG.`
                    : `Karya "${product.name}" telah aktif di koleksi My Gallery → Karya Terbeli dan siap diunduh.`}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              {isFrameTemplate && (
                <button
                  onClick={() => {
                    onClose();
                    applyProductToPhotobooth(product);
                  }}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-pink-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Pakai Frame Ini di Photobooth Live Sekarang</span>
                </button>
              )}

              <button
                onClick={() => downloadProductFile(product, orderId)}
                className="w-full py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download File Master PNG (High-Res)</span>
              </button>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={() => {
                    onClose();
                    setActiveTab('gallery');
                  }}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  Buka My Gallery
                </button>
                <button
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Paid Order Submitted -> Waiting for Admin Verification Status */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center mb-4">
              <Clock className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-bold font-display text-slate-900">
              Menunggu Persetujuan Admin
            </h3>

            <div className="mt-2 text-xs text-slate-600 max-w-md mx-auto space-y-3">
              <p>
                Order ID: <span className="font-mono font-bold text-slate-800">{orderId}</span>
              </p>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-left text-xs space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-amber-800">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Status: Menunggu Verifikasi Admin (klick.wd@gmail.com)</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Bukti pembayaran QRIS sebesar <strong>Rp {product.price.toLocaleString('id-ID')}</strong> untuk <strong>"{product.name}"</strong> telah berhasil diunggah dan masuk ke antrean verifikasi Admin.
                </p>
                <p className="text-[11px] text-amber-700 leading-relaxed">
                  {isFrameTemplate
                    ? 'Setelah disetujui (ACC) oleh Admin, frame ini akan otomatis terbuka dan siap langsung digunakan di Photobooth Live maupun diunduh dari My Gallery!'
                    : 'Setelah disetujui (ACC) oleh Admin, tombol Download File Master HD akan otomatis aktif di menu My Gallery.'}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  onClose();
                  setActiveTab('gallery');
                }}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-pink-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Clock className="w-4 h-4" />
                <span>Pantau Status Verifikasi di My Gallery</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Tutup & Kembali
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
