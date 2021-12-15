(function () {
    if (!window.hasOwnProperty('SlideText')) window.SlideText = SlideText;

    /**
     * Плагин прокрутки текста при наведении курсора мыши
     *
     * @param {object} options Настройки
     *
     * @version 29.05.2019
     * @author  DimNS <atomcms@ya.ru>
     */
    function SlideText(options) {
        var inlineSize = function (el) {
            var hiddenStyle = 'left:-10000px;top:-10000px;height:auto;width:auto;position:absolute;';
            var clone       = document.createElement('div');

            document.all ? clone.style.setAttribute('cssText', hiddenStyle) : clone.setAttribute('style', hiddenStyle);
            clone.innerHTML = el.html();
            parent.document.body.appendChild(clone);
            var rect = {width: clone.clientWidth, height: clone.clientHeight};
            parent.document.body.removeChild(clone);

            return rect;
        };

        // Настройки по-умолчанию, расширяя их с помощью параметров, которые были переданы
        var settings = jQuery.extend({
            'elbox'    : '.slidetext',
            'elcontent': '.slidetext__content',
            'speed'    : 177 // px\sec
        }, options);

        jQuery(document).on('mouseover', settings.elbox, function () {
            var elemContent = jQuery(this).find(settings.elcontent);
            var sizes       = inlineSize(jQuery(this));
            var distance    = sizes.width - jQuery(this).width();
            var time        = distance / settings.speed; // time (sec) = distance / speed

            elemContent.css({
                'margin-left'               : '-' + distance + 'px',
                'transition-property'       : 'margin-left',
                'transition-duration'       : time + 's',
                'transition-timing-function': 'linear'
            });
        }).on('mouseout', settings.elbox, function () {
            jQuery(this).find(settings.elcontent).css({
                'margin-left'               : '0',
                'transition-property'       : 'margin-left',
                'transition-duration'       : '0.5s',
                'transition-timing-function': 'linear'
            });
        });
    }
})();