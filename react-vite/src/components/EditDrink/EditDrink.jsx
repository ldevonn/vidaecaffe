import {useNavigate, useParams} from "react-router-dom";
import {StyledForm, StyledField, StyledSelect, StyledSubmit} from '../ProductFormPage/ProductFormPage.jsx'
import {editExistingProduct} from "../../redux/menu.js";
import {useDispatch} from "react-redux";

export default function EditDrink() {
    const {drinkId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const id = parseInt(drinkId);
        const name = event.target.name.value;
        const description = event.target.desc.value;
        const price = parseInt(event.target.price.value);
        const category = event.target.category.value;
        const product_img = 'none'

        const newProduct = await dispatch(
            editExistingProduct({
                id,
                name,
                description,
                price,
                category,
                product_img
            })
        );
        navigate(`/drinks/${newProduct.id}`)
    }

    return (
        <>
            <StyledForm onSubmit={handleSubmit}>
                <h3 style={{background: 'none', color: "white", marginBottom: '50px'}}>Edit your existing product</h3>
                <StyledField type='text' name='name' placeholder='Name'></StyledField>
                <StyledField type='text' name='desc' placeholder='Description'></StyledField>
                <StyledField type='number' min='0' step='0.01' name='price' placeholder='Price'></StyledField>
                <StyledSelect name='category'>
                    <option value="" disabled>Choose...</option>
                    <option value='hot-coffee'>Hot Coffee</option>
                </StyledSelect>
                <StyledField type='file'></StyledField>
                <StyledSubmit type='submit'>Test</StyledSubmit>
            </StyledForm>
        </>
    );
}

