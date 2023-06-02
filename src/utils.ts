function fixUrl(url: string): string {
  if (import.meta.env.MODE === "development") {
    console.log("DEV MODE");
    return "http://localhost:1515" + url;
  } else {
    console.log("PRODUCTION MODE");
    return "https://caramel-caster-388616.oa.r.appspot.com" + url;
  }
}
export { fixUrl };

function allImgNames(imgName: string) {
  if (imgName.startsWith("https")) {
    return imgName;
  } else {
    return fixUrl(`/img/${imgName}`);
  }
}
export { allImgNames };

// export default React
// export { useState, useEffect }
// import React, { useState } from 'react'
