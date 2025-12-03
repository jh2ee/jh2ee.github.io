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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466424XUPO3%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T160129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQCgtPT2vfalNNwG9jKr7SKMcmhcitQfC69N3ic6n%2BnnmwIhAKefkzzNVO92PtzFTrIHaVx9ZCCh0p%2FwMOv%2BOG3XWC%2FSKv8DCDEQABoMNjM3NDIzMTgzODA1IgwfcfW9trn0woWPB5gq3AMbcbDhZQNjXhOM844WkruLlzkitr4DAPrq87HrWK2u2RyFBIEsOf0o1xLgC8pWSuqzW3iyTIDZcuDDBCfnB4PT69AYPnbzdC3jmYppAEh%2FrBi86IobEKzp9n%2BxLh7uEaBo8dR9T2V8g%2BWgAZ9Bow4mxYlSn9JDd5Emiv1j9dkk2QeUdmE%2BbXne%2FGd4NBMVSAFPpDXMOnYbqh%2BGkF49P4yIMqJE%2Bs8LWv4PLgq%2B%2BLBjfujSqGpgBGs0vr0jxU2BVYwFY2HCp0Yc5%2BPGKV3P9TTkBKEzxm4O9TKEWWQiqgBSemiJR06Ya5BAT0OlXQOjqt%2FPnAReuPzjFXumeRPLqxVv4LyAWBGIpAuRUNnTpCqp%2BGoQDKV6DhxSTfUqIXK8ZsaTELiEb5fnl0m4zWqwd8zYPBDwt9KEtjBr5fND4OKhn4q1ZroT5hwY7BIMtonomUhtR%2FR%2BE3warxbBvqL9%2FV%2BlwsmZfq1TOFEmRXmwdn%2BdXJueispBfGH5iT85q6F6y%2F6EFzDEwtnA5G1FwE7AG4rjMqYpxIEAn8YE0%2BzJvzvrcGyTiFAMuvIy0GTJjvUyfA6dFswk5hjGXbWJBsgDagfGOV64fJDjpVckaZYk2U6XvnM1khN3w7ZBoSYkXjC%2FscHJBjqkAXiKAHZ2IXjeU%2Be1pLvHZ2bFhZ6Inv4ObsG0Ad1w3en5bJZRyXrkxucMT82QUbvMFwo8eteVZ2yhL9uR29Z0GFc8LrsV%2BwsuNrJbbRdq0NrflouNs2p3nVft3tj754gOwRVL70HKWE2%2FBi8EIeo9koeNSMHBEO%2F2G1bIMbRevq5X2ksGUxKqa4IXWtnNDJNp2HAj64o%2FzCTC03cqJEq8aVjSar8q&X-Amz-Signature=26f53010b8a8132a81fc764602b92b9649833dcab31080e7e89d0a9370fc0b1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466424XUPO3%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T160129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQCgtPT2vfalNNwG9jKr7SKMcmhcitQfC69N3ic6n%2BnnmwIhAKefkzzNVO92PtzFTrIHaVx9ZCCh0p%2FwMOv%2BOG3XWC%2FSKv8DCDEQABoMNjM3NDIzMTgzODA1IgwfcfW9trn0woWPB5gq3AMbcbDhZQNjXhOM844WkruLlzkitr4DAPrq87HrWK2u2RyFBIEsOf0o1xLgC8pWSuqzW3iyTIDZcuDDBCfnB4PT69AYPnbzdC3jmYppAEh%2FrBi86IobEKzp9n%2BxLh7uEaBo8dR9T2V8g%2BWgAZ9Bow4mxYlSn9JDd5Emiv1j9dkk2QeUdmE%2BbXne%2FGd4NBMVSAFPpDXMOnYbqh%2BGkF49P4yIMqJE%2Bs8LWv4PLgq%2B%2BLBjfujSqGpgBGs0vr0jxU2BVYwFY2HCp0Yc5%2BPGKV3P9TTkBKEzxm4O9TKEWWQiqgBSemiJR06Ya5BAT0OlXQOjqt%2FPnAReuPzjFXumeRPLqxVv4LyAWBGIpAuRUNnTpCqp%2BGoQDKV6DhxSTfUqIXK8ZsaTELiEb5fnl0m4zWqwd8zYPBDwt9KEtjBr5fND4OKhn4q1ZroT5hwY7BIMtonomUhtR%2FR%2BE3warxbBvqL9%2FV%2BlwsmZfq1TOFEmRXmwdn%2BdXJueispBfGH5iT85q6F6y%2F6EFzDEwtnA5G1FwE7AG4rjMqYpxIEAn8YE0%2BzJvzvrcGyTiFAMuvIy0GTJjvUyfA6dFswk5hjGXbWJBsgDagfGOV64fJDjpVckaZYk2U6XvnM1khN3w7ZBoSYkXjC%2FscHJBjqkAXiKAHZ2IXjeU%2Be1pLvHZ2bFhZ6Inv4ObsG0Ad1w3en5bJZRyXrkxucMT82QUbvMFwo8eteVZ2yhL9uR29Z0GFc8LrsV%2BwsuNrJbbRdq0NrflouNs2p3nVft3tj754gOwRVL70HKWE2%2FBi8EIeo9koeNSMHBEO%2F2G1bIMbRevq5X2ksGUxKqa4IXWtnNDJNp2HAj64o%2FzCTC03cqJEq8aVjSar8q&X-Amz-Signature=26f53010b8a8132a81fc764602b92b9649833dcab31080e7e89d0a9370fc0b1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OHMLRT6%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T160131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQDLyto%2F%2B2rMuoNHIPSgBOKOeFMphOkfdcJxoQqP1nAUpgIgY8EFuik22V91BYswm5pKU5Au1LN4xtHgqfVTMBkNdSkq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDLK06sXH70ncPzlc7SrcA%2BTO6DZxAdg6GFUbnRTlk4KRCLBZsH7hH11%2F%2Fegpy9VF84TToOVo1pWw%2FHo5jkzGFmRpItReLuM7lYSA6d4VWvl9sE1CAqaZphGb%2B8Btx3W0WbB5jOie77JzTq%2BlkNfZoF62DcR0FNVyk5NdxLu2VwuXreI%2FKOrodeuRslOQUPivbruhsf%2BM25V85G3k7omr4n1DvHwFhcWLF2XaY8udaRpv2AIO6UJnDe3sSMlrn5jBeB3vrhV2v5pXFUM%2FAfVnCEFdXzCx1lMsACuRIgmbV%2FFWryqvNCebEJOcIwV71C0MUp1ri8hoMMKIKPrqqPXLSwTRuOIqzpcSmLdHy%2FRyjvRMHpoMjNSwbSl%2FkVAnjlYrD%2F%2BwAXUU6%2Ft859ulZOZflGVMku3fvxGKOM0SDNG%2BCDHVrqe%2BZO%2B%2Bl6pWOyWHc4tD5fFGbz6ntxB3NbHn57PiFmDuntPhrqWTVer6brh%2BdHYoupFN6IbTkMI4IRbQN7mxWJ1feq2kYPJC1fcui3ERA7tXNGrpryNw%2BThJHEJCC5wSfUu0LiWfNysxUSCCpLc%2BhvcZJhMnRyPV2S4c3lNQqOiwYntXbdDYIEQ%2FlUb5KwUd5C1pTzHK9j1RNtdYzbGIU21wwUJohDS7DPbrMKewwckGOqUBJSY5sPUomAGDlx08ODRmdI49XUdgCBi0k6IFxIFbBmAjuin8x7ajoEoYaHLLI%2BnX%2Foq0lvxadWLhistiIVWfM%2FqOgLNLY%2FYaLP6l8f8Ed6DmLrFtpXnNm8rSu%2FtFBsz7BZfcNzL0EIv%2BEZfKFWviFTuleOwQAReHbGEbcj8s3KX34yj1eZZwKOvYinWoqtWNW3NthIApfcW1L5YvfRLc%2BspQkgf2&X-Amz-Signature=6279dc7efd5982d8c1c6b691e013736410793d6032f931e7f2650d9d48cdecfd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OHMLRT6%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T160131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQDLyto%2F%2B2rMuoNHIPSgBOKOeFMphOkfdcJxoQqP1nAUpgIgY8EFuik22V91BYswm5pKU5Au1LN4xtHgqfVTMBkNdSkq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDLK06sXH70ncPzlc7SrcA%2BTO6DZxAdg6GFUbnRTlk4KRCLBZsH7hH11%2F%2Fegpy9VF84TToOVo1pWw%2FHo5jkzGFmRpItReLuM7lYSA6d4VWvl9sE1CAqaZphGb%2B8Btx3W0WbB5jOie77JzTq%2BlkNfZoF62DcR0FNVyk5NdxLu2VwuXreI%2FKOrodeuRslOQUPivbruhsf%2BM25V85G3k7omr4n1DvHwFhcWLF2XaY8udaRpv2AIO6UJnDe3sSMlrn5jBeB3vrhV2v5pXFUM%2FAfVnCEFdXzCx1lMsACuRIgmbV%2FFWryqvNCebEJOcIwV71C0MUp1ri8hoMMKIKPrqqPXLSwTRuOIqzpcSmLdHy%2FRyjvRMHpoMjNSwbSl%2FkVAnjlYrD%2F%2BwAXUU6%2Ft859ulZOZflGVMku3fvxGKOM0SDNG%2BCDHVrqe%2BZO%2B%2Bl6pWOyWHc4tD5fFGbz6ntxB3NbHn57PiFmDuntPhrqWTVer6brh%2BdHYoupFN6IbTkMI4IRbQN7mxWJ1feq2kYPJC1fcui3ERA7tXNGrpryNw%2BThJHEJCC5wSfUu0LiWfNysxUSCCpLc%2BhvcZJhMnRyPV2S4c3lNQqOiwYntXbdDYIEQ%2FlUb5KwUd5C1pTzHK9j1RNtdYzbGIU21wwUJohDS7DPbrMKewwckGOqUBJSY5sPUomAGDlx08ODRmdI49XUdgCBi0k6IFxIFbBmAjuin8x7ajoEoYaHLLI%2BnX%2Foq0lvxadWLhistiIVWfM%2FqOgLNLY%2FYaLP6l8f8Ed6DmLrFtpXnNm8rSu%2FtFBsz7BZfcNzL0EIv%2BEZfKFWviFTuleOwQAReHbGEbcj8s3KX34yj1eZZwKOvYinWoqtWNW3NthIApfcW1L5YvfRLc%2BspQkgf2&X-Amz-Signature=6279dc7efd5982d8c1c6b691e013736410793d6032f931e7f2650d9d48cdecfd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666I2KSINA%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T160128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQC0FYDALFQ0IuLGAk%2F0jr%2BX293C%2BJwGO%2B8c9drks1l8hwIgeADPVa2RuwkFFGfmLXUnTr4fHJfKHPbXxXGE7miU%2B3Qq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDJ%2FM8iwGzJS%2Fj5AMZCrcA6PuBu7HM93D3VB2SFrPKulQqWCSDrct%2FbnArVgzN7210GXowbXSveRBcSEYcIO%2FzywKXXuAmx9c5QxER%2Fe%2Fet1iIliaBZVClV33FPczKK5PfrLE4qaKXHsAZrsJYtShdLYe9ld768OWSXn2RW%2F2pztPSJd5T8obAANc8x2adbBmJZc3dnSbUDZsVTH%2BGFVIc8oCF5kjpb23x73sLSjYJ%2Bn%2FFOZsExcU8oEJSCt2OQeb1fw8wqxgEMQ27yy%2BsCboP0Lfj4myhpxYa%2Bg70DuAz9WzGzj8DZe5GOzS2LxvcgleUK8jPdznw1ptxCaNBOktl0zpHBm2cJu7pYXvdM49O%2BsPon7yDpQDAkDNueuv4u5yUq1JF5ThhYibPCZ%2FMgr1iAB1jNV1WZAOnviN7d4b7rpOqiInwN%2BRgbby99TRypwaxDCtcIzAWp0g2VLW5tHzFVv5HslX3Z0Xc3K7W4gt5Y1t1FfN9NxhXv5I%2FrEhTBcrGJAj6KrNlstt2uTAP4nZmKfoHe%2BYtlqkgO8LfsZ8e%2BDweXsQwADhKA6XBFnBZ2hXB74lkKpb0FkKMYTa4DvKF0QOfYBeCwB7i6pwox6N2VH7xwyEKHwcYu3RxhEkJiqrj5GfSBL1Y%2BMD3Ii7MNexwckGOqUB4jxPCQ6GQ50A81xoEIPPOvlmhcAhZov5McJ1RcdjuRRh6Wt3yP2cF2hmcOVwK%2Bht7BYtMIlEUflwAeRvg0rXDiEgnlPrT%2FWxeUkC8ZxpzSuAJYGaZxZwSabQ2NnI9YeSFfPXUZCp4b0fwIhNt7mgCjBtsAbb3gD%2Bd1ixFQxchh3VxW5t%2FLg0caHE5k4V%2BE1B0kmfQbbrCRn2Xks8lRxNptOd83j%2B&X-Amz-Signature=484d124def837a8da74c2b0fa98f2933bb37c08170a471b23c39025f75a41ee9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBVMI3LR%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T160136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQDCgboyJ5KkicQTJikulDm42pmPpUM8YvxNMvpC%2FGSLUwIgfeWl3PUmO9O3fI2euIE3JzJn36voq0SfCQikCueyAfYq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDADehydEGbDL8Yk7RSrcA6mXzyv0WQ0Kj%2FZ4khwDxOlufUd5vloh%2B3z6lJ4%2BqolcX7qrWvHqbwWxDxX0tkyRIgwliYUIJfEyQ7jSl4BMSSVBQWN5lg8u98YuK%2FsDNOHzOkQradTU2Bk1efYqL6qvfECJ8MVjlj4sNXuEUfxbI7MU3bPcJDyNyR3cZQ19EZ07UP%2BrhkYZbW2B1uDr9zUV4BnfevFdEo7qV16DuvDXQ8c31pAMedqrv%2FLXmBKpETX84HOK9TguiPX%2B8YP%2FQDl7oLFu6YOpOvn6Bc8tDNJo4vCdGZJqrxv%2FnUs1iuvs0gOgR7bL6wp1HzULxtTIZYu2KkvP8Bugt9XPlSUbtUumOV94VHzmOTXln6v4f0PcWdOcVhITWODCdTLUzmjBe3X5WDWERBcG5NBOPqAp6x0JLnOad8ksAvUH%2BblD26bJzL6UL4PQwGFSZ1WzL6HvaiTFGjsno23WzCbcXX2QyEgjMvh3ly9gOU7xiDDG6ik33b70Gvso1Pc58nBS%2FIgAtldbFuPb0s0akKQ642uWEIWg%2BsDoUUqsYF6qLpyAf%2Fl%2FkpKdCpi0us02S35EOFLodxGTJV4zJDRKCchW6GkFxKa%2F5JtTrY6WKWzQDwB%2F1%2BoSNr1Z80OhjU5zDQnnalO2MPOwwckGOqUB%2F3mm%2FPs0zyVSggWKpJ6Dmqh9T%2B%2FRF3VjNoicUXoWfemlzv%2BWXhuH%2FjPIJmrZM5cflAH0ZVZCpLyAOFGVL09NlInabDzo0jXbdcsTvO74eqDpou3gb8P%2BFR9QT0pCZd%2B4KFfjxFK0BCcHqF8h%2F%2B%2FkpYku7YnT8cPwnOg69jMgPOKQTo32OlZUodYzZEhBM5wKxYrPC6SRtieBOuMx0asE%2B%2FUGD7nH&X-Amz-Signature=f89dd4618e4eaf498906cbdaa4bfb500b1ced82fec20c404d57a229e1e9ddea9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBVMI3LR%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T160136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQDCgboyJ5KkicQTJikulDm42pmPpUM8YvxNMvpC%2FGSLUwIgfeWl3PUmO9O3fI2euIE3JzJn36voq0SfCQikCueyAfYq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDADehydEGbDL8Yk7RSrcA6mXzyv0WQ0Kj%2FZ4khwDxOlufUd5vloh%2B3z6lJ4%2BqolcX7qrWvHqbwWxDxX0tkyRIgwliYUIJfEyQ7jSl4BMSSVBQWN5lg8u98YuK%2FsDNOHzOkQradTU2Bk1efYqL6qvfECJ8MVjlj4sNXuEUfxbI7MU3bPcJDyNyR3cZQ19EZ07UP%2BrhkYZbW2B1uDr9zUV4BnfevFdEo7qV16DuvDXQ8c31pAMedqrv%2FLXmBKpETX84HOK9TguiPX%2B8YP%2FQDl7oLFu6YOpOvn6Bc8tDNJo4vCdGZJqrxv%2FnUs1iuvs0gOgR7bL6wp1HzULxtTIZYu2KkvP8Bugt9XPlSUbtUumOV94VHzmOTXln6v4f0PcWdOcVhITWODCdTLUzmjBe3X5WDWERBcG5NBOPqAp6x0JLnOad8ksAvUH%2BblD26bJzL6UL4PQwGFSZ1WzL6HvaiTFGjsno23WzCbcXX2QyEgjMvh3ly9gOU7xiDDG6ik33b70Gvso1Pc58nBS%2FIgAtldbFuPb0s0akKQ642uWEIWg%2BsDoUUqsYF6qLpyAf%2Fl%2FkpKdCpi0us02S35EOFLodxGTJV4zJDRKCchW6GkFxKa%2F5JtTrY6WKWzQDwB%2F1%2BoSNr1Z80OhjU5zDQnnalO2MPOwwckGOqUB%2F3mm%2FPs0zyVSggWKpJ6Dmqh9T%2B%2FRF3VjNoicUXoWfemlzv%2BWXhuH%2FjPIJmrZM5cflAH0ZVZCpLyAOFGVL09NlInabDzo0jXbdcsTvO74eqDpou3gb8P%2BFR9QT0pCZd%2B4KFfjxFK0BCcHqF8h%2F%2B%2FkpYku7YnT8cPwnOg69jMgPOKQTo32OlZUodYzZEhBM5wKxYrPC6SRtieBOuMx0asE%2B%2FUGD7nH&X-Amz-Signature=f89dd4618e4eaf498906cbdaa4bfb500b1ced82fec20c404d57a229e1e9ddea9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

