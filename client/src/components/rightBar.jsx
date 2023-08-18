function RightBar() {
  return (
    <aside className="h-[calc(100vh-105px)] basis-1/3 bg-white mr-[20px] mt-[20px] rounded-md p-[20px]">
      <div>
        <div>
          <h2 className="text-[25px] text-center">Today&apos;s Recipe</h2>
          <div>
            <div>
              <p>Breakfast</p>
            </div>
            <div>
              <p>Lunch</p>
            </div>
            <div>
              <p>Dinner</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-[25px] text-center mt-[20px]">Remaining</h2>
          <p>4 days</p>
          <p>$34,89</p>
        </div>
      </div>
    </aside>
  );
}

export default RightBar;
