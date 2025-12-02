---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHCYPGXC%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T050948Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIAjhqcOvwkdtSpKxD%2Bocnj2yjHKxRDngx4uf2G8vz%2BrmAiEA3PV%2FnzkCTGbN%2FywJDmEngyz2%2FP4lKdmHXGVrbX1blhIq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDBTcL%2B0iTjscYIHaTSrcA80tOjK1d7kOKWRAYTDFM770pD91nblajcSxwBz3RdNliQf4qzkGRQOc15L3Em0dJt544KdBD1haD56dcPKHNT9U1YwKTRDyrYutPbmTvch5PqdE6ZTSRJjLtTDRB2Kf0dkaOBM%2BZt4cnHsvSyf6qB5j4yHrMLkDqF9MLAC7gbAqW%2BHYPZclTlLe3aeX2kIZ%2FujXv%2F9cFqRA8TlnYO5qIqOTC0vZPy79%2FofNX98uUYsysN8JMk9FmcjJ%2BBIVoVaGVPEcWlFnj3QTheqmAtuwJm1NH0yulUCOkar9pFNf8EJ8zIH8FaB3ZMpFew5at1Vc6T6J%2FMTlFki63zyEAUdPXmFbgT2dxyX5WBp%2Fb8XsFEj%2F%2FliYCIRbXnDPhyhkFVkxZA5yxFiulHzY1rz81SzkystP3ktpbaTv%2Feuk4wx5I3yv%2Bm5gK4qvFHfb%2BzEacOTOVAjkbOZ1HBxs2tPKQsEWAxnDLA6UiFlny%2FYI%2FSeZnYGgsNp0R643wOVSZ6v8jnm0Cec6Ql2JMe9K7EELAsMYXpvuhc286dBjInFz3iSXOD4EhQvzft1zQWGYVKWhylAcl44vFf1gZ0aD4lB8wiUH%2F3nnmLQE9xVui5GjbVH74yZXFQwW15Si6nRqAFxyMMCiuckGOqUBtq05lTRmpIhttcsZyS1mzfAry0xRGScUjctjIKJSXy8Sj8tWaCll627s7O%2FjmHkvKKd451tx2KK%2B38chRqM87aemCYFPbFNyUhZyWej4%2BC3uFssV%2FsLGt9KDTR7X2CvbSXHukt1AesO7xbvcuzg9P16aP55Gs9gTLNCRccWE5X7iHD8yjjyXarWLtIMOvsdR0BDdT4PJMHE4jYErLySxcPVH0ZcL&X-Amz-Signature=5d00d46b2dcd151c81e5d07cc39fad6cebb6a3199249d9690cd8865890e92516&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHCYPGXC%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T050948Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIAjhqcOvwkdtSpKxD%2Bocnj2yjHKxRDngx4uf2G8vz%2BrmAiEA3PV%2FnzkCTGbN%2FywJDmEngyz2%2FP4lKdmHXGVrbX1blhIq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDBTcL%2B0iTjscYIHaTSrcA80tOjK1d7kOKWRAYTDFM770pD91nblajcSxwBz3RdNliQf4qzkGRQOc15L3Em0dJt544KdBD1haD56dcPKHNT9U1YwKTRDyrYutPbmTvch5PqdE6ZTSRJjLtTDRB2Kf0dkaOBM%2BZt4cnHsvSyf6qB5j4yHrMLkDqF9MLAC7gbAqW%2BHYPZclTlLe3aeX2kIZ%2FujXv%2F9cFqRA8TlnYO5qIqOTC0vZPy79%2FofNX98uUYsysN8JMk9FmcjJ%2BBIVoVaGVPEcWlFnj3QTheqmAtuwJm1NH0yulUCOkar9pFNf8EJ8zIH8FaB3ZMpFew5at1Vc6T6J%2FMTlFki63zyEAUdPXmFbgT2dxyX5WBp%2Fb8XsFEj%2F%2FliYCIRbXnDPhyhkFVkxZA5yxFiulHzY1rz81SzkystP3ktpbaTv%2Feuk4wx5I3yv%2Bm5gK4qvFHfb%2BzEacOTOVAjkbOZ1HBxs2tPKQsEWAxnDLA6UiFlny%2FYI%2FSeZnYGgsNp0R643wOVSZ6v8jnm0Cec6Ql2JMe9K7EELAsMYXpvuhc286dBjInFz3iSXOD4EhQvzft1zQWGYVKWhylAcl44vFf1gZ0aD4lB8wiUH%2F3nnmLQE9xVui5GjbVH74yZXFQwW15Si6nRqAFxyMMCiuckGOqUBtq05lTRmpIhttcsZyS1mzfAry0xRGScUjctjIKJSXy8Sj8tWaCll627s7O%2FjmHkvKKd451tx2KK%2B38chRqM87aemCYFPbFNyUhZyWej4%2BC3uFssV%2FsLGt9KDTR7X2CvbSXHukt1AesO7xbvcuzg9P16aP55Gs9gTLNCRccWE5X7iHD8yjjyXarWLtIMOvsdR0BDdT4PJMHE4jYErLySxcPVH0ZcL&X-Amz-Signature=5d00d46b2dcd151c81e5d07cc39fad6cebb6a3199249d9690cd8865890e92516&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVRJZ5RU%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T050949Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCvtIVAX6d3T0zp3VdrmRvhHCptZx%2Fa%2F%2FHxELXt5DM6LwIhAPyveOpVDQ9m6zTOfroXomHZeGM64Ifm8JTt6yDTURhsKv8DCAwQABoMNjM3NDIzMTgzODA1IgyQAHjJyZ0kEK%2FsSc0q3APIiIY9e83i0Fz25OQa8sPB81wT2N4p%2BdAZmEYKFnqrWEhr2P3vXYtvtmTzd7Z2t7Ast6fTzsLIuEZge8X9WT2yRo3VmWTWXSbZhGQAKtzJbdLPy83vfpUAMPHBitCDxyygY%2B0dUoslutKH86Dum7AW9%2F1dhr58QjEP5Y5MeseWHpLh%2BgtAD4hSABZqBQ8lbLs3RSqmkjsQMPicdJSfc9ZeBCzMrGAdA5x14Rgk9HqDbLyFGxhT%2Fl97hPUN92FaNKF83Bc83QmIGenPit6YHwwrPFYf6763yyzBw5er6sGgXob70NinEoPHhnTs5DImi9Xe9rk%2FQieDfWecVmkLcw5%2FxofTqDTBYC8B7YyKEFp1i2su1%2Fb%2B80dRsZDu27Y1C5Qo7TqECeIH6gZkFvq1GFIN33P0Q9ZmxMW49woAbc9xjsi3ZU8g0YQ3quG0C0wyeuONi8A7DVBoGjPKjSP%2BVFEH0ti7jIm%2FgwezI0j7RhG4mHQlAerSdyrsQhwEy0v8mUKdahcE66YNnetfZrCglmaGR6nVNBSGw25D7HJ7dYDWSy5crqE47tkE6NFIrtGMJCALkpYMrSl7VKgxlDVkF8ydOTb6CkMJ8Q8nx3GjmqNLqZn3wPyNyHoqEInJmDDJornJBjqkAcFW9BcdERPrGlefqLACPdhSJ7eAXk3H5GAPh1seGwSg5gtyqBFQoS4b7seOKRR%2FNxFujnRfFEADXLzF%2BJJE%2BIyu0j9L%2B9HSJpqwQp4lebk%2Fyf%2Fj35od4aLgCVDNAPop8%2Fd%2FVly4YA1iWEwSww3GuFUEWIid7qF0EL%2F5j36w8u8c38RmbyunsBmZGjun%2BDm%2B3SwU62jQAmCt4fbDeWq9kB%2B0AZOa&X-Amz-Signature=32a16f4820b1865ccff9583227f4b0e1010b8e5fe24c46b595e6428f9eff7a89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVRJZ5RU%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T050949Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCvtIVAX6d3T0zp3VdrmRvhHCptZx%2Fa%2F%2FHxELXt5DM6LwIhAPyveOpVDQ9m6zTOfroXomHZeGM64Ifm8JTt6yDTURhsKv8DCAwQABoMNjM3NDIzMTgzODA1IgyQAHjJyZ0kEK%2FsSc0q3APIiIY9e83i0Fz25OQa8sPB81wT2N4p%2BdAZmEYKFnqrWEhr2P3vXYtvtmTzd7Z2t7Ast6fTzsLIuEZge8X9WT2yRo3VmWTWXSbZhGQAKtzJbdLPy83vfpUAMPHBitCDxyygY%2B0dUoslutKH86Dum7AW9%2F1dhr58QjEP5Y5MeseWHpLh%2BgtAD4hSABZqBQ8lbLs3RSqmkjsQMPicdJSfc9ZeBCzMrGAdA5x14Rgk9HqDbLyFGxhT%2Fl97hPUN92FaNKF83Bc83QmIGenPit6YHwwrPFYf6763yyzBw5er6sGgXob70NinEoPHhnTs5DImi9Xe9rk%2FQieDfWecVmkLcw5%2FxofTqDTBYC8B7YyKEFp1i2su1%2Fb%2B80dRsZDu27Y1C5Qo7TqECeIH6gZkFvq1GFIN33P0Q9ZmxMW49woAbc9xjsi3ZU8g0YQ3quG0C0wyeuONi8A7DVBoGjPKjSP%2BVFEH0ti7jIm%2FgwezI0j7RhG4mHQlAerSdyrsQhwEy0v8mUKdahcE66YNnetfZrCglmaGR6nVNBSGw25D7HJ7dYDWSy5crqE47tkE6NFIrtGMJCALkpYMrSl7VKgxlDVkF8ydOTb6CkMJ8Q8nx3GjmqNLqZn3wPyNyHoqEInJmDDJornJBjqkAcFW9BcdERPrGlefqLACPdhSJ7eAXk3H5GAPh1seGwSg5gtyqBFQoS4b7seOKRR%2FNxFujnRfFEADXLzF%2BJJE%2BIyu0j9L%2B9HSJpqwQp4lebk%2Fyf%2Fj35od4aLgCVDNAPop8%2Fd%2FVly4YA1iWEwSww3GuFUEWIid7qF0EL%2F5j36w8u8c38RmbyunsBmZGjun%2BDm%2B3SwU62jQAmCt4fbDeWq9kB%2B0AZOa&X-Amz-Signature=32a16f4820b1865ccff9583227f4b0e1010b8e5fe24c46b595e6428f9eff7a89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UU5UJVT3%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T050944Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCLlsm6E6zsanBQId%2F8rWQkA5HzjI%2BGRQO%2B7zpOCl0uDQIhAL5oGFDAYDLilsCU5p1Hgi%2FbTmNZsWUaub1V9AkeI0SFKv8DCAwQABoMNjM3NDIzMTgzODA1IgyomXmMGGcOnA0fcIMq3AOOuI6YOURzA6EFs3pbFlsJHFoKWIFLzJYOB7mnBmiTLd00OqZNeWxBv%2BcE%2FavxmTEOg%2F2LzLMDgHpTabvgg9ELk%2BKL%2Bh05lDVp6hIp6ay%2FZwYpMIT3B6qXKnYrf0unq7lerMLhwXUjFpoLWltsOXlLib2IuDGQ4RGC3jW6TO7cKk6U2n5WUPShOben%2B7Zx6E7V%2BUQeSJsqo5A19DFET%2BJN1MS9BJgFvv9c3UM7Kck5bKssxIES3KwkSHzb%2FYPY52t%2FfBj2Sd3xaxEh1lrPaAbClQLF4wNsCf2or5k7qbpMzxjMac5qnh321A53QRWT4JLslIy6pHIr2UFu8GsHiwdv5zoL2EUPxHxCHEocH9RdDtLE4CMbyuDokQHhf%2BgKMYilDQIuAGxmyfM9ML6RU5UHHmlBOkI%2BcPlWfn81TNUdpBxkEqdJ%2F2NRAuLWOsdE22tpsXw9nj62ylQf6hQhfC8s5qeRCUby%2BGD5xdpU%2BQn1cMrcRwPo9pACdJZiY1hoATTh9YU2NNV3IT04UeIxbfVVgKubBIjkv7aUl50DzRXSRL2nUGPAVe13UqTobifNmWtJXuIfV2za%2FZCninDiNxb%2Bd5XU48qd4ibF6Sf0HmWYmDg9hmF7kEZbeRB9FTDJornJBjqkAfb6J9un9NIlf7hX0uVvKXi2GyJv3WCaP6cIIrGBG0omA9sEdi8Y%2FdYWJxTgLnXcu3o5gmIiCeZBTYLDm1XxFEWz94J09%2BDFiet4%2F5GfgF0QxR%2FhmX8nVcx3jBVJwKNY853%2BBWXHo7ug8XZuvHXAPk7OwX55Ifv%2F2YI8ALAihuGbkToms0E0wVEhPKsRWH8uIl1rzHORKyAnrD5n4HBs0BlkloSN&X-Amz-Signature=c4ecebfbe7fcee8b92db563e2e29bec8088a44d4334a649bace6c8c4e41996b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662W32BGQF%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T050952Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQDSAt2aNf3BK84Ys4mgpPVdrJp44Dyg2S746%2BvfvmB4lwIgPY21kGWbeVVOSfR46XPj0f%2BYkFkgHTJkUA8wMwRNttAq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDBtc3hXCLO9sMmmMMSrcA7QGTwrcU8fTUqhkz8k2a4fCzremDr3kjEntYgg13Svhbj9D6Gffsy8mS2S57gX00Gmcvc6qDcDTfZAi29h2Rd4aQBhHwtcCxSmcJUiD3V0YLouYAmdC3CQTNkf66I95d9iu%2FTyTBinvF8waYupbtVNocKKydw1%2B0C4LGvWkOlAXZTqXeUC%2FYwGLl2EKY0EHFIwIB4m0wWrdl29s0v%2F%2B9hEMVGts8hanonOK3zTS96q%2Bs1RcW80P83STRjzTwuv8AdHhIs3VQllEpEQY%2Fvc9sOzXZweg0shNm9qhdbhyrDNL8cDSzt0Klm%2Bvq78bAvATabsuEw9n5%2FUMgMod4p%2FmMPNxre60M6Z3%2FYvCm%2FXEhxTJeL70rk3YVhJ3qHXD07W%2BPdSnWvZ1YYIzupxzsFUud11xqxj2TOp1pmY06l%2Fn41PkByV6JM92XayIYinPebZGEJh4180sze6Y%2B9Dqz3xNrdZOfDuIFlCYg19ceZKNdugTcOrehxy8EsqeVhqEjRI%2BweS4rc3805Sag2A4ja1cSaV9liojHT0CrVJqybAAjMVLXW1SYdpCyeqs%2FOit4FlLqfbWstDPy8XSc0K2vO1HLACLIsjQ%2Fiam%2FK1Q1edrrbc878KFvD1oDUiaykMUMLeiuckGOqUB9GDkLCnxW970MPw5lmNUmp4NK5FR32FAUZ2ceCQmokGXWqQ%2F5hh9mNOr%2FTT%2BwMVmIZ0b9fRkpUq5UdOqgSbxV1Bgwy0sZmy3txCUS7W55ecjt3fNzXMJuoagQXAr445okwp6q4AAiWaU%2BWsAMCx7%2FlS2noqMsanloavBJnxiF153sPl3a28Mz24KT5ma9tCpy3BOBEfrJE%2FbgcGUOWe1r9kj%2Bosx&X-Amz-Signature=46d23336ec7b8dc77aa8e3237896655fd5eacd7a2e5eaa5d189b7d3e0260e4ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662W32BGQF%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T050952Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQDSAt2aNf3BK84Ys4mgpPVdrJp44Dyg2S746%2BvfvmB4lwIgPY21kGWbeVVOSfR46XPj0f%2BYkFkgHTJkUA8wMwRNttAq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDBtc3hXCLO9sMmmMMSrcA7QGTwrcU8fTUqhkz8k2a4fCzremDr3kjEntYgg13Svhbj9D6Gffsy8mS2S57gX00Gmcvc6qDcDTfZAi29h2Rd4aQBhHwtcCxSmcJUiD3V0YLouYAmdC3CQTNkf66I95d9iu%2FTyTBinvF8waYupbtVNocKKydw1%2B0C4LGvWkOlAXZTqXeUC%2FYwGLl2EKY0EHFIwIB4m0wWrdl29s0v%2F%2B9hEMVGts8hanonOK3zTS96q%2Bs1RcW80P83STRjzTwuv8AdHhIs3VQllEpEQY%2Fvc9sOzXZweg0shNm9qhdbhyrDNL8cDSzt0Klm%2Bvq78bAvATabsuEw9n5%2FUMgMod4p%2FmMPNxre60M6Z3%2FYvCm%2FXEhxTJeL70rk3YVhJ3qHXD07W%2BPdSnWvZ1YYIzupxzsFUud11xqxj2TOp1pmY06l%2Fn41PkByV6JM92XayIYinPebZGEJh4180sze6Y%2B9Dqz3xNrdZOfDuIFlCYg19ceZKNdugTcOrehxy8EsqeVhqEjRI%2BweS4rc3805Sag2A4ja1cSaV9liojHT0CrVJqybAAjMVLXW1SYdpCyeqs%2FOit4FlLqfbWstDPy8XSc0K2vO1HLACLIsjQ%2Fiam%2FK1Q1edrrbc878KFvD1oDUiaykMUMLeiuckGOqUB9GDkLCnxW970MPw5lmNUmp4NK5FR32FAUZ2ceCQmokGXWqQ%2F5hh9mNOr%2FTT%2BwMVmIZ0b9fRkpUq5UdOqgSbxV1Bgwy0sZmy3txCUS7W55ecjt3fNzXMJuoagQXAr445okwp6q4AAiWaU%2BWsAMCx7%2FlS2noqMsanloavBJnxiF153sPl3a28Mz24KT5ma9tCpy3BOBEfrJE%2FbgcGUOWe1r9kj%2Bosx&X-Amz-Signature=46d23336ec7b8dc77aa8e3237896655fd5eacd7a2e5eaa5d189b7d3e0260e4ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

