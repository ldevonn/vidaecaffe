import {useNavigate, useParams} from "react-router-dom";
import {StyledForm, StyledField, StyledSelect, StyledSubmit} from '../ProductFormPage/ProductFormPage.jsx'
import {editExistingProduct} from "../../redux/menu.js";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from 'yup'
import {useFormik} from "formik";
import {useEffect} from "react";

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

export default function EditDrink() {
    const products = useSelector(state => state.menu.products);
    const {drinkId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.session.user);

    const product = products &&  products.filter(product => product.id == drinkId)[0];

    const {handleSubmit,
    handleChange,
    values,
    errors
    } = useFormik({
        initialValues: {
            name: (product && product.name) || "",
            desc: (product && product.description) || "",
            price: (product && product.price) || "",
            category: (product && product.category) || "",
        },
        validationSchema,
        onSubmit: async (values) => {
            const serverResponse = await dispatch(
                editExistingProduct({
                    id: product.id,
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
                <h3 style={{background: 'none', color: "white", marginBottom: '50px'}}>Edit your existing product</h3>
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
                </StyledSelect>
                <StyledField
                    name='product_img'
                    value={values.product_img}
                    type='file'
                    disabled
                    onChange={handleChange}
                />
                <StyledSubmit type='submit'>Submit</StyledSubmit>
            </StyledForm>
        </>
    );
}

