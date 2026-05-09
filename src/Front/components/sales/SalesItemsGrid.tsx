export function SalesItemsGrid() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  return (
    <div className="sales_items_grid">
      <div className="cards_container">
        {items.map((item, index) => {
          return (
            <div key={index} className="item_grid_container">
              <p>{item}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
