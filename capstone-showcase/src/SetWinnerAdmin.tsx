export function SetWinnerAdmin( setSelectionMade: (position: number) => void, handleSelectionClose: () => void) {
  <div className="edit-project-container">
        <button onClick={handleSelectionClose} className="edit-close-btn">&times;</button>
      <h2>Set Project Winner</h2>
      <form className="edit-project-form">
        <section>
          <label htmlFor="project-title">Project Title:</label>
          <input
            type="text"
            id="project-title"
            name="project-title"
            defaultValue={project.ProjectTitle}
          />
        </section>

        <section>
          <label htmlFor="project-description">Project Description:</label>
          <textarea
            id="project-description"
            name="project-description"
            defaultValue={project.ProjectDescription}
          />
        </section>

        <section>
          <label htmlFor="sponsor">Sponsor:</label>
          <input
            type="text"
            id="sponsor"
            name="sponsor"
            defaultValue={project.Sponsor}
          />
        </section>

        <section>
          <label>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={project.Email}
          />
        </section>

        <section>
          <label>Course Number:</label>
          <input
            type="text"
            id="course-number"
            name="course-number"
            defaultValue={project.CourseNumber}
          />
        </section>

        <section>
          <label>Members:</label>
          <div className="members-list">
            {members.map((member, index) => (
              <div key={index} className="member-input-group">
                <input
                  type="text"
                  value={member}
                  onChange={(e) => updateMember(index, e.target.value)}
                  placeholder="Enter member name"
                />
                <button 
                  type="button" 
                  onClick={() => removeMember(index)}
                  className="remove-member-btn"
                >
                  ×
                </button>
              </div>
            ))}
            <button type="button" onClick={addMember} className="add-member-btn">
              + Add Member
            </button>
          </div>
        </section>

        <section className="checkbox-group">
          <div>
            <input
              type="checkbox"
              id="demo"
              name="demo"
              defaultChecked={project.Demo === "Yes"}
            />
            <label htmlFor="demo">Demo Required</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="power"
              name="power"
              defaultChecked={project.Power === "Yes"}
            />
            <label htmlFor="power">Power Required</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="nda"
              name="nda"
              defaultChecked={project.NDA === "Yes"}
            />
            <label htmlFor="nda">NDA Required</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="should-display"
              name="should-display"
              defaultChecked={project.ShouldDisplay === "Yes"}
            />
            <label htmlFor="should-display">Should Display</label>
          </div>
        </section>

        <section>
          <label>Video Link:</label>
          <input
            type="url"
            id="video-link"
            name="video-link"
            defaultValue={project.VideoLinkRaw}
          />
        </section>



        <section className="form-buttons">
          <button type="submit" className="save-btn">Save Changes</button>
          <button type="button" className="cancel-btn">Cancel</button>
        </section>
      </form>
    </div>
  );
}