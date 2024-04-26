import {
  ArrowBack,
  ArrowForward,
  Search,
  MonetizationOn,
  RemoveRedEye,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Pagination,
  PaginationItem,
  Stack,
  Badge,
  InputBase,
  IconButton,
} from '@mui/material';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { Link, useHistory } from 'react-router-dom';
import { setChosenProduct, setProducts, setRestaurant } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { Product, ProductInquiry } from '../../../lib/types/product';
import { retrieveProducts } from './selector';
import { ChangeEvent, useEffect, useState } from 'react';
import ProductService from '../../services/ProductService';
import { ProductCollection } from '../../../lib/enum/product.enum';
import { serverApi } from '../../../lib/config';

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data))
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({ products }));

export default function Products() {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => { setProducts(data) })
      .catch((err) => { console.log(err) })
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /* HANDLERS */

  const searchCollectionHandler = (collection: ProductCollection) => {
    console.log(collection);
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    console.log(order);
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`); // nested product ga kirish uchun link qo'shib beradi
  }

  return (
    <div className="products">
      <Container>
        <Stack flexDirection={'column'} alignItems={'center'}>
          <Stack className="avatar-big-box">
            <Stack className="title">Burak Restaurant</Stack>
            <Stack className="input-wrapper">
              <InputBase
                type={'search'}
                className="text-field"
                placeholder="Type here"
                value={searchText}
                onChange={(e) => { setSearchText(e.target.value) }}
                onKeyDown={(e) => { if (e.key === "Enter") searchProductHandler() }}
              />
              <IconButton
                type="button"
                className="icon-btn"
                aria-label="search"
                onClick={searchProductHandler}
              >
                search
                <Search sx={{ width: '18px', height: '18px' }} />
              </IconButton>
            </Stack>
          </Stack>

          <Stack className="dishes-filter-section">
            <Stack className="dishes-filter-box">
              <Button variant="contained" color={productSearch.order === "createdAt" ? "primary" : "secondary"} className="order" onClick={() => searchOrderHandler("createdAt")}>
                New
              </Button>
              <Button variant="contained" color={productSearch.order === "productPrice" ? "primary" : "secondary"} className="order" onClick={() => searchOrderHandler("productPrice")}>
                Price
              </Button>
              <Button variant="contained" color={productSearch.order === "productViews" ? "primary" : "secondary"} className="order" onClick={() => searchOrderHandler("productViews")}>
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className="list-category-section">
            <Stack className="product-category">
              <Button variant="contained" color={productSearch.productCollection === ProductCollection.DISH ? "primary" : "secondary"} className="order" onClick={() => searchCollectionHandler(ProductCollection.DISH)}>
                dish
              </Button>
              <Button variant="contained" color={productSearch.productCollection === ProductCollection.SALAD ? "primary" : "secondary"} className="order" onClick={() => searchCollectionHandler(ProductCollection.SALAD)}>
                salad
              </Button>
              <Button variant="contained" color={productSearch.productCollection === ProductCollection.DRINK ? "primary" : "secondary"} className="order" onClick={() => searchCollectionHandler(ProductCollection.DRINK)}>
                drink
              </Button>
              <Button variant="contained" color={productSearch.productCollection === ProductCollection.DESERT ? "primary" : "secondary"} className="order" onClick={() => searchCollectionHandler(ProductCollection.DESERT)}>
                desert
              </Button>
              <Button variant="contained" color={productSearch.productCollection === ProductCollection.OTHER ? "primary" : "secondary"} className="order" onClick={() => searchCollectionHandler(ProductCollection.OTHER)}>other
              </Button>
            </Stack>
            <Stack className="product-wrapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0].replace(/\\/, "/")}`;
                  const sizeVolume = product.productCollection === ProductCollection.DRINK ? product.productVolume + " litre" : product.productSize + "size";
                  return (
                    <Stack key={product._id} className="product-card" onClick={() => chooseDishHandler(product._id)}>
                      <Stack
                        className="product-img"
                        sx={{ backgroundImage: `url(${imagePath.replace(/\\/, "/")})` }}
                      >
                        <div className="product-sale">{sizeVolume}</div>
                        <Button className="shop-btn">
                          <img
                            src="/icons/shopping-cart.svg"
                            style={{ display: 'flex' }}
                          />
                        </Button>
                        <Button className="view-btn" sx={{ right: '36px' }}>
                          <Badge badgeContent={product.productViews} color="secondary">
                            <RemoveRedEye
                              sx={{ color: product.productViews === 0 ? "gray" : "white" }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className="product-desc">
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <div className="product-desc">
                          <MonetizationOn />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </Stack>
          </Stack>

          <Stack className="pagination-section">
            <Pagination
              count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{ previous: ArrowBack, next: ArrowForward }}
                  {...item}
                  color="secondary"
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className="brands-logo">
        <Stack className="brand-title">Our family brands</Stack>
        <Stack className="image-container">
          <Stack className="image-wrapper">
            <img src="/img/gurme.webp" />
          </Stack>
          <Stack className="image-wrapper">
            <img src="/img/seafood.webp" />
          </Stack>
          <Stack className="image-wrapper">
            <img src="/img/sweets.webp" />
          </Stack>
          <Stack className="image-wrapper">
            <img src="/img/doner.webp" />
          </Stack>
        </Stack>
      </div>


      <div className={"address"}>
        <Container>
          <Stack className={'address-area'}>
            <Box className={"address-title"}>Our address</Box>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.0865986593353!2d69.28080437587437!3d41.306979671310174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8ad59297d1cf%3A0xda0402847aed7b96!2z0JzQtdC20LTRg9C90LDRgNC-0LTQvdGL0Lkg0JLQtdGB0YLQvNC40L3RgdGC0LXRgNGB0LrQuNC5INCj0L3QuNCy0LXRgNGB0LjRgtC10YIg0LIg0KLQsNGI0LrQtdC90YLQtQ!5e0!3m2!1sru!2sus!4v1712129565608!5m2!1sru!2sus"
              width={"1250"}
              height={"500"}
              referrerPolicy='no-referrer-when-downgrade'>
            </iframe>
          </Stack>
        </Container>
      </div >)
    </div >)
}
