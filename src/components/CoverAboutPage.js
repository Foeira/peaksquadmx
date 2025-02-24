
import { useTranslation } from "react-i18next";

function TextAbout() {

    const { t } = useTranslation();
    

  return (
    <div className="container pt-5">
  <div className="row justify-content-around">
    <div className="col-6 text-primary fs-1 fw-bolder text-center align-content-center">
      {t('aboutPage.aboutText')}
    </div>

    <div className="col-6 text-justify fs-5 pb-5">
    {t('aboutPage.aboutString')}

    </div>

    </div>


 

  
  </div>
  )
}

export default TextAbout;