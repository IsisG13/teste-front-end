import type { Product } from '../../types/product';
import './ProductCard.scss';

interface ProductCardProps {
    product: Product;
    onOpenModal: () => void;
}

export default function ProductCard({ product, onOpenModal }: ProductCardProps) {
    const formattedPrice = product.price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return (
        <article className="product-card" onClick={onOpenModal}>
            <div className="product-image">
                <img src={product.photo} alt={product.productName} />
            </div>
            <div className="product-info">
                <h3>{product.productName}</h3>
                <p className="description">{product.descriptionShort}</p>
                <span className="price">{formattedPrice}</span>
            </div>
            <button className="buy-button" onClick={(e) => {
                e.stopPropagation();
                onOpenModal();
            }}>
                COMPRAR
            </button>
        </article>
    );
}
