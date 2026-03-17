---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466437O3SRN%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T202456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECsaCXVzLXdlc3QtMiJHMEUCIHfoiyGuQRqr7gUwb8hYHBNP8PIV8NpQMefVHplGUcH1AiEArZWKaoAd1Jr47pQtxAUEpjZTYsaSFwbrLOx7WrMW90kqiAQI9P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDyAtMez6drEi7CdeyrcA%2Fu4bsrBU1sQA%2FQlSWGIoERWb01C30qhyDt6ORKB2GnitwYlSsOPDTaZtpBbWdZk4%2Bsnf7Cutn9o5p9SQvlmJjYTCW4WK7UncG1tfkiNdoB%2BUZAHxrWLLmoiA9rRluHUY8fSgkO3pJz3YF6UHIBiZc%2FSX9gdyll%2Fa8kSqRNBzm%2BvkMC6Sr2NM9E%2FkzREvKX3VZePc8e2e4c8u7yFK8xisuk2OvfP4Ajbg9LdfNojWqfF8DAYh1vBF7ATNm6FlSlmFwYfevJVI1sxmtpw3dR6YG7tJxySo%2Bt4%2B81s6NhI%2BluNYu8%2FB%2FtZPRWsRrpBAGDwNjkcalqGRETPEq9Us%2FumlHjGXHrP41oMyx6K%2Fjl%2B4R3vxrMV9MH5ljS2dxLXmy5pk%2FCc6YV6CQMNIQ4KBjvBdYh8e7k94gWOS9Q%2BJ5%2Fdd%2BegKtHwv5dYqlHl3zJKrGhNkFIfzb6EGwvoNC3nFVfcNkFdoL9ZYnsXfDyXXwcN%2BO8oKcEDDlyww7ScJfbWtagavF6nL41fap4OmX1vv7lJBs4bn%2BqRqK3EmabU3%2FLBFvxQkx%2F1jQs0je3MYM7Z%2FxamQIRKE07S4EeLZ8EYzLCdye1NDwON%2FFS1giMYHqOgMq0Q1NgtLpH%2BxhcaxU0dMOzN5s0GOqUBkOlOsBiDaYFEoAoEk8iWhlKAvBLNDmOqU1PosA5XDWfpst3g0MMVPfzqDaHTHX7%2FCvpN0nw8CJ9wXBH3%2FSNyGBl8im8ueWSW19Ep2Om%2FbpLwTVo6PDp7zhz2aJC5G%2BnupcYCRQNt8AK%2BaZzfQyQfWN8QwOSUrhgO6F5TMDi0mdffb8wj5%2FNYKXY%2FFc0UeLK6cGwGUoUjv1Z9Xz9K6faiVOrNZw8T&X-Amz-Signature=85b007dca4d44d8c9107c6974c036adcb30bdf0e783686c66173c12882cfdb10&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466437O3SRN%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T202456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECsaCXVzLXdlc3QtMiJHMEUCIHfoiyGuQRqr7gUwb8hYHBNP8PIV8NpQMefVHplGUcH1AiEArZWKaoAd1Jr47pQtxAUEpjZTYsaSFwbrLOx7WrMW90kqiAQI9P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDyAtMez6drEi7CdeyrcA%2Fu4bsrBU1sQA%2FQlSWGIoERWb01C30qhyDt6ORKB2GnitwYlSsOPDTaZtpBbWdZk4%2Bsnf7Cutn9o5p9SQvlmJjYTCW4WK7UncG1tfkiNdoB%2BUZAHxrWLLmoiA9rRluHUY8fSgkO3pJz3YF6UHIBiZc%2FSX9gdyll%2Fa8kSqRNBzm%2BvkMC6Sr2NM9E%2FkzREvKX3VZePc8e2e4c8u7yFK8xisuk2OvfP4Ajbg9LdfNojWqfF8DAYh1vBF7ATNm6FlSlmFwYfevJVI1sxmtpw3dR6YG7tJxySo%2Bt4%2B81s6NhI%2BluNYu8%2FB%2FtZPRWsRrpBAGDwNjkcalqGRETPEq9Us%2FumlHjGXHrP41oMyx6K%2Fjl%2B4R3vxrMV9MH5ljS2dxLXmy5pk%2FCc6YV6CQMNIQ4KBjvBdYh8e7k94gWOS9Q%2BJ5%2Fdd%2BegKtHwv5dYqlHl3zJKrGhNkFIfzb6EGwvoNC3nFVfcNkFdoL9ZYnsXfDyXXwcN%2BO8oKcEDDlyww7ScJfbWtagavF6nL41fap4OmX1vv7lJBs4bn%2BqRqK3EmabU3%2FLBFvxQkx%2F1jQs0je3MYM7Z%2FxamQIRKE07S4EeLZ8EYzLCdye1NDwON%2FFS1giMYHqOgMq0Q1NgtLpH%2BxhcaxU0dMOzN5s0GOqUBkOlOsBiDaYFEoAoEk8iWhlKAvBLNDmOqU1PosA5XDWfpst3g0MMVPfzqDaHTHX7%2FCvpN0nw8CJ9wXBH3%2FSNyGBl8im8ueWSW19Ep2Om%2FbpLwTVo6PDp7zhz2aJC5G%2BnupcYCRQNt8AK%2BaZzfQyQfWN8QwOSUrhgO6F5TMDi0mdffb8wj5%2FNYKXY%2FFc0UeLK6cGwGUoUjv1Z9Xz9K6faiVOrNZw8T&X-Amz-Signature=85b007dca4d44d8c9107c6974c036adcb30bdf0e783686c66173c12882cfdb10&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T7FF67EV%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T202456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECsaCXVzLXdlc3QtMiJIMEYCIQD62YzwnFKO3Xlpxqm1D5MBrLBTodkOINFCwzOR9elUwwIhALzPMEzn2qhGXgvWftY%2FYw06N8U5PccRoN8iUkmSgPsAKogECPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyZy4K4fM9izF1%2FmyAq3ANwHCPYsOowO0S%2BPPN0ddlfE9WjDJA9SGKDDOQryBs0YfIrDJkYuW2Dg519FZ7ybMh%2BGz1OvZmptrh9txrdOEMEGIxCQ4XlvHtki8D67H8Lpq2Xn1o%2F2v08txL14JZbhMgZ17LfcTBG3q1MdWJBWczAPoPfYwkt9Fv3x1P%2B0Y%2FU4tVgOI3gYXY8XeqbXvouqPl0kRgBkhmbnSbGuhTAWaXPP2e4lAUqHyqRxsSLzQI87uEnJWpR%2F7%2BK%2BAZ7deLMFgv%2BykOqawm%2FkTwxTmAzVMj18kwmMEzXh%2BPMC4z97Rtd%2FmTqye1kaZIEE2siFWKbD3YO9RJ1Cs4cjFBQ3E1fEah54aDOnLSbIMUmxz%2FVKULlpdMinikDFQwcOTjZRbhadufsNmMNb2EgZPZgTFg19ij4Z6LdD1scZsAzcEc7iIsWD2WEEyAqrXJtgI4wkkAVhWguQ%2BZ%2FbQSV9lUT%2B061exApNlSnBJkmATHX%2BSZxUdPgFNJDeAa8JuxoNfLfnYq8hOpc6fQevrWrTb5BA51ii3Qk8VCcL2FGH%2FbtDo2o5MW5TCUJ1v6sEGKrfZMxCGu5jjJIHxBm%2FGb18gmXfO%2FzEmodJlwOhzQoLZakZzNf4r2ejjBjQ0xkxTFHcTtBjTDgzubNBjqkAffGyRGR5fI9hP6j3Bb4m%2BshA8gJbVKkn1mv2sbT2%2FfI3cfOzEydIl5BXgYF2Y6XrZNBawIlrwxJfQKrG%2BtJg9BpNsbSNgJXH%2FW2B6babnwcZi%2BUJ57%2Fv7fMzxje8kOf7kfOWq2xUmBY6zCo1sJWIejkk1SZF8KO9tq2VldmyYaYCMsk%2B1PoizZGa2CAUJ8vBfKAVK7aHFtn1YOCcf9NUabiMh2B&X-Amz-Signature=023e41a87a6b310eb7a67d710e10191342d771d7ca392e6208bb097235f634ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XQ5EESW%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T202458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECsaCXVzLXdlc3QtMiJGMEQCIGAyKSI3SDshv1qs1x%2FXmHDYvj4oHWtxEJcBmUsbAdRBAiBcTTJN49ACxX7%2FEGzkApeGSO6hJ1pNYLc1%2FTJTNNtKpSqIBAj0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM4v33uYdf6YhcFpOqKtwDKDO%2F9Xzxty33dZ6BjyvmpkGlxDAgOPivrAa8jtuOW7lwLFeCAerf69ftlN38zr4KzsVOM8dR3PxMESygb%2FLFI2b%2FBtBfme275RIx4WNAJkkNghABmY6QilqkfMC8VPGn3HK%2FKcLsz5p4DFTmHSTd0rmFuHJOAUSlioDy1C%2F7RAkHuFcR4J71i5w%2BaFSuxpGPHKEw%2BUYhiKMVb%2Bfky8gqSM0Ytqq96shdD%2BIvajmkMEjhnKmUdpUEzuZB1Qx5qIN5rGINM74e7ep0vfsD5kmencsHv%2BPb2ZQQGhbro%2FMDMzgcAu%2FWKqgOSmC6wMyHdqvC8dze%2BDkRAL9aRdyqVkOjSb8El6DjVijh9nye%2F6o0Ix0vYEwmuGtnfNhKReBC2thctJBBJt3sLtza2Dwl24n25cZXbuK3rkHXapUqn3lF1fCZGRwTR7xG08YO%2FR7NQ98v6DBe8i3lPxxTJEDn8yvWjbvvdCOmlO76%2FIx8L9N%2FoM0E4CGOV%2BBJxITI8OXpwXKnfANWk7URwNjURMrtHUEv3hJ2lKNyzRK7suJM%2F6PMzQfCUm92YKjaLjuLhprC4KcOubJCBTVZbcy2WCR3pkHccgXqCJcffMlh4i6O8dfGfKn6RTuC3srUoBKLoiYw983mzQY6pgFHgJ84%2Bxs15NifyYgCMqjdZgMEYMRrXq5btJhh0hLGGRVRiD8hl4rbg1pqtaoVsqP2sLiBfYZswnP3qbOcfslzc8%2F6W2sTLCGJBEQE5a5y7syLfxjX5pMPvJ4MfrNXgiK9Eo8stlnuwxRxNVFieBkW%2BkXBU9mYRVRCdVHRZZThzrq9%2B76px9rwD4JANuiT6wpg4%2FaZgxsbAmped9BfuWCzbZyIk7AP&X-Amz-Signature=7236a8fdac29092268da074d5cdfb8902267e12b41585e7a49491ff697505eb6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XQ5EESW%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T202458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECsaCXVzLXdlc3QtMiJGMEQCIGAyKSI3SDshv1qs1x%2FXmHDYvj4oHWtxEJcBmUsbAdRBAiBcTTJN49ACxX7%2FEGzkApeGSO6hJ1pNYLc1%2FTJTNNtKpSqIBAj0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM4v33uYdf6YhcFpOqKtwDKDO%2F9Xzxty33dZ6BjyvmpkGlxDAgOPivrAa8jtuOW7lwLFeCAerf69ftlN38zr4KzsVOM8dR3PxMESygb%2FLFI2b%2FBtBfme275RIx4WNAJkkNghABmY6QilqkfMC8VPGn3HK%2FKcLsz5p4DFTmHSTd0rmFuHJOAUSlioDy1C%2F7RAkHuFcR4J71i5w%2BaFSuxpGPHKEw%2BUYhiKMVb%2Bfky8gqSM0Ytqq96shdD%2BIvajmkMEjhnKmUdpUEzuZB1Qx5qIN5rGINM74e7ep0vfsD5kmencsHv%2BPb2ZQQGhbro%2FMDMzgcAu%2FWKqgOSmC6wMyHdqvC8dze%2BDkRAL9aRdyqVkOjSb8El6DjVijh9nye%2F6o0Ix0vYEwmuGtnfNhKReBC2thctJBBJt3sLtza2Dwl24n25cZXbuK3rkHXapUqn3lF1fCZGRwTR7xG08YO%2FR7NQ98v6DBe8i3lPxxTJEDn8yvWjbvvdCOmlO76%2FIx8L9N%2FoM0E4CGOV%2BBJxITI8OXpwXKnfANWk7URwNjURMrtHUEv3hJ2lKNyzRK7suJM%2F6PMzQfCUm92YKjaLjuLhprC4KcOubJCBTVZbcy2WCR3pkHccgXqCJcffMlh4i6O8dfGfKn6RTuC3srUoBKLoiYw983mzQY6pgFHgJ84%2Bxs15NifyYgCMqjdZgMEYMRrXq5btJhh0hLGGRVRiD8hl4rbg1pqtaoVsqP2sLiBfYZswnP3qbOcfslzc8%2F6W2sTLCGJBEQE5a5y7syLfxjX5pMPvJ4MfrNXgiK9Eo8stlnuwxRxNVFieBkW%2BkXBU9mYRVRCdVHRZZThzrq9%2B76px9rwD4JANuiT6wpg4%2FaZgxsbAmped9BfuWCzbZyIk7AP&X-Amz-Signature=bcf0af3f6a888def0d522395b0d47999e3fef3220d2f23d50362613ceba5e737&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662C4RCUNR%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T202459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECsaCXVzLXdlc3QtMiJGMEQCIHs0IRiewjNOH4TTAp535BN5JO6sQauuM%2FztAKmnD%2F%2FCAiAEAGu5beOUoqxSGYPC67KhdvZHJWchbrl%2B8%2Bwy%2FN7YmyqIBAj0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMDFCFVK5GDxq02tceKtwDuPWf7TfflHYntUi%2BZvrQNSluYfgfW2O8%2BIjt17Q1SPTeXyIII8fDW%2B2NQjiPgBu3%2BKuSfdptRYItyRVVitkU46bT55ZQ7LkLQgxc7n%2F%2BQyhOyx%2BprnwZBp8iizY2IZm7sdI7yoDCdeg7dxrvx0%2Fs1yBrWEbONalfduXBL5hz5UB04i8ccJaRlTYsvjkKYLrwfyTn4YIj4%2F0vFuG7CXl2fiVckp5TFdjprFn90hlKMIvbtyHPvi0zSRjH7cnm45f9yqkAOK9tASlabU3o6jDMJCN0DnZoWJF1lqidfJiZOGkDYJYpQrWuK1aQCib%2BMhhZ8r429%2BVDPfJuzsxCFKVK9a0eA5I17podn4rQAxk%2FZZ1MJbuv3geamN3prqSvUvsyEGc5ooEtO%2BkM1S9x1PS02v2UNqVjK%2FRSMa3Wrc2hixGCLxh0iJTCvarr3zreuShhomsJ2XAHm3oYN6umK5fy%2B%2FfI%2BZMBGSRtcCGBoAWfMh4ktPhVHGjHSLplkMk16mZBnr97bCT%2FI%2FM8E9VOixBe8Wazer8Wp5aZA2AnkTc%2Bm6h%2B%2FyJmfE2E2RQA7hmfi3ZPLGK5joc%2BY8bPO7LNKaLuBcOjU%2FYbSOx02vNzREepOLxyGxiZH7NtO6nDU%2BIw88%2FmzQY6pgEMmZkwbowheIJ9dzc1oDgmueGkICoh4jHIG%2Fnou%2FlMr0oU0UHFpgIlXj86%2FJjK3S6dZbj%2Bm%2BpGc8%2FH8L7qgYJs%2BaJKz1faT5E1Uq3I%2FkZTjzkmvsNz5c1dU6d8fN%2Fj78Ejh4jTQXx4uX2zF5x2ALSLoP%2BOx0EwJ%2BRkyp%2FW%2FwOKEVlxXRI%2F%2B3SCksTk5qQ%2F6HpoEcmjsgnYW5ySM3ih%2B32xVjE%2B85cK&X-Amz-Signature=3236d4d90c6dccf84327c561be66c6c92a8665c88ffe821605fb4974f37395b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQVCSROT%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T202500Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECsaCXVzLXdlc3QtMiJGMEQCIE8pv%2Bumc2a1oI5lBOnJo1LQYol%2BOqbDLBfzsFuiH6gBAiBoHjOYCEXafBMYuYV29%2BVWLwHC8ocBJvfqcuXtR39dTCqIBAj0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMTcdUNYlSoneyzqgvKtwDQHJyGNRObXi%2B%2B9elrps5YL%2BTz9U3fGf5J3K%2BwrkZVIFWki4dh8A6om4Khv3ybVab4LRJiw27XgbjeMvIWdSJvvAFbq70B2DUTaNjXqxUg4JYN5GtYH0jm7QM5ELyEuzAFPh2z9yzENR58VxjZ9v1KfO%2FTAzhHb2voxfOtGf15A8sRTHH%2FwsVCcTFC6vV%2FzZxQrTWO3Mf4LWZPezhz5A62CrOChFgl%2B96yeLRAMDA1dTsDgsBOM645YCNLg%2F1t4bzPEuYMuHPgA0x1%2BU6NZHST80mh4S%2FYssoxJH5%2FiTvnnNfA%2BrRiVe4OnW6V4acrSI6glSi9t6Xk1dRvjZyO1ZTMXPQpZF2PgFxE8hZj5N2uSuhEiR%2FKHr%2FJNqwVyJKB9E3Qjp6K3oaHoC4wjZ2wL3IQMgWkvxbKCkhN1H9VbVtYoIbj%2BY6DoXY8kKBctTzdXSCVH3jaK13sQrxrQR0UNVG4nQ6nFazcEAYy%2FnNn5oLZMsvL8MapN2zronhEqlKWjRB%2FyxFPmiFwFuyLy3uzV0hmPh6xjcbBcDYLVlpe44Y9ytPAuhoq6DgsIcyOftnUBX2zSNWtkqonajSY5iC1KvvXJ7VoTo0%2B2QfpkJPCVyx8q6VmcLLL6VM%2F0C7wVcwos7mzQY6pgEwlOpVOoKMo7DVCnexke%2BpTZQAF3Xc1g8IQRgoT4fiW%2FLccDXmDQPYPgQVVkbivhco6Rdcf%2BaP0i%2BnCdoFruiB99%2FPqCpYaQKrhlfjLlXGkSE3R4ytccqmihBFIm%2FGwvykcji8Ez5Z4xu4FNErYYJ76Wa9c7Qsx8%2B%2FxCRSsIX%2BUSOJDm79dP0VOXRBFoQEl%2FXWbwYb%2FMtm3iRPCNUuI2SoPtjYpx8j&X-Amz-Signature=71d1a267db6927ee174faccd2f2800fde535153675437541316ccf67ebf8a1be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WEHFQTZB%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T202503Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECsaCXVzLXdlc3QtMiJHMEUCIFc6bRFCLqd8zHbc7ZfIb20yycUQ4bJ%2FngGal3H2AcmGAiEArhkHnQE9%2FjsILGuJ%2FoiyadDMhHaZyK8pUrNN6S%2FGdsoqiAQI9P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH4gj%2BSifgC2dTFzHyrcA25ZT5gVLPbKv2ZBpzfDTAK%2FlP4VdDtnxWVwFpJ%2B0f1fp9pvGCtcmRW7ne37rC33zVgNEBHRqnt%2F%2Bmp%2ByHwiY%2FTagYVSmu1oCHm0pfipjmPBzr92QOhL18WXi0BmtjxxpjajRQAmH3n2snZiBCsKXTr0LgXvn%2BjXf3orq3JKBxCDskLvPYDOegURDYR%2F0VqHY4Q7Jty%2B08x3sdi%2Bs1rijBOvKqrzrRScuEmKqitcp%2BCc2ZOI7j0Y8%2F1ArkJbtWiAJmAJF1aGuEo2jaOSh7wr6zWr%2BYxBNWT6mzis7yymEAPMp10kILIhpMXPgCBI%2BlIDW2kmOn6NAzn74K6RUsU5wEvOzQuvPmnmsAw3TSxxbuKxgB1%2BOE6Ds8xPwL6ok8GnbpYZNjxziKN%2F6nBDv7bJmiOXOwIdZKgyQ5yyOBIG7MhBJNHesRLCSw7dSLxQ1wKQ9sSEWT3I8qyeZWsZn7aaOsdq2J4XsXT1eCoi3A4ZIT6WVc59hUmUflj1tjJXCDIuSxZs9PV%2BbfVSfAsj4kzsQpLCHxNsw1DWs2mgF8cHGQNME9OQ%2BOjhGhkEk6Bt345mBViC%2BU%2BZgLlZHRBcKVzEl%2F3gC72YqIWbyxrjgnykq0cllZZyUSsQYDxYjN%2BKMPbN5s0GOqUBGMqGHz0xJyz4n6wqFAAKKaVwN6%2BBsZcsNrE%2FmV73z1867aCj%2FoMxuwDsPk7Oly%2F3DBseSEZQv5j1BumtkxoTXQUYukpqrChtn4ON4OHRncnqVA6Ba09CbicivYe8aeVxiZ2XP7QCeBu9HYaWNNo0u0egJVXMgsvaFcE2VkurxPtx7Nu3GvUWc0qQL%2FcwqhadDjDXmcwrB0UCkvPj7SeTwQLolOIT&X-Amz-Signature=80d25cde6a7db2b3d44e2ae835663b0d277d1e40122cc013b2ca5720b3df7e77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XS6H75IA%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T202503Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECsaCXVzLXdlc3QtMiJGMEQCIDkupFaPVI8S0G5Izfj1SmAo6jD%2FSiqJJXpHuYRvTWYeAiAkXmtKOtfczyMymIOeCWDCEzjaXyRrxJ8HvmDeSkMbYyqIBAj0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMWgdSLccpXVLJVot%2FKtwDcU4vliYNW4aqq5Rt76dECFFk1godn%2F4jPi4MRLoUTbIUSnFGMEswO4TFu1AutBTLzlehAN0gxaaTlg3rHSI2%2Fxq0r2yqir3jFuZLq6wlmsoz1Wu8Fj1gMChP6j3PWBE%2FQPIEOwhDbA64DPGMtCVdY8ODg2UcYEQuJg3grDN8PfRdCSLAyUu0oT5R5V%2BPAZEqw28sj3cfr1pqtNv%2BMircfxhA8sp7jkfvJIz3eUPCKUcwqZDc%2F5QQcx1V0grZermrmc7JQOaJ1cM38%2BSz2XwWrYsixnth0Y%2BFvB%2FYxm54sKsZvYcY%2Bm5lkqCmQdeOMAyiQtBke%2BFVBQ7hzj%2BzAV5Z92yBj4akPVhzQyxlT4YENjasYu%2BlwPZ9UbZ%2FPCbv%2FbpJRriMV9lngo%2FblkmwxOJthALZhbRJwdnorVr182K2WD7p0VREOdZf97rOlSgQKZamWeD4QrZv%2Bej4Bw1nF6Qdsn7FC%2FGvbhUjMXU29%2BJ53U0krZ6LjIky9ZDxaS011Mxq%2FcGbNKd08JedhizBHi5L%2FzjUfZnq%2BhEZgtbSUSt2oRMRqYMw8iaCY8WHZupXk57dS8qHoXWEWt7JrnK6pPDOyhjsePjswKguHBKH2%2BarUlxdSwoRwyYGsqg2ZhUwjM7mzQY6pgH9J1e8YO4vfcNLM%2FQkYE5pRSwf0JGC53OXDe69YgXpPElBuUG6a47PO4LYAVl4NquLaWpcv8haUKfSFYilaMQmcb1aMmRwoZwdVQyU8Cf62O5CqUm%2Bmym%2FrcJxzVj9z9ehDdKrTd9O0J2gz%2BY7fsa2hJEvqPYuHIWsH07LIchYuSqQrDQ8ZMQFUhfuGsSX9KnvfQobXNezuen7LNlsv0oypUoHjEoX&X-Amz-Signature=7d2d653e42b82c72a41b40dac5b0a173ce55084536402b89f0948c10e3a95265&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XS6H75IA%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T202503Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECsaCXVzLXdlc3QtMiJGMEQCIDkupFaPVI8S0G5Izfj1SmAo6jD%2FSiqJJXpHuYRvTWYeAiAkXmtKOtfczyMymIOeCWDCEzjaXyRrxJ8HvmDeSkMbYyqIBAj0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMWgdSLccpXVLJVot%2FKtwDcU4vliYNW4aqq5Rt76dECFFk1godn%2F4jPi4MRLoUTbIUSnFGMEswO4TFu1AutBTLzlehAN0gxaaTlg3rHSI2%2Fxq0r2yqir3jFuZLq6wlmsoz1Wu8Fj1gMChP6j3PWBE%2FQPIEOwhDbA64DPGMtCVdY8ODg2UcYEQuJg3grDN8PfRdCSLAyUu0oT5R5V%2BPAZEqw28sj3cfr1pqtNv%2BMircfxhA8sp7jkfvJIz3eUPCKUcwqZDc%2F5QQcx1V0grZermrmc7JQOaJ1cM38%2BSz2XwWrYsixnth0Y%2BFvB%2FYxm54sKsZvYcY%2Bm5lkqCmQdeOMAyiQtBke%2BFVBQ7hzj%2BzAV5Z92yBj4akPVhzQyxlT4YENjasYu%2BlwPZ9UbZ%2FPCbv%2FbpJRriMV9lngo%2FblkmwxOJthALZhbRJwdnorVr182K2WD7p0VREOdZf97rOlSgQKZamWeD4QrZv%2Bej4Bw1nF6Qdsn7FC%2FGvbhUjMXU29%2BJ53U0krZ6LjIky9ZDxaS011Mxq%2FcGbNKd08JedhizBHi5L%2FzjUfZnq%2BhEZgtbSUSt2oRMRqYMw8iaCY8WHZupXk57dS8qHoXWEWt7JrnK6pPDOyhjsePjswKguHBKH2%2BarUlxdSwoRwyYGsqg2ZhUwjM7mzQY6pgH9J1e8YO4vfcNLM%2FQkYE5pRSwf0JGC53OXDe69YgXpPElBuUG6a47PO4LYAVl4NquLaWpcv8haUKfSFYilaMQmcb1aMmRwoZwdVQyU8Cf62O5CqUm%2Bmym%2FrcJxzVj9z9ehDdKrTd9O0J2gz%2BY7fsa2hJEvqPYuHIWsH07LIchYuSqQrDQ8ZMQFUhfuGsSX9KnvfQobXNezuen7LNlsv0oypUoHjEoX&X-Amz-Signature=5992bc32199d6add0f17e6f9f2ed7245a245de1097fd707ac9e0ced7b157986a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QA42U7QJ%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T202451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECsaCXVzLXdlc3QtMiJHMEUCIQCE%2BBXSF%2F4wrtEF5aCtG09LKPx%2F8ms35zqXTvYZABV5dAIgWVd3ubhO%2Bggt7Dsgd9lfjvH7WWlmQybJfmSSkpueeOAqiAQI9P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL9GZ0TWwUJhtlewaSrcAya5jhWL6PcYGmOGJ8oTHb7R5L%2BtByEJerOT6KJypX4RgvnCGgTxXflTGUToJErO8vdET6%2BEaOiHsHFLC%2Fvd2Tc%2B0hUq1Wg%2BjNV0n72piUYpnuMrhhwzV%2BPEalthbZE44aEz0LjhXrKs0jf5qMbThEWs0yYCTaq33jdFbTzv0Nc5JUcBCavPP2Y1ZDxiW%2FGyhFO3xDe2bHi0v8GB9mBuva2IBsevfaGKFJW3INFaZxoiEW4jAB%2BCvzNMhl5kR8HNIBsTM1ckIUUmr0WNwDmKqqVa8nQawqw0WTeSpdP48ZzInrQXjGELYXuXQR6iiQm%2BL5YjWH6mxHYbMVp2AMkELZKrMA8ec6avT5zQkiammfjOWqSoiM%2BNvuRDOEHL8l06uhsTD4X0uwtHXog7Tdtb2ln3nWjyoc84ZwK92UPNWgMK9uVQprH2z0CeWfDkwsLDi8yna%2FA3LCvHnwLqyJF7t8ELXfyZyXn98YVlCOTWC6LT8n9cXW4yWlmXYfS0uqfxK%2BWDYJW%2BT19Ks4VaRYMbGebx6OxVrG5eJpjfnNJA8m00umekjrCGHbXXnbfLRfZkAkdVjSNkxq%2FolBAea07U%2F%2FcRPhVyj0XCQX1MWoDAYw9X%2F8lbatlBggqAcOGeMKjO5s0GOqUByVZIGCtXpjIG%2FWT2RmmUo3ULxD4QUNjAtfVFj3x0tpToj9AtW0EA2EUPmih8X9yozTYHY3FAWWvzRFtP8htC1T4sTARCFQyknttr4JjR5pKJCuCtTVvjftAjhz3BaPQV%2FDft16RRWildoAyrYLMK0H8AUBccWp01WVUy4NmYZ3rAzdnrL8fCsZccCDEA3QAEEihN3V%2FYBwIGqiV2RIy0dNuyBIAj&X-Amz-Signature=fcc131e34b65264c64ce1660f5193d3783e5d15b98d342e845950bd33ed79386&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBXRQCDH%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T202505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECsaCXVzLXdlc3QtMiJIMEYCIQCFL4VYsZp6EARV0rmDvGgDcr4rXQFjl2hcoCNl%2BejnogIhALe3ki0tCjUMTRhpGclo7bDXw3%2BfdB%2FaaVV%2Fgq2LypTnKogECPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwJP1LmD1jItyJxS0oq3APROk8AVdXMdiTrUIwArbdTd6oIn2h6YCUmPFNhGlHuHYh68GzaUy50Nv4NQ539Mee%2FpTy1bd1pR1MkwySS36TOS2UkIcEo1AjH09X5Ok98gKFYCBjzZb%2B3HMaNWjp8CiM%2FIn%2F%2B6y9IKIxOX13ftsPVutmePGgLlz%2BohOZ0DAE9ZdSjuzRo8AGC5F2zxyGEzk2%2B7D9EjXW1h%2BDsoXQerci8sk944Fpp5xd0XmI5ZehmuJ6LnQiusLq2j%2B4O5pwbH%2BECuwbBfPd0WhomGQTdGKy5M8Xhtj3ENxFZUTosdtr3EUHmU0m1jEruhb3vtGozcYqOPRO191QbcYeNaBQKBHw1Spx0y27%2F6w2hBGj%2BwaKpNTuC5I30eYLUPd01LqjRPsy0tUVBK8irjvwr4Xc172IChfCHZ9cFFnqEbw1fUlaJzae7as8xMOqkOTQXsVNczcPxiMzpWg6OEoYuIBn4Vnl%2B3AlwJUAzRErjuzByOi7HAUYa1IdFNxmKrae9%2BtBGAT%2FE40hiP3%2F5d6quCTObcyeaH%2FSg2PUoLHtXpYv14DX%2FKhPsEDCuMDCuqV7jygTRKSbxDaEBwZqPVhJNofuuvu9zVFMdJQdZT9BnxHX3Ug372WrfF%2FOC4vsgzI2FKTDGzubNBjqkAYJW3%2FoCMKQb802MHi0Zfsr%2F13NN5I86B%2BqXH8ZKEpcXu0kLsooLSjmPSwU7bf9N%2FDJojt3svsfzukCKrECK2OokcjP275oy3OYQ7ZfBUym4vjzgDYskl5zrtUTXs%2FC%2FQrq4%2Blscr91mBlOzZhOxjRMRXfmWidqbW%2B48UwF6zhQJsmPDRtE9qDoh31tOMejIUuZD6ydXwhMHiuTmhMRwjiCG9xW8&X-Amz-Signature=a96223c32ba0fd93761f5d4f196a6522624c10be178d894ae836b38e62871882&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBXRQCDH%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T202505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECsaCXVzLXdlc3QtMiJIMEYCIQCFL4VYsZp6EARV0rmDvGgDcr4rXQFjl2hcoCNl%2BejnogIhALe3ki0tCjUMTRhpGclo7bDXw3%2BfdB%2FaaVV%2Fgq2LypTnKogECPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwJP1LmD1jItyJxS0oq3APROk8AVdXMdiTrUIwArbdTd6oIn2h6YCUmPFNhGlHuHYh68GzaUy50Nv4NQ539Mee%2FpTy1bd1pR1MkwySS36TOS2UkIcEo1AjH09X5Ok98gKFYCBjzZb%2B3HMaNWjp8CiM%2FIn%2F%2B6y9IKIxOX13ftsPVutmePGgLlz%2BohOZ0DAE9ZdSjuzRo8AGC5F2zxyGEzk2%2B7D9EjXW1h%2BDsoXQerci8sk944Fpp5xd0XmI5ZehmuJ6LnQiusLq2j%2B4O5pwbH%2BECuwbBfPd0WhomGQTdGKy5M8Xhtj3ENxFZUTosdtr3EUHmU0m1jEruhb3vtGozcYqOPRO191QbcYeNaBQKBHw1Spx0y27%2F6w2hBGj%2BwaKpNTuC5I30eYLUPd01LqjRPsy0tUVBK8irjvwr4Xc172IChfCHZ9cFFnqEbw1fUlaJzae7as8xMOqkOTQXsVNczcPxiMzpWg6OEoYuIBn4Vnl%2B3AlwJUAzRErjuzByOi7HAUYa1IdFNxmKrae9%2BtBGAT%2FE40hiP3%2F5d6quCTObcyeaH%2FSg2PUoLHtXpYv14DX%2FKhPsEDCuMDCuqV7jygTRKSbxDaEBwZqPVhJNofuuvu9zVFMdJQdZT9BnxHX3Ug372WrfF%2FOC4vsgzI2FKTDGzubNBjqkAYJW3%2FoCMKQb802MHi0Zfsr%2F13NN5I86B%2BqXH8ZKEpcXu0kLsooLSjmPSwU7bf9N%2FDJojt3svsfzukCKrECK2OokcjP275oy3OYQ7ZfBUym4vjzgDYskl5zrtUTXs%2FC%2FQrq4%2Blscr91mBlOzZhOxjRMRXfmWidqbW%2B48UwF6zhQJsmPDRtE9qDoh31tOMejIUuZD6ydXwhMHiuTmhMRwjiCG9xW8&X-Amz-Signature=a96223c32ba0fd93761f5d4f196a6522624c10be178d894ae836b38e62871882&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIWURVGA%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T202505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECsaCXVzLXdlc3QtMiJGMEQCIHGWtFo4Znk%2BbNTRHJXKD7ur1eJunFU7Z4Cg9pcJNnycAiAZn7LfSQV5ea%2BYOd8gEXUpMzsU3s92DI1zC9JDLq25JiqIBAj0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMasbDAXZ4Aw3dz2nuKtwDoWofPM3BQI01Z361ckRo%2BPRuTlped1AGwtch2DyDIz6CRVb1DJhdVPbhghhQHmjboBgnVlpfmhWBDKcMaDxLEwQJv93lQWVwVCuMzchncAgrdKR9fHJzDNA2xb1Are2n0NA72M5RXfSUY6cy0QtO%2FXS4pYlgdl%2BzpxnMRVRvN0Kld6Cj3kyDK4BzMJBNzJDVvhzqjElzHibg6MIwrPRyFgNFCiAbezrEdX1fQTOo0hg%2BMmQE9sc3aRaAP4mGS1ddWzx0tb2VpQsVjR2kPl5Y7E20y8xbYrXphqIlCEj1kX9bps4ylkGMG0NzT1ragZEhnqWBseg2k08NHTzFRm8WpHrwpoGgf7MeJZmhqjaNgJaIrP8c%2FwggMpK0l1aNMl4BlUnXEl9xx%2BO4mIrwAH0lpoUez5oRAFPkt%2BHbbw8v77XBgFCg0GQhlIHC5dtq%2B5HxPLjXkFFDTT4JVWLR3HJ%2F7VRKGeZBmLT28TfPkdjGvKODJ1ku67Mv%2FxZr3%2BWHXwIJn%2BrDZSBY6PGSM9dUw5%2FB8NthkP30yaYrxx%2B6WJCl23ENOLMfxVEeUK0vZB%2FvBseAEO%2B13NLe%2FMMPiDn3cIyGvjKEjc748CTQ%2FTMq8gJDKFgkXod9OdX0zFR0yfcw0s7mzQY6pgFPEZmrAebbaKXkg%2BNexy%2B1bFvrHIAah0zlHxDRoQYCiYI0CKUbukMvD0UDdJM7Ls%2FfEcSoEAihuPSDwiuJKHF%2B3eiA7WxSTupG0IpQUhkWOzhRLDO3mNQnzj8hhHfd5P0KRuoY76WnBZTFb079jx4DATbaIMCBFQVU9WvTrhPsmsTQc24U7dpeScMbsWXKw6w0o6vjKwOBVRZqZtdB9xB5RqF%2FfcXc&X-Amz-Signature=3de0cd22db54477c6712961e41dacfb05defc59010dc1f14aa10041a38c59242&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

