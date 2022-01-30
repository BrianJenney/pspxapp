import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import finishedStyle from '../../assets/finished_style.png';
import generatePreview from '../../assets/generate_preview.png';
import selectElement from '../../assets/select_element.png';
import saveDraft from '../../assets/save_draft.png';
import cssPreview from '../../assets/css_preview.png';
import activateStyle from '../../assets/activate_style.png';
import selectOldVersion from '../../assets/select_old_version.png';
import activateOldVersion from '../../assets/activate_old_version.png';
import { LoginButton } from '../../components';
import styles from './Docs.module.css';

const Docs = () => {
    const { user } = useContext(UserContext);
    const isSubscribed = user?.hasSubscription;

    const instructions = [
        {
            rule: 'Add the following script to your site after the body',
            child: (
                <div>
                    <div className={styles.codeContainer}>
                        <code>
                            {`<script src="https://cdn.jsdelivr.net/gh/BrianJenney/pspx@latest/pspx.js"></script>`}
                        </code>
                        <br />
                        <code>
                            <pre>
                                {`<script>
if (window.pspx) {
window.pspx.init({ spaceid: <APIKEY>, isPreview: <ISPREVIEW> });
} 
</script>`}
                            </pre>
                        </code>
                    </div>
                </div>
            ),
        },
        {
            rule: 'Identify styles you want to change on your site by using the developer tools. You can choose an element by name, class or id as well as use pseduo-selectors.',
            child: '',
        },
        {
            rule: 'Add the element by name, id or class name to the style configurator.',
            child: (
                <img
                    className={styles.instructionImg}
                    src={selectElement}
                    alt="select element"
                />
            ),
        },

        {
            rule: 'Add a style rule by targeting a value you want to change such as color, margin, width, etc.',
            child: (
                <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference">
                    {' '}
                    CSS Properties
                </a>
            ),
        },
        {
            rule: 'Generate a preview of the CSS from your style configurator.',
            child: (
                <>
                    <img
                        className={styles.instructionImg}
                        src={generatePreview}
                        alt="generate preview"
                    />
                    <img
                        className={styles.instructionImg}
                        src={cssPreview}
                        alt="css preview"
                    />
                </>
            ),
        },
        {
            rule: (
                <>
                    If you'd like to to preview the styles without making them
                    live yet, you can save your style as a draft and preview it
                    on your website or staging environment. Remember, in order
                    for the preview to work, you must add <code>isPreview</code>{' '}
                    to the code in the script at step 1. One way to achieve this
                    is to have some additional code that reads that value from
                    the url as a query string like so{' '}
                    <code>OurCoolSite.com?isPreview=true </code>
                </>
            ),
            child: (
                <img
                    className={styles.instructionImg}
                    src={saveDraft}
                    alt="save draft"
                />
            ),
        },
        {
            rule: `Now that you're satisfied with your handiwork, hit save!`,
            child: null,
        },
        {
            rule: 'To make the style live on the site you must activate the style.',
            child: (
                <img
                    className={styles.instructionImg}
                    src={activateStyle}
                    alt="final style"
                />
            ),
        },
        {
            rule: 'Refresh your browser to see the changes live on your site.',
            child: (
                <img
                    className={styles.instructionImg}
                    src={finishedStyle}
                    alt="finished style"
                />
            ),
        },
    ];

    const revertInstructions = [
        {
            rule: (
                <>
                    Version control makes it easy to see what changed and when.
                    If you would like to activate an older version of a style
                    rule, simply click on the version number and click{' '}
                    <code>Save And Activate</code>
                </>
            ),
            child: (
                <>
                    <img
                        className={styles.instructionImg}
                        src={selectOldVersion}
                        alt="select old version"
                    />

                    <img
                        className={styles.instructionImg}
                        src={activateOldVersion}
                        alt="activate old version"
                    />
                </>
            ),
        },
    ];
    return (
        <section className={styles.docContainer}>
            <h2 className={styles.headline}>Getting Started with PSPX</h2>
            {isSubscribed && (
                <section className={styles.createAccountBtn}>
                    <LoginButton showLogin={false} />
                </section>
            )}
            {instructions.map(({ rule, child }, i) => (
                <div key={rule}>
                    <p>
                        <span className={styles.listNumber}>{i + 1}.</span>{' '}
                        {rule}
                    </p>
                    {child}
                    <hr />
                </div>
            ))}

            <br />
            <hr />
            <h2 className={styles.headline}>Revert to an Older Version</h2>
            {revertInstructions.map(({ rule, child }, i) => (
                <>
                    <p>
                        <span className={styles.listNumber}>{i + 1}.</span>{' '}
                        {rule}
                    </p>
                    {child}
                    <hr />
                </>
            ))}
        </section>
    );
};

export default Docs;
