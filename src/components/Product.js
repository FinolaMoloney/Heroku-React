function Product(props) {
    return (
        <div>
            <h3>
                {props.title}
            </h3>
            <p>
                {props.description}
            </p>
            <p>
                {props.price}
            </p>
            <p>
                {props.stock ? "In Stock" : "Out of Stock"}
            </p>
            <p>
                {props.gluten_free ? "Gluten Free" : "Not Gluten Free"}
            </p>
            <p>
                {props.diary_free ? "Diary Free" : "Not Diary Free"}
            </p>
        </div>
    )
}

export default Product;