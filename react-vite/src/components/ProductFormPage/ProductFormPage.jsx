import styled from '@emotion/styled'
import {createNewProduct} from "../../redux/menu.js";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 37.5625rem;
    padding: 5.5rem;
    margin: 0 auto;
    background: #1C1C1C;
    text-align: center;
    border-radius: 1rem;
`

export const StyledField = styled.input`
    height: 3rem;
    border-radius: 5px;
    border: none;
    background: #3B3B3B;
    margin-bottom: 20px;
    color: white;
    padding-left: 30px;
`

export const StyledSubmit = styled.button`
    align-self: center;
    background-color: var(--color-button);
    border: none;
    border-radius: 15px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 10rem;
    height: 4rem;
    font-size: 1.5rem;
    padding: 0;
    
    &:hover {
        cursor: pointer;
        transition: 0.1s;
        background-color: var(--color-button-hover);
    }
`

export const StyledSelect = styled.select`
    color: white;
`

const ProductFormPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const description = event.target.desc.value;
        const price = parseInt(event.target.price.value);
        const category = event.target.category.value;
        const product_img = 'none'

        const newProduct = await dispatch(
            createNewProduct({
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
                <h3 style={{background: 'none', color: "white", marginBottom: '50px'}}>Create a new product</h3>
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
    )
}

export default ProductFormPage