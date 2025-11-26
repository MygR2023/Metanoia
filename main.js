// JavaScript Document

//document.addEventListener('DOMContentLoaded', () => {
//    
//    // スライドが完全に完了するのを待つ時間 (CSSのスクロール時間に依存)
//    const SCROLL_DURATION = 800; 
//    // 自動再生の間隔（ゆっくり切り替わるように設定）
//    const INTERVAL_TIME = 4000; 
//
//    const slider = document.querySelector('.slider');
//    // クローンを含むすべてのimg要素を取得
//    const allImages = slider.querySelectorAll('img');
//    // 元の画像数（クローンを除く）
//    const totalRealImages = allImages.length - 2; 
//    let scrollInterval;
//
//    // 初期インデックスはクローンをスキップした「1」から開始
//    let currentIndex = 1; 
//
//    // 画像の幅を取得する関数
//    function getImageWidth() {
//        // 画像がロードされ、レイアウトが確定している前提で正確な幅を取得
//        return allImages[0] ? allImages[0].getBoundingClientRect().width : 0;
//    }
//    
//    // ----------------------------------------------------
//    //  初期位置の設定
//    // ----------------------------------------------------
//    function setInitialPosition() {
//        const imageWidth = getImageWidth();
//        if (imageWidth === 0) return;
//        
//        // 最初のロード時、クローン要素を避けて、#slider01 にアニメーションなしで移動
//        slider.style.scrollBehavior = 'auto'; 
//        slider.scrollLeft = currentIndex * imageWidth; // index 1 の位置
//        
//        // スクロール処理のためにアニメーションを 'smooth' に戻す
//        setTimeout(() => {
//           slider.style.scrollBehavior = 'smooth'; 
//        }, 50);
//    }
//
//
//    // ----------------------------------------------------
//    //  スクロール処理の本体関数
//    // ----------------------------------------------------
//    function autoScroll() {
//        const imageWidth = getImageWidth();
//        if (imageWidth === 0) return;
//
//        // 次のインデックスへ
//        currentIndex++;
//        
//        // スクロール位置を計算
//        slider.scrollLeft = currentIndex * imageWidth;
//
//        // 【無限ループ処理】
//        // 1. 最後のクローン（index == totalRealImages + 1）に到達した場合
//        if (currentIndex >= totalRealImages + 1) {
//            
//            // スクロールアニメーションが完了するのを待つ
//            setTimeout(() => {
//                // アニメーションを一時的に無効化
//                slider.style.scrollBehavior = 'auto';
//                
//                // 本当の最初の画像（index 1）の位置に一瞬でリセット
//                slider.scrollLeft = 1 * imageWidth; 
//                currentIndex = 1;
//                
//                // 次のフレームでアニメーションを 'smooth' に戻す
//                setTimeout(() => {
//                   slider.style.scrollBehavior = 'smooth';
//                }, 50); 
//            }, SCROLL_DURATION); 
//        }
//    }
//    
//    // 自動再生を開始/再開する関数（中略：前回と同じ）
//    function startAutoScroll() {
//        if (scrollInterval) {
//            clearInterval(scrollInterval);
//        }
//        scrollInterval = setInterval(autoScroll, INTERVAL_TIME); 
//    }
//    
//    // ----------------------------------------------------
//    //  実行開始のタイミング
//    // ----------------------------------------------------
//    window.addEventListener('load', () => {
//        setInitialPosition(); // 初期位置設定
//        startAutoScroll();    // 自動再生開始
//    });
//
//    // ----------------------------------------------------
//    //  ユーザー操作時の制御（中略：前回と同じ）
//    // ----------------------------------------------------
//    slider.addEventListener('mouseenter', () => {
//        clearInterval(scrollInterval);
//    });
//    
//    slider.addEventListener('mouseleave', () => {
//        startAutoScroll();
//    });
//});

//document.addEventListener('DOMContentLoaded', () => {
//    const storyPages = document.querySelectorAll('.story-page');
//
//    // Intersection Observer のオプション設定
//    // rootMargin: 画面の上下端からどれくらい手前で検知するか ('0px'は画面の端)
//    // threshold: 要素の何パーセントが見えたら検知するか (0.1は10%)
//    const options = {
//        root: null, // ビューポートをルート（監視対象の親）とする
//        rootMargin: '0px',
//        threshold: 0.1 // 要素の10%が見えたら発火
//    };
//
//    // Intersection Observer のコールバック関数
//    const observer = new IntersectionObserver((entries, observer) => {
//        entries.forEach(entry => {
//            // 要素が画面に交差している（見えている）場合
//            if (entry.isIntersecting) {
//                // is-visible クラスを追加してアニメーションを開始
//                entry.target.classList.add('is-visible');
//                // 一度アニメーションしたら監視を停止（繰り返さないように）
//                observer.unobserve(entry.target); 
//            }
//        });
//    }, options);
//
//    // 各ストーリーページを監視対象として登録
//    storyPages.forEach(page => {
//        observer.observe(page);
//    });
//});


