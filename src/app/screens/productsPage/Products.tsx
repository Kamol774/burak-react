import * as React from 'react';
import { Box, Button, Container, InputBase, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveredEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../../../css/products.css"
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { CardOverflow, CssVarsProvider } from '@mui/joy';


const products = [
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
];

export default function Products() {
  return (
    <div className={"products"}>
      <Container>
        <Stack >
          <Stack className={"avatar-big-box"}>
            <Box className={"restaurant-title"}>Burak Restaurant</Box>
            <Stack className={"search-box"}
              component="form"
              sx={{ alignItems: 'end', width: 400 }}
            >
              <InputBase className="InputBase"
                sx={{ mr: 15, flex: 1 }}
                placeholder="Type here"
              />
              <Button
                variant={"contained"}
                color={"primary"}
                className={"order search-button"}
              >
                SEARCH<SearchIcon sx={{ fontSize: "medium" }} />
              </Button>
            </Stack>
          </Stack>
          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button
                variant={"contained"}
                color={"primary"}
                className={"order"}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                color={"secondary"}
                className={"order"}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                color={"secondary"}
                className={"order"}
              >
                Views
              </Button>
            </Stack>
          </Stack>
          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <Button
                variant={"contained"}
                color={"secondary"}
                className={"order"}
              >
                OTHER
              </Button>
              <Button
                variant={"contained"}
                color={"secondary"}
                className={"order"}
              >
                DESERT
              </Button>
              <Button
                variant={"contained"}
                color={"secondary"}
                className={"order"}
              >
                DRINK
              </Button>
              <Button
                variant={"contained"}
                color={"secondary"}
                className={"order"}
              >
                SALAD
              </Button>
              <Button
                variant={"contained"}
                color={"primary"}
                className={"order"}
              >
                DISH
              </Button>
            </Stack>

            <Stack className={"product-wrapper"}>
              <CssVarsProvider>

                {products.length !== 0 ? (
                  products.map((product, index) => {
                    return (
                      <Card
                        className="cards-frame"
                        variant="plain"
                        sx={{
                          width: "305px",
                          bgcolor: 'initial',
                        }}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <CardOverflow>
                            <div className="product-sale">Normal Size</div>
                            <AspectRatio ratio="1">
                              <img className={"img-box"} src={product.imagePath} alt="" />
                            </AspectRatio>
                          </CardOverflow>
                          <CardCover
                            className="gradient-cover"
                            sx={{
                              '&:hover, &:focus-within': {
                                opacity: 1,
                              },
                              opacity: 0,
                              transition: '0.1s ease-in',
                              background:
                                'linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)',
                            }}
                          >
                            {/* The first box acts as a container that inherits style from the CardCover */}
                            <div>
                              <Box
                                sx={{
                                  p: 2,
                                  display: 'flex',
                                  alignItems: 'center',
                                  ml: "33%",
                                  gap: 3,
                                  flexGrow: 1,
                                  alignSelf: 'flex-end',
                                }}
                              >
                                <IconButton
                                  className='shop-btn'
                                  variant="solid"
                                >
                                  <img src={'/icons/shopping-cart.svg'}
                                    style={{ display: "flex" }} />
                                </IconButton>
                                <IconButton
                                  size="sm"
                                  variant="solid"
                                  color="neutral"
                                  sx={{ bgcolor: 'rgba(0 0 0 / 0.2)' }}
                                >
                                  {/* <Badge badgeContent={20} color='secondary'> */}
                                  <RemoveredEyeIcon
                                    sx={{ color: 20 ? "gray" : "white" }} />
                                  {/* </Badge> */}
                                </IconButton>
                              </Box>
                            </div>
                          </CardCover>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                          <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>
                            {product.productName}
                          </Typography>
                        </Box>
                        <Box className="price" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                          <MonetizationOnIcon />{15}
                        </Box>
                      </Card>
                    );
                  })) : (
                  <Box className="no-data">Products are not available!</Box>
                )
                }
              </CssVarsProvider>

              <Stack className={"pagination-section"}>
                <Pagination
                  count={3}
                  page={1}
                  renderItem={(item) => (
                    <PaginationItem
                      components={{
                        previous: ArrowBackIcon,
                        next: ArrowForwardIcon,
                      }}
                      {...item}
                      color={'secondary'}
                    />
                  )}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>

      <div className={"brands-logo"}>
        <Container>
          <Stack className='brand-title'>Our Family Brands</Stack>
          <Stack className='brand-list'>
            <Box className="brand"><img src={'/img/gurme.webp'} /></Box>
            <Box className="brand"><img src={'/img/seafood.webp'} /></Box>
            <Box className="brand"><img src={'/img/sweets.webp'} /></Box>
            <Box className="brand"><img src={'/img/doner.webp'} /></Box>
          </Stack>
        </Container>
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
    </div>)
}
