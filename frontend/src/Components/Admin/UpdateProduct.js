import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

import MetaData from '../Layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct, getProductDetails, clearErrors } from '../../Redux/Actions/productActions';
import Header from '../Layout/Header';
import Sidebar from './Sidebar';
import { NEW_PRODUCT_RESET, UPDATE_PRODUCT_RESET } from '../../Redux/Constants/ProductConstants';

const UpdateProduct = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState(0)
    const [seller, setSeller] = useState('')
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    const [oldImages, setOldImages] = useState([])

    const categories = [
        'Cakes',
        'Cookies',
        'Food',
        'Small Chops',
        'Cocktails',
        'Pastries',
        'Deserts'
]


    const navigate = useNavigate();
    const params = useParams();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, product } = useSelector(state => state.productDetails);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.product);

    const productId = params.id;

    useEffect(() => {

        if(product && product._id !== productId) {
            dispatch(getProductDetails(productId))
        }else {
            setName(product.name);
            setPrice(product.price)
            setDescription(product.description)
            setCategory(product.category)
            setStock(product.stock)
            setSeller(product.seller)
            setOldImages(product.images)
        }
  
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if(isUpdated) {
          navigate('/admin/products')
          alert.success('Product updated Successfully')
          dispatch({ type: UPDATE_PRODUCT_RESET })
        }
    }, [dispatch, alert, error, updateError, isUpdated, navigate, product, productId])


    const submitHandler = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.set("name", name)
        formData.set("price", price)
        formData.set("description", description)
        formData.set("category", category)
        formData.set("stock", stock)
        formData.set("seller", seller)

        images.forEach(image => {
            formData.append('images', image)
        })
    
        dispatch(updateProduct(product._id, formData))
      }
    
      const onChange = e => {    

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])
        setOldImages([])

        files.forEach(file => {

            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2) {
                  setImagesPreview(oldArray => [...oldArray, reader.result])
                  setImages(oldArray => [...oldArray, reader.result])
                }
              }
        
              reader.readAsDataURL(file)
        })
    
      }

  return (
    <Fragment>
        <MetaData title={'Update Products'} />
        <Header/>
        <div className='new-product-dash'>
            <div className='d-flex'>
            <Sidebar/>

            <div className=''>
                <Fragment>
                <div className="">
                        <div className="new-product my-5"> 
                            <form className="shadow-lg " onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Update Product</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                    type="text"
                                    id="price_field"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    />
                            </div>

                            <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>

                            <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                               <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                            </div>
                            <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    />
                            </div>

                            <div className="form-group">
                                    <label htmlFor="seller_field">Seller Name</label>
                                    <input
                                    type="text"
                                    id="seller_field"
                                    className="form-control"
                                    value={seller}
                                    onChange={(e) => setSeller(e.target.value)}
                                    />
                            </div>
                                
                            <div className='form-group'>
                                    <label>Images</label>
                                    
                                        <div className='custom-file'>
                                            <input
                                                type='file'
                                                name='product_images'
                                                className='custom-file-input'
                                                id='customFile'
                                                onChange={onChange}
                                                multiple
                                            />
                                            <label className='custom-file-label' htmlFor='customFile'>
                                                Choose Images
                                            </label>
                                        </div>

                                        {oldImages && oldImages.map(image => (
                                            <img key={image} src={image.url} alt={image.url} className='mt-3 mr-2' width="55" height="52"/>
                                        ))}

                                        {imagesPreview.map(image => (
                                            <img src={image} key={image} alt='Images Preview' className='mt-3 mr-2' width="55" height="52" />
                                        ))}
                            </div>
                    
                            <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={loading ? true : false}
                            >
                                UPDATE
                            </button>

                            </form>
                        </div>
                    </div>
                </Fragment>
            </div>
            </div>
        </div>
    </Fragment>
  )
}

export default UpdateProduct
