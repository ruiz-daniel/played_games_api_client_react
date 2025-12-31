const DashboardButton = ({icon = 'desktop', text, action, style}) => {
  const styles = {
    width: 150,
    height: 150,
    ...style
  }
  const iconStyles = {
    fontSize: styles.height / 4
  }

  return (
    <div className="flex flex-col items-center justify-center shadow-2xl bg-amber-50/50 cursor-pointer hover:bg-amber-200 transition-all" onClick={action} style={styles}>
      <div>
       <i className={`pi pi-${icon}`} style={iconStyles}></i>
      </div>
      <div>
        <h2 className="m-1">{text}</h2>
      </div>
    </div>
  );
}

export default DashboardButton