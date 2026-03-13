function Stats({stats}){

  return(

    <div className="stats">

      <div>Total Errors: {stats.totalErrors}</div>

      <div>New Errors: {stats.newErrors}</div>

      <div>Duplicate Errors: {stats.duplicateErrors}</div>

    </div>

  );

}

export default Stats;