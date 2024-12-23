// This file is not currently in used - Removeable

import { useState } from "react";
import Item from "./components/Item";
import Form from "./components/Form";
import Header from "./components/Header";

import { useApp } from "./ThemedApp";

import { Box, Container } from "@mui/material";

function App() {

  const [data, setData] = useState(
    [
      { id: 3, content: 'This is Amy', name: 'Amy' },
      { id: 2, content: 'This is James', name: 'James' },
      { id: 1, content: 'This is Hamas', name: 'Hamas' }
    ]
  );

  const { showForm, setGlobalMsg } = useApp();

  // ---------- functions and defines -----------------------
  const remove = id => {
    // filter the items from the data state and reset state with it (filter -> id not match)
    setData(data.filter(item => item.id !== id));
    setGlobalMsg("An item deleted");
  }

  const add = (content, name) => {
    // create an id after the last
    const id = data[0].id + 1;
    setData([{ id, content, name }, ...data]);
    setGlobalMsg("An item added");
  }

  // ---------- Return UI Component -----------------------
  return (
    <Box>
      <Header />
      <Container
        maxWidth="sm"
        sx={{ mt: 4 }}>
        {showForm && <Form add={add} />}

        {data.map(item => {
          return (
            <Item
              key={item.id}
              item={item}
              remove={remove}
            />
          );
        })}

      </Container>
    </Box>
  );
}

export default App;