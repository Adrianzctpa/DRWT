import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import GeneralContext from "../../context/GeneralContext"
import styles from '../../../static/css/Backgrounds.module.css'
import formStyles from "../../../static/css/Form.module.css"

const CreateVRoom = ( {mode, patchSubmit} ) => {

    const {tokens, refreshContent} = useContext(GeneralContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        let formData = new FormData()
        formData.append("title", e.target.title.value)
        formData.append("guest_pause_permission", e.target.pause_perm.checked)
        formData.append("videopath", e.target.vpath.files[0])

        if (Object.fromEntries(formData)['videopath'] === 'undefined') {
            return alert('You need to upload a video/image.')
        }

        let response = await fetch("/v1/vroomset/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${tokens.access}`
            },
            body: formData
        })
        let data = await response.json()
        
        if (response.status === 200) {
            refreshContent()
            navigate(`/videoroom/${data.resp.uuid}/`)
        }  
    }

    return (
        <>  
            { mode !== 'edit' ?
            <div className={styles.bg_color_strongred}>
                <div className={`${formStyles.form} ${styles.bg_color_lightblack}`}>
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label class="form-label">Title:</label>
                            <input type="text" class="form-control" name="title" />
                        </div>

                        <div class="mb-3 form-check">
                            <input type="checkbox" name='pause_perm' class="form-check-input"/>
                            <label class="form-check-label">Permission for guests to pause</label>
                        </div>

                        <div class="mb-3">
                            <label for="formFile" class="form-label">Select a video or image to share:</label>
                            <input class="form-control" type="file" name='vpath' accept="image/png, image/jpeg, image/jpg, image/webp, video/mp4, video/x-m4v" />
                        </div>

                        <button type="submit" class='btn btn-primary'>Create</button>
                    </form>
                </div>
            </div> : (
            <div id="editform" className={`${formStyles.form} ${styles.bg_color_lightblack}`} style={{display: 'none', marginBottom: '50px'}}>
                <form onSubmit={patchSubmit}>
                    <div class="mb-3">
                        <label class="form-label">Title:</label>
                        <input type="text" class="form-control" name="title" />
                    </div>

                    <div class="mb-3 form-check">
                        <input type="checkbox" name='pause_perm' class="form-check-input"/>
                        <label class="form-check-label">Permission for guests to pause</label>
                    </div>

                    <div class="mb-3">
                        <label for="formFile" class="form-label">Select a video or image to share:</label>
                        <input class="form-control" type="file" name='vpath' accept="image/png, image/jpeg, image/jpg, image/webp, video/mp4, video/x-m4v" />
                    </div>

                    <button type="submit" class='btn btn-primary'>Edit</button>
                </form>
            </div>
            )
            }
        </>  
    )    
}

export default CreateVRoom;