import { Dialog } from '../ui/dialog'
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'

function ProductDetailsDialog({ open, setOpen, productDetails }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:p-8 p-4 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[60vw] bg-white rounded-xl shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Image Section */}
                    <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                        <img
                            src={productDetails?.image}
                            alt={productDetails?.title}
                            width={500}
                            height={500}
                            className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col gap-6">
                        <DialogHeader>
                            <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-800">
                                {productDetails?.title}
                            </DialogTitle>
                        </DialogHeader>
                        <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                            {productDetails?.description}
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                            <p
                                className={`text-2xl sm:text-3xl font-semibold ${
                                    productDetails?.salePrice > 0
                                        ? 'text-gray-500 line-through'
                                        : 'text-primary'
                                }`}
                            >
                                ${productDetails?.price}
                            </p>
                            {productDetails?.salePrice > 0 && (
                                <p className="text-2xl sm:text-3xl font-semibold text-green-600">
                                    ${productDetails?.salePrice}
                                </p>
                            )}
                        </div>
                        <div className="mt-6">
                            <button className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailsDialog