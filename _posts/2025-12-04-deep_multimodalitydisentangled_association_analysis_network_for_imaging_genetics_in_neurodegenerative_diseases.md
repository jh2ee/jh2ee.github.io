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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664STFHKH6%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T112959Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIDjSBH4RlHuijkdhDpGtHxZsm%2B3YrXarOzN%2BKk77GolvAiEAjUylKrDsXln6eg5zy9XOudyNcbLHZQk56eNG%2Biq%2FNy0q%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDDkuecjanYET4mCxyCrcA%2FlQeQKHutY0QkFyX1SQsqk5In08pTmHlfxVLyV8tXFRCb080Af5i1uVeY1Dj%2BsgOU4ARvCvbAGugY6Wnu%2B2gMwRWsJkAnVHeValeg3ZJ0%2Fd93%2FmHmiGJQ%2FWKqvOuDbUVJayG0mFm5VkWuF4WM%2FtkUHpUBVPjWn2DAdg8Orbgt8O1bOpc%2BUM20riUzYr2lI5rjQk1IQsNCoLjha%2FXL7UH2qjFcIs0IhhrKN8mgSuoq%2BydpeS3qZMgCedngiBwocF7NCyxwvw%2Bo%2Bsg%2BW7u71Jg%2BTHUuVMPjWzzxBASEVbB0LtopvOxpFSqRZV8pBuHk19gb3Woq2I6Z9ViYETe%2FXpP5V4x9h4wa9wSUy9%2FYMgHIoVLqE6paPc4%2BGWGTRbmRrdxmpdGZQl95gT6y9kJMRvUMEaqI4zrtaVMvag%2B%2BdK1H6CT27q0VD2tJ8HBBXyy7bWZTQY0YniZdvThbMYKiFjm6Jqvy%2FqxPquQOCZVdQiprgs2bhHvmG9Cd85azLBabyImCEJyIxMFqkTwOgf4wQgTbyNto8rzQxdhbZvJCocWhAuNqCqRgleBlRbMR0ERLrWIoaNu8CdKEjuHwQaW2uUI7kHFMgHstl5HxLfr%2FEZ4EDiwSgVgqkLu%2F09jLgXMOeq%2B8wGOqUBGsRMIAXOGRcSZJSQDTL7ivGp5mvoHzrR8nSzjsLyUxqUgVaYteiNrI98%2FYlwe2yxleL0P1NEF%2BUKwvpqqm0YN%2FbvW1URLNKWbaNbes%2FC1kJhvMBaP7RjSOcSfHWr4PFqoactnTZDTxEEe6IGvA5OrAV7TabbR9hg%2Ba%2BgMHw8I3dhKnXTIVqP5%2BmvjFOg0nlenVQGrWo3Ka123nEo%2BmhO2ts0Wa7S&X-Amz-Signature=16eb1d20d11b84f39390d5a8c73bfcd7f93ccfafc0237b43d0ea2a5aad12b420&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664STFHKH6%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T112959Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIDjSBH4RlHuijkdhDpGtHxZsm%2B3YrXarOzN%2BKk77GolvAiEAjUylKrDsXln6eg5zy9XOudyNcbLHZQk56eNG%2Biq%2FNy0q%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDDkuecjanYET4mCxyCrcA%2FlQeQKHutY0QkFyX1SQsqk5In08pTmHlfxVLyV8tXFRCb080Af5i1uVeY1Dj%2BsgOU4ARvCvbAGugY6Wnu%2B2gMwRWsJkAnVHeValeg3ZJ0%2Fd93%2FmHmiGJQ%2FWKqvOuDbUVJayG0mFm5VkWuF4WM%2FtkUHpUBVPjWn2DAdg8Orbgt8O1bOpc%2BUM20riUzYr2lI5rjQk1IQsNCoLjha%2FXL7UH2qjFcIs0IhhrKN8mgSuoq%2BydpeS3qZMgCedngiBwocF7NCyxwvw%2Bo%2Bsg%2BW7u71Jg%2BTHUuVMPjWzzxBASEVbB0LtopvOxpFSqRZV8pBuHk19gb3Woq2I6Z9ViYETe%2FXpP5V4x9h4wa9wSUy9%2FYMgHIoVLqE6paPc4%2BGWGTRbmRrdxmpdGZQl95gT6y9kJMRvUMEaqI4zrtaVMvag%2B%2BdK1H6CT27q0VD2tJ8HBBXyy7bWZTQY0YniZdvThbMYKiFjm6Jqvy%2FqxPquQOCZVdQiprgs2bhHvmG9Cd85azLBabyImCEJyIxMFqkTwOgf4wQgTbyNto8rzQxdhbZvJCocWhAuNqCqRgleBlRbMR0ERLrWIoaNu8CdKEjuHwQaW2uUI7kHFMgHstl5HxLfr%2FEZ4EDiwSgVgqkLu%2F09jLgXMOeq%2B8wGOqUBGsRMIAXOGRcSZJSQDTL7ivGp5mvoHzrR8nSzjsLyUxqUgVaYteiNrI98%2FYlwe2yxleL0P1NEF%2BUKwvpqqm0YN%2FbvW1URLNKWbaNbes%2FC1kJhvMBaP7RjSOcSfHWr4PFqoactnTZDTxEEe6IGvA5OrAV7TabbR9hg%2Ba%2BgMHw8I3dhKnXTIVqP5%2BmvjFOg0nlenVQGrWo3Ka123nEo%2BmhO2ts0Wa7S&X-Amz-Signature=16eb1d20d11b84f39390d5a8c73bfcd7f93ccfafc0237b43d0ea2a5aad12b420&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YE5DMMGT%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T113000Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQCWcFheXfK3sbG19Oeq9UMJx1oCAKk11GdwheEBQm66rQIgHv7X%2FYGp%2FvWkcR45b1JkzEu6gjF3MvTNxyT%2FL%2Brc3jQq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDOkEvUsekKZ8fTMNqSrcAyEVaqIxLZWb2gJ58iH5N7zvNydj09oixaDlufwGqJlU7c4TZDxuhYlKW6ajU61jZpjm%2BaoU239UHhNcMp56T75uo1gFh6G5fwZPUlBBH%2Fw2xsA6m8%2Fks8BmSYbIbisMdvgV%2BLnihMUcu3wi3pQJlHspziDZL3ltR%2FTDWS%2F1PeGNAOwMxIAj%2Be8FEjV5%2Bt8u1YCfN6wDIsfdxTsflSt5TQ4UklDTrRZGRQs1UBNDS1VrgZ%2BSjam2J0h5lclfmC7mE4j3bykXxJRdoBlZkhKbD%2BzzCG763v15N6c1U6fWczd7iJxXAKmUsdaW6epEZJhMPzVzmNxby8fsN6E94ScHZOMCz%2BYpSJEIRFxish2rGwTX2QyoiLx5iaucR10iM2NEALMuW668BDDbpNf3FDR8dK0Bc7RIxo7lXQ6Wh6f6MthLzfB2grfMF6XtjMTfEMpERaeMQGAFNeHUxUsBJuyFBEoVcw%2Bf1p0wbOQWCsLnnz6%2FdAoDd32l2OqZZqADq%2BQZ6hp66vZ%2FA2AiqyiDcg1YGZgEQKxlpQ4nIjARQTnuXX7U4EHw65Xps25i4cLbJLJeR7xo%2FuSfTW8GMwVzKgBlbAyl78iAojY16AMrNeihZlWGJu%2FF6mrKJ81TZ2byMKey%2B8wGOqUB6vvoL09ML%2BSgowE0UcVlnNqAxTFRz%2FezU7i981pjiRhMU75KL%2FkJmg%2F2M%2FtUByAzOuFn42AHKsG1aTxPy%2Fe2lg2%2BypToQT%2BZ1P5ipUBFLTENIorDqqMmNzjNjGfcOSbrnuqlB4Hi67oeIsIo6N5ZLA0L7iQXVtyGBrk3uaBOrRozXd%2FkqWI3r0Kh8u%2BggYlSY0d11RXwdJZoRQY%2FAWOXaHGTTGae&X-Amz-Signature=aba6b80d1eeb8b6624da585bc2ea9f47f58a44cffd7cdff4582611e604037c66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3MZDWYJ%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T113001Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIBgMd40G0boAcB%2Bdoxx%2FqIYgfPNotK67Uo%2Fd8W0YV%2BSdAiAnwFDPBoaWYRnh1vyByg0qNHNazZUl1TlKSLat%2BAMWZCr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMRHJ2290gFD6YBlZrKtwDFJb33w6rKawMRrxytioWyYooaBKH7Y97oOXOTz%2FpuynP7lOCZ8hNUO7hjfTdp4EA01Ap%2BcJx9h25416n%2B5FPE8ZywBWNdeL2%2BL4gRX4j3kYi%2FatBlPb45C7HOKVP2DTr4gSKnhdJ3%2F8mwOFTShmhbBABOmyy3g%2FlYsEu5sC%2F%2B%2B0hDvPjt4TURI8SHwbtU%2FA%2FY42PgLR0096GmAT%2B9Hsu7iHEWfhfwkg7%2BeAj4zdzvei7SyFVe5WH7d4cdQ5WAHlkrif4pkhUBiAiEeQ804t1mvGLeoaAk2JvDwahiJEggBFy9x0qgIwB%2B8CYzvdihASZ5Y4zx%2BHlmEyFMHIhNa1ocYFxwDjU%2FFDHcOIHAae%2FP%2FwIi%2BDe%2BCNIB7VtQfR%2Bi8m%2F9HkpOkW7iaTFiEXeO9XLROyIHWPjHbPMTUEInFEp6dDMSY5EvZw8u5DRo7tM89dqybZUoeFKJjbkWCUDUei5CaPBlXMRBVFzfgm4D%2FZKOty2kzGOHg5rt9TPlL49FLnQKzSKwcn1CY1GHsGzAvUpSMNBed0MInqAYQXnZ84YEhhYQWIEyPAXmQk8K28%2B0Ji9lUk7qq9VKOs75NAPL4aO243jN9tdpy560KGqJ6O%2FreQapkRiOMMpjc9WY%2BYw%2B7H7zAY6pgGoPFTa6PYxBZCB1kl65UxgQTbtO0VA6C7ZCu0Ro25jE1QvdBE8UHO2cyTigo3NAWKHxMDmqeuhCtRG%2FQGZ%2FsteANMFbmKDPXjYzUmQLH9rqPVDuKcZRct2TcT22a5E9TMd65EGR3Tv8z%2Fh7HhM%2Fhz9IxYvUG6XDikQSpApzO1e5BVSmLG9T3sk5XewZ8vOGXQ39Ky6lb7fyfga1RkfdCbGFVq9Vodl&X-Amz-Signature=059a21cb1ca09ac0b65719eb6c2a760f7f1f91ece955106f53ee3f14f0d4acc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3MZDWYJ%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T113001Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIBgMd40G0boAcB%2Bdoxx%2FqIYgfPNotK67Uo%2Fd8W0YV%2BSdAiAnwFDPBoaWYRnh1vyByg0qNHNazZUl1TlKSLat%2BAMWZCr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMRHJ2290gFD6YBlZrKtwDFJb33w6rKawMRrxytioWyYooaBKH7Y97oOXOTz%2FpuynP7lOCZ8hNUO7hjfTdp4EA01Ap%2BcJx9h25416n%2B5FPE8ZywBWNdeL2%2BL4gRX4j3kYi%2FatBlPb45C7HOKVP2DTr4gSKnhdJ3%2F8mwOFTShmhbBABOmyy3g%2FlYsEu5sC%2F%2B%2B0hDvPjt4TURI8SHwbtU%2FA%2FY42PgLR0096GmAT%2B9Hsu7iHEWfhfwkg7%2BeAj4zdzvei7SyFVe5WH7d4cdQ5WAHlkrif4pkhUBiAiEeQ804t1mvGLeoaAk2JvDwahiJEggBFy9x0qgIwB%2B8CYzvdihASZ5Y4zx%2BHlmEyFMHIhNa1ocYFxwDjU%2FFDHcOIHAae%2FP%2FwIi%2BDe%2BCNIB7VtQfR%2Bi8m%2F9HkpOkW7iaTFiEXeO9XLROyIHWPjHbPMTUEInFEp6dDMSY5EvZw8u5DRo7tM89dqybZUoeFKJjbkWCUDUei5CaPBlXMRBVFzfgm4D%2FZKOty2kzGOHg5rt9TPlL49FLnQKzSKwcn1CY1GHsGzAvUpSMNBed0MInqAYQXnZ84YEhhYQWIEyPAXmQk8K28%2B0Ji9lUk7qq9VKOs75NAPL4aO243jN9tdpy560KGqJ6O%2FreQapkRiOMMpjc9WY%2BYw%2B7H7zAY6pgGoPFTa6PYxBZCB1kl65UxgQTbtO0VA6C7ZCu0Ro25jE1QvdBE8UHO2cyTigo3NAWKHxMDmqeuhCtRG%2FQGZ%2FsteANMFbmKDPXjYzUmQLH9rqPVDuKcZRct2TcT22a5E9TMd65EGR3Tv8z%2Fh7HhM%2Fhz9IxYvUG6XDikQSpApzO1e5BVSmLG9T3sk5XewZ8vOGXQ39Ky6lb7fyfga1RkfdCbGFVq9Vodl&X-Amz-Signature=bc41b740b410a81b16e804a4f93713d782a2fe9e8a3fa7c62ba2041dad357d94&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZLGUHGI%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T113001Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIAdS2LBvGmPiP1C5IAz4SAvy9aziL%2BbNhunB6XeriQVtAiEAlsH9kLRgwS90A0rGHvz0AHT2f4XWfSRIYlc1vFEJWkQq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDA0dBWigImbUBJxLdCrcA4Kn200RGbo27rpTqpxZncnLWtAcXQ6NC%2FijiopE0Nn2QaxxObceRTK5eDAOByjFyv7PjweA%2FVLshmCcxQWWUS%2FVa8IvMvmOis4XSjrLlUG4lU2I86s9%2BbNUUnMVJ%2BleXoK%2Bk7O6z8t12izvl7nDtcIu%2FrqjblRsmnII1sfNtiq%2Bwi%2BFAxBxG8f2kHBdeUNaP5pkdZbtcaHMOTTTh47wHqD8hU8Pw9lTBh%2FM79h6ytCzRReNsEb6Nd05ew%2Bd2ZjXGfrAsGmqK4%2BUZ1yP%2BC9pe25AvqUBF0HJRXInHGF91YvRdrBIBENtD2IFG90ZoEpWdOriUgwT%2FsMbiGGY5ncjN79hKV3ImsA2j6FnZOhkvmMikssHaXz3w3XkEGsIiQV2xGafcYuncWhM3Y7XeyvOB0RhOnt8DKa3PxnDdsqIkvWNDS6XrimX9G67kATO3CTilFFza%2BGSR%2BS5XtpyjydEy0N72AkUwV3Q1qihvF0MKPOiI4Ex1hRK9fI92HPUI%2F45Z9486wtuqVyJ957pwwtikj4FervgHapJA6S%2BnR9NeME%2Fr1oWY0qh7kLWS%2B0FeOOSYIQDuv%2BZoZwMZR3pWCH8LIfftLjgNdUmTMy2X3JOoFhXh7r7yEz9q0rhNjL6MPux%2B8wGOqUB4lj6l1GGwkbL8%2B9u3Lz6YzPFl7TGJIBQQ02aNWSz6IL%2F1ASWnMORmmmh9l5W7LVcO3OilWg1h1K2Fx%2Bk88oheRl7DUSNNPxjrouQKYeYH5SvFKHxut8aXh3AR%2FAHNxwBr4aE75EuhldElYFPTslMGrQkCckUXU5GCTnV7JyUX4W3HnxjVNirxS8SGsg2GCsQJO2fNNCaLQwnhXEcXAQaA%2BiI%2For7&X-Amz-Signature=bc238ab291ea8cc1a7e05c8ac4e13951fce0a1ae827811fcb817d6a0aa795d1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JUJXI5Q%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T113002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCicjnYnNNTzfdQtsrZzOrBiK8aUzgzjqxa6ssRBgZS4gIhAKRubbcklB5xqBUK2Qp%2BXSWHrWjIIvg4wlROBw1wxQHSKv8DCAwQABoMNjM3NDIzMTgzODA1IgzwEPq%2FKefijmbAof4q3ANepePGVlHWkDoeCYelfyN1Nz%2BkkL6QLOY8RJAI0z7o5%2F4XGUKHcXC4mSEv6T%2BWA62Px3Hiv0HBkLuOJzC6oIwT%2FtNHt97lSwfcCdjDflo7k3fRpHjn6uthaZ5FaQbPyFNI6kig%2BJHNOWxzGzalXmwbRDGjQ0rY96ILmbuatblQbecCT6%2B2CgC%2FMmvcNahYcOyR%2FT4aJbLqkalKybFHo7qYfDgAXxKEk4kIfmsD3Bn3g%2BuwIYExWmnyLIPMzUl%2F6pkkRLCpKLOwB0U24rB9u6SI%2BcZU2%2B7coNOKikmIloTqaJ8P8h34QK3pTRBPY8m8HNDpVYJEH9wBfJmQUn5ncDle2F7PRvAI63xPOUVYWzCqjLN%2BSpqnLSnfewhiMNEZwYd4KZaA8BX3CVcOlaQphgJD4lLOWr%2BTvWyHBJ2wGpUipiURxC18rQTehAJ2vXsGKfqnIqXgjmYh%2FiHvavjgZqJEQXLVFfU%2ByO81Q%2BYRcLA2Y8JS04JoDiOnrwNksjNc7QT%2FUqsIcfReo0gstXbZ1jVt1oPr65ii4S3BoBYKe8aEDcCIIv%2BbVbi8hWJt6WkCu2%2FHbY2LOtx2J2eD16Ss3B3ULuLRtRiw0V3CkoiJFlhOcgZsy7KCd0qcOl5aDTCor%2FvMBjqkAXB2H2obj0uyZ1Anc83iBXuv7t4XQAtVcP85ukbhpuxYn4iQvgs6Td2YKUgvviVfT1LMtY7yk6BfRxEN0fi2h2qO4I%2FWog838RpGpOApIE7j9dpp%2BbcgkGWARPurNioX095KMQxTBAHZHu2LzTsGXk2wXr0W2tRWmBqLOj2D%2FgOIZ8UZWOZ%2BZDcs8oG1M08qDEe38U2b8dARnaE9cmDq6aUCjROc&X-Amz-Signature=a4be282bd58a897348b402098883b0913c3cc54df088b77583818c3d9dec9540&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJOHNYYQ%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T113006Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQDDSAkL%2FwZlRBO9t2AJ15agZrtljLtKkKZrrk2CshnJ8gIhAKYw7qB2dM0YZ4M7VyrT6oNnootI7EbnN86MDdGoBNd%2BKv8DCAwQABoMNjM3NDIzMTgzODA1Igzn6bgdKiNAkQmHTDMq3AMJEK91EPqWeHWEh6UlHab9cjMY0VbcMpfXRhvNYbEKzpkAyZ7lInMaX4iQn64mL9tqLaN%2FueX9fhRz%2FwNvk63deFRaBm6GuPfNOrhj5%2B8QElBVPO6ynhpVF9GpgpA4nb7kxDxAVau0tTHcPm5f1Fj0%2F1HTCvWQWm9Z28l68ZL9b0lNpc2adX9nxTJyOkxcnrFSlApZvG%2BWHSplfc93FCcLr0%2F1FqavMo5whB72dkHG1rik%2Btqhw5w3ENN1azI1%2Bdaz3WyT46Tkimh%2BvcNDJ1OhKC5JRIa3jjRwWYi8sfLN2GcQINs72nLrFWVYbon7jsTVenQDFo85BlhiC%2Fqn87%2FNxa4sCWkVaywS6TeGYrHcKCtMo9O%2BGjCK4Ditxq%2BydhYK6FTQLa004ntbPKw4zMwiMRUVLUFliesjsGYIKg9uwJFil6dTNkhiSEOQ2OmOax2EzQsBMft5SlXyb86ZADe0ZJ%2B2GN%2FFxeABxopkV0h2TbneBqdS0svLSZ4a6LUYBk6Qx%2FOsutYLskNI4eLx7CG%2BxXAv7ygEr9Mu5yCtepvva%2BtR2a0cjWuERbrOgDzkZtz%2BQYc8VDzBPPxCO8nYsMgcvAgqzZiyhMnPcsfVGtyuvKRHx4R4a4Gx1gBQ7jCzsPvMBjqkAefFCvLSXIXw1TEqvszKicl3TPPTgVpoOt1NvNrLQUE%2F822IUWY20UbCN73OA7YmRjoeMLC%2BHk3OlOkHuYR5d6OGCgD8KZi7pIZkRWiqrcsrfRwFrqayCZxTcShhHgbYDz7wKPToptBA%2F8OOBmGCBYdz5rN1EJ%2BU6%2FpXCTgPGVSrzWO9F22CNiQeUKkeZif3mbcwp0%2FI3HnxEAwu6PinlgimUESb&X-Amz-Signature=936679a5fc5fe35bb6ee585b0d403d97438c61381382eff3971b711faea36a60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466377UU7XC%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T113013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQCM0gxAA2rBUa8MSHVU9ZHhwqjzgQSEkhHvZ8SDxFlm7gIgeTwH%2F8uwaKcWLu8Iqm7DnNa547bzZQHMvbFZ3pwPlBgq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDEps4xY5i0MY2eewuyrcA4okxL0XU%2Bz5lGpR1coy%2B2eYvH0pWNylOa%2BSRYxMXa7vQHhJ3kICymIIi%2FJFxzWdpT6U2YACmbHs2yOASKx5sVQIJQYxVfuOwvJTbS97jDDR0ApQ8QTLANjcAd4Z%2BYCoRGJUzag9xfAffY5gLjTJIKTRkmst2PaSaN%2FbzOOgK7SUcEjR%2BkkrNgeT8sNDRDZlnVlNKADx0PlPhXe7vKUoSEUOttGSl71mHXHSlo0%2BUUtl5ijeLc5KNfNbcqOenhPWsMcCiSe7ul0CuSvpmwjS4Jns9RjqgVS6B7MWxeoK4rsLLXzTpp7ACI9LKjbxTFbpSMhEKaVF71FVhkc%2Fo0QzVk161J%2F0kzvK0lE3K3O3hVZWVcw8d1hWgeZDkgaey43RqB2vbaOVW4V5TUXMkQ8ljAcST1BhAN4cp4JpoXgWYLk30mxs9pRRAB%2BUPT6VeN09M%2FBmG7oy1evLcH84ubm%2FLeP1nKZ34zWIfu0U3TeNTLJZYxkCQmHE5ZkblhoJzTYDX0Q%2FISMskbXpevSbVMaLonsMXk3QZpJCOBzWCx5ZQdVMFoQQQ9z5xCavvjSAAsiY28e55xyFvz9uJ%2FGvim7j5Yjx23M3x1Oogk3VeN3Cf30swHBkfuN0XYCNay1nMLay%2B8wGOqUBYPnwWM0wqt%2BLizQBDXwIINHq46zYeVh8NSJsX%2BQa86TI3GnD8Jmbj0pTbSlyc935p0SbzU%2BkyjFNZfO4%2Fk%2FWkGE7VNRrxTu3CwnKkRcI5Y24iFJMmVvF25k2gT7nmG%2FPUGFXRNX5zpJSZh7%2Bcm9z55YTi4lKVRH%2BmeS1nEtf5yNI9St7awi9S5d09CS%2FXOQk3vl4ZjvOzqBNrMx7CKBvYgV3HxhX&X-Amz-Signature=0becbd418af16c533db0e4356015e0b45074f904320407e6bc60932e3ba0d04f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466377UU7XC%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T113013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQCM0gxAA2rBUa8MSHVU9ZHhwqjzgQSEkhHvZ8SDxFlm7gIgeTwH%2F8uwaKcWLu8Iqm7DnNa547bzZQHMvbFZ3pwPlBgq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDEps4xY5i0MY2eewuyrcA4okxL0XU%2Bz5lGpR1coy%2B2eYvH0pWNylOa%2BSRYxMXa7vQHhJ3kICymIIi%2FJFxzWdpT6U2YACmbHs2yOASKx5sVQIJQYxVfuOwvJTbS97jDDR0ApQ8QTLANjcAd4Z%2BYCoRGJUzag9xfAffY5gLjTJIKTRkmst2PaSaN%2FbzOOgK7SUcEjR%2BkkrNgeT8sNDRDZlnVlNKADx0PlPhXe7vKUoSEUOttGSl71mHXHSlo0%2BUUtl5ijeLc5KNfNbcqOenhPWsMcCiSe7ul0CuSvpmwjS4Jns9RjqgVS6B7MWxeoK4rsLLXzTpp7ACI9LKjbxTFbpSMhEKaVF71FVhkc%2Fo0QzVk161J%2F0kzvK0lE3K3O3hVZWVcw8d1hWgeZDkgaey43RqB2vbaOVW4V5TUXMkQ8ljAcST1BhAN4cp4JpoXgWYLk30mxs9pRRAB%2BUPT6VeN09M%2FBmG7oy1evLcH84ubm%2FLeP1nKZ34zWIfu0U3TeNTLJZYxkCQmHE5ZkblhoJzTYDX0Q%2FISMskbXpevSbVMaLonsMXk3QZpJCOBzWCx5ZQdVMFoQQQ9z5xCavvjSAAsiY28e55xyFvz9uJ%2FGvim7j5Yjx23M3x1Oogk3VeN3Cf30swHBkfuN0XYCNay1nMLay%2B8wGOqUBYPnwWM0wqt%2BLizQBDXwIINHq46zYeVh8NSJsX%2BQa86TI3GnD8Jmbj0pTbSlyc935p0SbzU%2BkyjFNZfO4%2Fk%2FWkGE7VNRrxTu3CwnKkRcI5Y24iFJMmVvF25k2gT7nmG%2FPUGFXRNX5zpJSZh7%2Bcm9z55YTi4lKVRH%2BmeS1nEtf5yNI9St7awi9S5d09CS%2FXOQk3vl4ZjvOzqBNrMx7CKBvYgV3HxhX&X-Amz-Signature=873fb1978f316c0381f7e07be48161c289fee66ff2020e237fa3aa7936be4c6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4QYYR44%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T112955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQDs4ormsjwC3R1Yxv1mnakIE0ehTLVcuymNG73pfI%2BkMwIgfJnkDLIPf85Kjk6UcwFn4m%2BlyI7dPHcjGhevsRJwf3Uq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDOdmfK0qv5I0gQXJECrcAzHGCsiudMyKCzG2II%2FYZ2oMb43Y%2BmJ1HOh5LlsywBhhlCLBwg5W36%2FqQ2u%2BPnYtHCCEaflFgyX0ZnCgeZgRDHU0dwvf1X2dnIWQwjUqs79Y3FmxWUoJada9091z0JZQVTEd8GZ2WdcqvLDoXStz%2BMBZ3agBUZIb%2FziySGwo6aE%2FARayZaE5tjMzUVJm4XE5jnX8B%2Fp5grq0Gctyw46pfR%2FYEFY%2FIcfsz9bWTViJvmw8dMaqijO%2F7VhhhWlVgP3ga7SYREOCWgqlvfpZ55wUXbd7xbglmLtl1rBr3yf8zw2lHlaS51WjuIksJYCLPPLLcN%2FJWNEAj8Uhe61TIC8zReeyNVhamKd%2BaUmR0dxFaO%2BRT8ecMyUbJLdP8891nUo5ITm8zdIfkIEZMQjivPKOhHokJeC%2FQGlkX72hQTrClbX%2BH7aJmR1dcYLWOmp%2BHlbDsDiNNt5um0V7DOoaUXU4Z7gVVxkmDPLgiHzJm6zZFqKwSXbVHFIh4laPk3Z1j45GA5lPeR%2FDIVT9pG2ZCQbzRys23cBz%2BjIhF%2BVK7wLQvQ96oqdBtfMKzcMmCz%2BJ8FzTssVkXyTolC49SjMGgHskITCMVoGla2ury5lPs%2BA6JZUmEr%2BHiYrIh%2BlRHIQ3MLSu%2B8wGOqUBL2uTApw3p8VzDtseEhezwE%2BPoV%2B1TejFoqMPNHKxaaIzrSw4JygL44XcRR4%2Bke10YkTo6TkJS2KYpCPhcHIy24vjwf9QhCQxHiWNz264hblIJHO029KHL0E4PKlOkW%2F75vZJAd2r80TRS711EPT70sPashSgbmPv1oI4wuwE5c58wZuY4Wy1ES9eSIFm7gfa5oFxiW23M8tHEtpyb2tHX8ehuZLe&X-Amz-Signature=6e3e7c51620eb992ff239afc1468502e6d1387c3e59c4b0d4818d14a29fb0ec3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBCQV747%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T113015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCu18Er8LLeJynd0htL1vnjP4fLatvc%2FIVFZU0uxvrm4QIhAJv3p01u5dLy5xwTVcOxfGVqFHtTItfa7HdJSszuEuORKv8DCAwQABoMNjM3NDIzMTgzODA1Igzp1PttxHs%2Fiv0eSkoq3AMio8puBrmh5juOmhdFFqNwF41%2Bt0OaYwT0LTJP9xar2F0oSJ%2FhBMeWJStjtnxS4b%2BrkrkdNBmA%2FxLG1FgUGUUB%2B7JZF4NIs7sBmMQEGgbXfcrz5O0Oy%2BuQhfx%2F4%2BFcjiWPqCJjaY6nfE3mIa9R8t3HC%2FN5TSB0Y7MfeX2k4L9is1jZEz8bTDfoHP4306pYobjXpztyCuHaHLT4tIPWzJpC%2F%2Be9%2B%2BICnVXHxuu5DAG8cigei24ZwkgTPzk6DdmfSUl5cwbf9uDBkq4aueIP9%2Bgr59f1Fy%2BcXheNwXWe0PhRyGw2gHKNafUJih7bI1%2FLaep3BS2BU%2FPX%2FOaxz5pFwqZ6vr1eFVUMfaTrfwducTpmm4p1HgvWpRwV%2FIOH%2F%2Fjp%2FykhHvPeYc2mQODZsnDBAoSCN7zJqq4s8AplgH2W%2B6yzLSxq7PSd0aHlox0rxMpVY2BhzBqTt1D55H6y4pA0lrKY%2BcHaonU7cjDjNjxgdnmfv%2FFmFgUv4omIERzVDKvYspJboIrUmpcg1P9qbR8Y92QD6z7SmyxDQn2kjPI%2FmXPbLx8Tc8OJM1s%2BjC7JNMref3TFtRy1lizr921G4rg8Y3gAxpYEEgErIviieFfluDR1ey4W4qiRGpDEUMgmVDD%2BsvvMBjqkAWegm%2FKotYtRnk2AX%2BOSYFQdILDhfvAFuq9owss8S4mYGqAuAuufatxx4QLer10Dz5GiwTLUUNPDfPIQbj0x1xHwc4AummfDmkppBE0lqzbAyff9oa%2FQJ406zX1RtYqsE5yIWlzaF9NiuKS%2B9qNHCcA0JGmdREuY7uVebXZW2%2FWjfg%2Btfp8DXg8scI%2FwzlyzDwVczmZsYCm%2BrsWGmO%2FYKqcyRE8O&X-Amz-Signature=3bbdbf010277d3cc63cdfdb65339389d1817c267a4a0f28e4bf1b60369be26bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBCQV747%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T113015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCu18Er8LLeJynd0htL1vnjP4fLatvc%2FIVFZU0uxvrm4QIhAJv3p01u5dLy5xwTVcOxfGVqFHtTItfa7HdJSszuEuORKv8DCAwQABoMNjM3NDIzMTgzODA1Igzp1PttxHs%2Fiv0eSkoq3AMio8puBrmh5juOmhdFFqNwF41%2Bt0OaYwT0LTJP9xar2F0oSJ%2FhBMeWJStjtnxS4b%2BrkrkdNBmA%2FxLG1FgUGUUB%2B7JZF4NIs7sBmMQEGgbXfcrz5O0Oy%2BuQhfx%2F4%2BFcjiWPqCJjaY6nfE3mIa9R8t3HC%2FN5TSB0Y7MfeX2k4L9is1jZEz8bTDfoHP4306pYobjXpztyCuHaHLT4tIPWzJpC%2F%2Be9%2B%2BICnVXHxuu5DAG8cigei24ZwkgTPzk6DdmfSUl5cwbf9uDBkq4aueIP9%2Bgr59f1Fy%2BcXheNwXWe0PhRyGw2gHKNafUJih7bI1%2FLaep3BS2BU%2FPX%2FOaxz5pFwqZ6vr1eFVUMfaTrfwducTpmm4p1HgvWpRwV%2FIOH%2F%2Fjp%2FykhHvPeYc2mQODZsnDBAoSCN7zJqq4s8AplgH2W%2B6yzLSxq7PSd0aHlox0rxMpVY2BhzBqTt1D55H6y4pA0lrKY%2BcHaonU7cjDjNjxgdnmfv%2FFmFgUv4omIERzVDKvYspJboIrUmpcg1P9qbR8Y92QD6z7SmyxDQn2kjPI%2FmXPbLx8Tc8OJM1s%2BjC7JNMref3TFtRy1lizr921G4rg8Y3gAxpYEEgErIviieFfluDR1ey4W4qiRGpDEUMgmVDD%2BsvvMBjqkAWegm%2FKotYtRnk2AX%2BOSYFQdILDhfvAFuq9owss8S4mYGqAuAuufatxx4QLer10Dz5GiwTLUUNPDfPIQbj0x1xHwc4AummfDmkppBE0lqzbAyff9oa%2FQJ406zX1RtYqsE5yIWlzaF9NiuKS%2B9qNHCcA0JGmdREuY7uVebXZW2%2FWjfg%2Btfp8DXg8scI%2FwzlyzDwVczmZsYCm%2BrsWGmO%2FYKqcyRE8O&X-Amz-Signature=3bbdbf010277d3cc63cdfdb65339389d1817c267a4a0f28e4bf1b60369be26bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YJACCN3%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T113018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCzPrreh6GZAvxqc0AKj3mGa36gKjwnChcsZvwQcl3v0wIhAKminpj6cpg0xr8U9dm5Tb9Korclk0Ag8oFlN%2F14%2FyVdKv8DCAwQABoMNjM3NDIzMTgzODA1IgxeN7aUEqxLk1BbCZIq3AO%2FSLYFNknGb9O2V14uf6UoVF044l5QjJGxpDNlr6a3gAsFJ8zdqamul4K8UN5pEggg083fOrH5THSEyEmow5V14yHsA2t53oZUChgTlcs%2FIoN%2Bn%2FjhMWCzB5PdavJtNYpFXeIm2wdeaH%2BXUb8cqBPqdBCxgf7AkBcWG0XUe5JzslnPSSUJJoSS4SXBbl88C35lp49Q5ctOFFlVITWZRNYzSu313YQ9W%2BjGxFBY7aSB7Z5tuww2UOPPtXJl0AgrfU4YOjarA1MfXv4RmRt0Li383xKBgKH5rOPleIch1oz%2FnWdLUcMDkUEvs9H1B0a6qTA2JiBaFgOmaOuisgKedC7lZO2WQ7ZXm839QafWyww07GwRpcStU8ejBLnIVPVPcSedYAT2at9dMo9Ei0qPBhesJGEO35igcJIF2dtcDBApkHc2Iu8vWaBC5uZqyUkInwOaKhWuKzU6%2BFrGIwOuwQs6ifrz8DWJuK5dAP3Msf0i2YbDnsVdIoyoc4phYka5y0a%2FePW1gDLX7kgwb22IfqLHqijWOpnt84H7yghR%2BDWZG5XQhzuYApjpF3Wy1XNNi5MPtxvLf%2FiXborOOFsDNQc2WW2lU4O9Kd8QG6rhNtiHnsgZMF5c1PiCSBum2TCUsPvMBjqkAaNhKIGUq7Dc%2BjvPtZL7i9lcYfY88YiiY04LKrAJEkiu%2BaaEszjFYzMbBd7tTCNZWmbIgEJA%2FREVKRATmyusBsJLNYtqE%2B8JJIRgWtLg9qMEAxzGug8tPSgFZQBlFEM5e81YEzLIuqUIDPlj12eyQyQTiLvhM%2Fgb2h4Xc1lhYplw8dKY0Yxdpw8ePPlh0QlBoKTue0QGdJCMS7CR4G9nl3FPPulH&X-Amz-Signature=db6830f6a4884f88754f64beb43a0a38cfa261a40e283dc02e2d77d5d39ff11f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

