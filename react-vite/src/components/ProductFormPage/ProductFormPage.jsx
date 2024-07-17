import styled from '@emotion/styled'
import {createNewProduct} from "../../redux/menu.js";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import * as Yup from 'yup'
import {useFormik} from "formik";

const validationSchema = Yup.object({
    name: Yup.string()
        .required("Product name must be provided"),
    desc: Yup.string()
        .required("Product description must be provided"),
    price: Yup.number()
        .required("Price must be provided")
        .min(1, 'Number must be a positive integer'),
    category: Yup.string()
        .required("Product category must be provided"),
})

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
    margin-bottom: 10px;
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
    const currentUser = useSelector(state => state.session.user)

    const {handleSubmit,
        handleChange,
        values,
        errors
    } = useFormik({
        initialValues: {
            name: "",
            desc: "",
            price: "",
            category: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            const serverResponse = await dispatch(
                createNewProduct({
                    name: values.name,
                    description: values.desc,
                    price: values.price,
                    category: values.category,
                    product_img: 'none'
                })
            );
            if (serverResponse && !serverResponse.errors) {
                navigate(`/drinks/${serverResponse.id}`);
            }

        }
    })

    useEffect(() => {
        if (!currentUser || currentUser.role !== 'admin') {
            navigate('/')
        }
    }, [currentUser, navigate]);


    return (
        <>
            <StyledForm onSubmit={handleSubmit}>
                <h3 style={{background: 'none', color: "white", marginBottom: '50px'}}>Create a new product</h3>
                <StyledField
                    type='text'
                    name='name'
                    value={values.name}
                    placeholder='Name'
                    onChange={handleChange}
                    required
                />
                <p id='errors'>{errors.name}</p>
                <StyledField
                    type='text'
                    name='desc'
                    value={values.desc}
                    placeholder='Description'
                    onChange={handleChange}
                    required
                />
                <p id='errors'>{errors.desc}</p>
                <StyledField
                    type='number'
                    value={values.price}
                    min='0'
                    step='0.01'
                    name='price'
                    placeholder='Price'
                    onChange={handleChange}
                    required
                />
                <p id='errors'>{errors.price}</p>
                <StyledSelect
                    name='category'
                    value={values.category}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Choose...</option>
                    <option value='hot-coffee'>Hot Coffee</option>
                    <option value='hot-tea'>Hot Tea</option>
                    <option value='iced-coffee'>Iced Coffee</option>
                    <option value='iced-tea'>Iced Tea</option>
                </StyledSelect>
                <StyledSubmit type='submit'>Submit</StyledSubmit>
            </StyledForm>
        </>
    )
}

export default ProductFormPage