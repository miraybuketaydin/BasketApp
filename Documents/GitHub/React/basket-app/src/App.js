import { useState } from "react";
import {
  Container,
  List,
  Badge,
  ThemeIcon,
  SimpleGrid,
  Input,
  Indicator,
  Button,
  Group,
  Drawer,
  CardSection,
} from "@mantine/core";

import { IconCircleCheck, IconShoppingCart } from "@tabler/icons";
import Card from "./components/Card";
import "./App.css";

const storeItems = [
  {
    id: 100,
    name: "Fotoğraf Makinesi",
    src: "camera",
    price: 20,
  },
  {
    id: 101,
    name: "Kulaklık",
    src: "headphone",
    price: 10,
  },
  {
    id: 102,
    name: "Oyun Konsolu",
    src: "joystick",
    price: 25,
  },
  {
    id: 103,
    name: "Retro Fotoğraf Makinesi",
    src: "retrocam",
    price: 25,
  },
  {
    id: 104,
    name: "Oyuncak Araba",
    src: "toycar",
    price: 25,
  },
  {
    id: 105,
    name: "Kol Saati",
    src: "watch",
    price: 25,
  },
];

function App() {
  let [opened, setOpened] = useState(false);
  let [basketItems, setBasketItems] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let filteredItems = storeItems.filter(
    (item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
  );

  let addToBasket = ({ id, name }) => {
    let basketIndex = basketItems.findIndex((item) => item.id == id);
    if (basketIndex >= 0) {
      let _basketItems = [...basketItems];
      _basketItems[basketIndex].count++;
      setBasketItems(_basketItems);
    } else {
      setBasketItems([...basketItems, { id, name, count: 1 }]);
    }
  };

  return (
    <Container>
      <Group align="end">
        <Input.Wrapper label="Arama">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Input.Wrapper>
        <Button onClick={() => setSearchValue("")}>Temizle</Button>
        <Indicator color="red" label={basketItems.length} size={22}>
          <Button onClick={() => setOpened(true)}>
            icon=
            {
              <ThemeIcon>
                <IconShoppingCart size={18} />
              </ThemeIcon>
            }
          </Button>
        </Indicator>
      </Group>
      <SimpleGrid cols={3} className="Store">
        {filteredItems.map(({ id, name, src }) => {
          return (
            <Card
              key={name}
              name={name}
              src={src}
              onAdd={() => addToBasket({ id, name })}
            />
          );
        })}
      </SimpleGrid>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Sepetim"
        padding="md"
        size="md"
      >
        <List
          className="List"
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck size={16} />
            </ThemeIcon>
          }
        >
          {basketItems.map(({ name, count }, index) => (
            <List.Item key={index}>
              <Group>
                <div>{name}</div>
                <Badge>{count}</Badge>
              </Group>
            </List.Item>
          ))}
        </List>
      </Drawer>
    </Container>
  );
}

export default App;