//いい感じクリック動作//

//document.addEventListener('DOMContentLoaded', () => {
//    // 1. 要素の取得
//    const storyContainer = document.querySelector('#Story'); // スクロールコンテナ
//    const storyPages = document.querySelectorAll('.story-page'); // 全ページ
//    const totalPages = storyPages.length; // 全ページ数
//
//    // 2. 状態管理
//    let currentPageIndex = 0; // 0から始まる現在のページインデックス
//
//    // 3. クリックで次のページへ移動する関数
//    function goToNextPage() {
//        // 現在のページインデックスをインクリメント
//        const nextPageIndex = currentPageIndex + 1;
//
//        // 最後のページ以降の場合は、何もしない、あるいは最初のページに戻る（ループさせる場合）
//        if (nextPageIndex >= totalPages) {
//            // ループさせたくない場合はここで return;
//            // return; 
//            
//            // 最後のページまで行ったら、最初のページに戻る（ループさせる場合）
//            goToPage(0); 
//            return;
//        }
//
//        goToPage(nextPageIndex);
//    }
//    
//    // 特定のページにスクロールする関数
//    function goToPage(index) {
//        // ページのインデックスが有効な範囲内にあるか確認
//        if (index >= 0 && index < totalPages) {
//            // 現在のインデックスを更新
//            currentPageIndex = index;
//
//            // スクロール位置を計算し、次のページへスクロール
//            // height: 100vh が適用されているため、インデックス * 画面の高さ で位置がわかる
//            const targetScrollPosition = currentPageIndex * window.innerHeight;
//            
//            storyContainer.scrollTo({
//                top: targetScrollPosition,
//                behavior: 'smooth' // CSSの scroll-behavior: smooth; がなくても滑らかに動く
//            });
//            
//            // 画像のフェードインアニメーションをトリガーする（前のコードの is-visible を利用）
//            storyPages[currentPageIndex].classList.add('is-visible');
//        }
//    }
//
//
//    // 4. イベントリスナーの設定
//    // スクロールコンテナ全体をクリックトリガーとする
//    storyContainer.addEventListener('click', goToNextPage);
//    
//    // 最初のページに is-visible クラスを適用し、初期表示アニメーションを実行
//    if (storyPages.length > 0) {
//        storyPages[0].classList.add('is-visible');
//    }
//});

document.addEventListener('DOMContentLoaded', () => {
    const storyContainer = document.querySelector('#Story');
    const storyPages = document.querySelectorAll('.story-page');
    const totalPages = storyPages.length;
    let currentPageIndex = 0;

    function goToNextPage() {
        const nextPageIndex = currentPageIndex + 1;

        // 最後のページに到達した場合の処理
        if (nextPageIndex >= totalPages) {
            // 1. #Story の次の要素（次の major section）を取得
            const nextSection = storyContainer.nextElementSibling;

            if (nextSection) {
                // 2. ウィンドウ全体を、次のセクションの位置までスムーズにスクロール
                window.scrollTo({
                    // nextSection のページ上端からの距離を取得
                    top: nextSection.offsetTop, 
                    behavior: 'smooth' // スムーズなアニメーションを適用
                });
            }
            
            // 最後のページに到達したため、これ以上内部スクロールはしない
            return; 
        }

        // 最後のページでなければ、通常の内部ページ遷移を実行
        goToPage(nextPageIndex);
    }
    
    // ... goToPage 関数はそのまま ...
    function goToPage(index) {
        if (index >= 0 && index < totalPages) {
            currentPageIndex = index;
            const targetScrollPosition = currentPageIndex * window.innerHeight;
            
            storyContainer.scrollTo({
                top: targetScrollPosition,
                behavior: 'smooth'
            });
            
            storyPages[currentPageIndex].classList.add('is-visible');
        }
    }
    
    // イベントリスナーの設定
    storyContainer.addEventListener('click', goToNextPage);
    
    // 最初のページ初期表示
    if (storyPages.length > 0) {
        storyPages[0].classList.add('is-visible');
    }
});
