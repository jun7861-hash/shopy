'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Button from '@/components/button';
import TextField from '@/components/field/text';
import Link from '@/components/link';
import List from '@/components/list';
import ListItem from '@/components/list/item';
import { ActionType, ProductType, useAppContext } from '@/ducks/context';
import Heading from '@/components/heading';
import { inputHandler } from '@/helpers/inputHandler';

const Manage = () => {
  const { state, dispatch } = useAppContext();

  const [product, setProduct] = useState<ProductType>({
    id: uuidv4(),
    name: '',
    description: '',
    price: 0,
  });
  const [viewedProduct, setViewedProduct] = useState<ProductType | {}>({});
  const [updatedProduct, setUpdatedProduct] = useState<ProductType | {}>({});

  const handleChangeNewProduct = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    inputHandler<ProductType>(event, setProduct);
  };

  const handleChangeUpdatedProduct = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    inputHandler<ProductType>(event, setUpdatedProduct);
  };

  const handleViewProduct = (product: {
    id: string;
    name: string;
    description: string;
    price: number;
  }) => {
    setViewedProduct(product);
    setUpdatedProduct({});
  };

  const handleDeleteProduct = (id: string) => {
    const productAction: ActionType = {
      type: 'DELETE_PRODUCT',
      payload: { id },
    };
    const cartAction: ActionType = {
      type: 'DELETE_CART_ITEM',
      payload: { id },
    };

    dispatch(productAction);
    dispatch(cartAction);
    setUpdatedProduct({});
    setViewedProduct({});
  };

  const handleSubmitUpdateProduct = () => {
    const product = updatedProduct as {
      id: string;
    };
    const action: ActionType = {
      type: 'UPDATE_PRODUCT',
      payload: { id: product.id },
    };
    dispatch(action);
    setViewedProduct(product);
    setUpdatedProduct({});
  };

  const handleCloseViewedProduct = () => {
    setViewedProduct({});
  };

  const handleViewEditedProduct = () => {
    setUpdatedProduct(viewedProduct);
    setViewedProduct({});
  };

  const handleCloseUpdatedProduct = () => {
    setUpdatedProduct({});
  };

  const handleSubmitNewProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const action: ActionType = { type: 'ADD_PRODUCT', payload: product };
    dispatch(action);
  };

  return (
    <div>
      <Link href="/shop">Shop</Link>
      <Heading variant="h1">Manage Products</Heading>

      <div style={{ display: 'flex', width: '100%' }}>
        <section style={{ width: '50%', padding: '10px' }}>
          <List>
            {state.products.map((product) => (
              <ListItem key={product.id}>
                <Heading variant="h2">{product.name}</Heading>
                <div>
                  <Button onClick={() => handleViewProduct(product)}>
                    View
                  </Button>
                  <Button onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </Button>
                </div>
              </ListItem>
            ))}
          </List>

          <Heading variant="h2">New Product</Heading>
          <form method="POST" onSubmit={handleSubmitNewProduct}>
            <TextField
              name="name"
              label="Product Name"
              onChange={handleChangeNewProduct}
              value={product.name}
              isRequired
            />
            <TextField
              name="description"
              label="Product Description"
              onChange={handleChangeNewProduct}
              value={product.description}
              isRequired
            />
            <TextField
              name="price"
              type="number"
              label="Product Price"
              onChange={handleChangeNewProduct}
              value={product.price}
              isRequired
            />

            <Button type="submit">Add</Button>
          </form>
        </section>

        <section style={{ width: '50%', padding: '10px' }}>
          {viewedProduct && 'id' in viewedProduct && (
            <div className="view">
              <Heading variant="h2">{viewedProduct.name}</Heading>
              <p>Description: {viewedProduct.description}</p>
              <br />
              <p>Price: {viewedProduct.price}</p>
              <div>
                <Button onClick={handleCloseViewedProduct}>Close</Button>
                <Button onClick={handleViewEditedProduct}>Edit</Button>
              </div>
            </div>
          )}
          {updatedProduct && 'id' in updatedProduct && (
            <div className="edit">
              <form method="POST" onSubmit={handleSubmitUpdateProduct}>
                <TextField
                  name="name"
                  label="Product Name"
                  onChange={handleChangeUpdatedProduct}
                  value={updatedProduct.name}
                  isRequired
                />
                <TextField
                  name="description"
                  label="Product Description"
                  onChange={handleChangeUpdatedProduct}
                  value={updatedProduct.description}
                  isRequired
                />
                <TextField
                  name="price"
                  type="number"
                  label="Product Price"
                  onChange={handleChangeUpdatedProduct}
                  value={updatedProduct.price}
                  isRequired
                />
              </form>

              <div>
                <Button onClick={handleCloseUpdatedProduct}>Close</Button>
                <Button>Save</Button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Manage;
