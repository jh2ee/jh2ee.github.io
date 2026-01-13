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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QSLAO334%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T133255Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQCKst85ChaDe%2B7Sf8zKahgIcAHF0rvUNwDW86d3oE7ZSAIgGutlWDD20kXqO6hAYYZF%2BbFywtGCHiybdJxaqB3jMF8q%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDJHvKFNtRFaK%2B4%2ByfCrcAwxWPTuGP07kMBuqX5PKDelw1a5pxBx2HbfiPZ2NPONAfUKfU2hcMkCDJ%2FixXE7M1iUO5C3P2v061fs6NN5tn4wgV3ub2qn7tZzmlOWoxA28wkloxNbRw3VccWFj3GellbSZLMmLyMugj4T6NoVo1iotBTYRbu3dQYNqUqTKL284PIhTI55jChyb5tPPk%2F7uuHh%2Fo3F7NmWULuKaERM2WgvHxlg%2B5xqqlU%2FKyzoc08oZoX29l0I2gaqg2RDQiKOxWYxbzgd%2BPTbhiJ07xVDnaQICrf%2BJ5inY9L9RIRGyOMj3EBbkl9QfUoYWXucCOkYct6iWiGTAIifXCrbB2iSRIrUQ2byN2jvGm9VikKdJnbWY0u2VSuxlmS236sfw5pR%2BPuYCVnJiYYp%2FD%2BJbU2p6oppPkILzplER6FH7%2BBTptqbifpFUrP7fJXegVa17TdnmPMEnIIOQa0Y1kucgWuNeuVC7%2FZ5%2F%2BwaC2MYwoY%2FZXU5jcfCFGlWUbL0VwkQ7c9E67LQjr0s2bSuq2ERyfSed6bNAfwm2T%2FBjYQFnfNPrwMYLXbjsXNwfW9qwNezyGgpRY3k5kXINxj%2FfFfUiqcbmFEA5oVE0OzwJ9onfdTuoxr493AwmeBX%2FcPntulOYMJKQmcsGOqUBriiMUG9ogMP%2F3zzyS6fz28GPDYWIEdOBN7z7QWoPLmq64dPA5navO%2BxQ4nndeEos7occGG7Ij3GAkN0neZNvRBdRnaxv2AgbIxnAm5U6h1iDikZJnc4r%2B19IEXFu2OCoV4Cu9Ws0JsKu7vdhyVXXqVvZL4axRZDoLn576By4WyRH%2BK9NcHUfaALvTjng1CKmoSgDRq5Li1fXDPiWXPRxKNscXMLW&X-Amz-Signature=1fee00a1fa231eb8dffaf8aaa3238a8a95990804fda1c8ccb8bbaa83377dc711&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QSLAO334%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T133255Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQCKst85ChaDe%2B7Sf8zKahgIcAHF0rvUNwDW86d3oE7ZSAIgGutlWDD20kXqO6hAYYZF%2BbFywtGCHiybdJxaqB3jMF8q%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDJHvKFNtRFaK%2B4%2ByfCrcAwxWPTuGP07kMBuqX5PKDelw1a5pxBx2HbfiPZ2NPONAfUKfU2hcMkCDJ%2FixXE7M1iUO5C3P2v061fs6NN5tn4wgV3ub2qn7tZzmlOWoxA28wkloxNbRw3VccWFj3GellbSZLMmLyMugj4T6NoVo1iotBTYRbu3dQYNqUqTKL284PIhTI55jChyb5tPPk%2F7uuHh%2Fo3F7NmWULuKaERM2WgvHxlg%2B5xqqlU%2FKyzoc08oZoX29l0I2gaqg2RDQiKOxWYxbzgd%2BPTbhiJ07xVDnaQICrf%2BJ5inY9L9RIRGyOMj3EBbkl9QfUoYWXucCOkYct6iWiGTAIifXCrbB2iSRIrUQ2byN2jvGm9VikKdJnbWY0u2VSuxlmS236sfw5pR%2BPuYCVnJiYYp%2FD%2BJbU2p6oppPkILzplER6FH7%2BBTptqbifpFUrP7fJXegVa17TdnmPMEnIIOQa0Y1kucgWuNeuVC7%2FZ5%2F%2BwaC2MYwoY%2FZXU5jcfCFGlWUbL0VwkQ7c9E67LQjr0s2bSuq2ERyfSed6bNAfwm2T%2FBjYQFnfNPrwMYLXbjsXNwfW9qwNezyGgpRY3k5kXINxj%2FfFfUiqcbmFEA5oVE0OzwJ9onfdTuoxr493AwmeBX%2FcPntulOYMJKQmcsGOqUBriiMUG9ogMP%2F3zzyS6fz28GPDYWIEdOBN7z7QWoPLmq64dPA5navO%2BxQ4nndeEos7occGG7Ij3GAkN0neZNvRBdRnaxv2AgbIxnAm5U6h1iDikZJnc4r%2B19IEXFu2OCoV4Cu9Ws0JsKu7vdhyVXXqVvZL4axRZDoLn576By4WyRH%2BK9NcHUfaALvTjng1CKmoSgDRq5Li1fXDPiWXPRxKNscXMLW&X-Amz-Signature=1fee00a1fa231eb8dffaf8aaa3238a8a95990804fda1c8ccb8bbaa83377dc711&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZWQIGWFA%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T133257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQDxxbWsLYgBi67afYYnlcpShARRXQS9BCeOGrC13d5zfQIhAMiby5EUJRJ58bjtkQhKg2tv1DRhG3E3bxC0dsQXorT0Kv8DCAcQABoMNjM3NDIzMTgzODA1IgyjiYvs0MZGiM%2BpPfcq3AOcA9ul2WAKHFAu%2BS4Y80xFbi48yrx3rpOFEaH%2Fzu2gSQrmfyyXhIw9R4GpBJ1lhtndmCcGMqIypbZDdPnTUdsewqHD28n99%2B%2F0A1kRD8qSvKQZ9PYycEABDmI19MhcImtqApzswfZNZXZacUJjojlE%2FPxXmJa7SB6kVwXI1s%2BQnqTYUyVGLRbq9b8RW71y18b6LCMrAhTkBdZRBjx%2BIfphpzNMMN7UqAJlx1IEIFUako3MbXzYzidk6RzEeJ5j8blfz2xcxp1ZIohkt%2BbtG5r%2BYF1HHRjGW10Yy3Z5f7IkDxigTLhZtv9TMqcFknIgjXuHIIlQxyrPV1%2FjsSaxPb7zfeJ9bmWCfRKICgEFdEd3FSML%2BoUrhjWmIZWTxvNyTqRSA2%2Fxh5SuuyK8lMxH%2B18eTFoYKyVeDqwGdqPLum4EW5J9ER775F%2F5zJSxeBVh7NrBqy6Wd9pGDmTYeE0yAqpyE5s%2BvDOFQinGDNvlk6yOQIDbe5FZLiUUJVCBgSjvo80vRSlXt8mraEiaZSHwH7RhtQYKtepPy6CxTpogp%2BIyK8cjsNhyosp3Bh33rkw4HwDW2dLOLCj3w3tBhjPVrwDT6hBXM5bTV5LGb3jmHPTAddDkbUiG0xwkdeKdKjCzj5nLBjqkAWp7OpiHV%2FcLP3%2B8oyACSJs2VqgmkD25wywUP1Xr%2BUAu8wj%2FI10PJo3v0SsITtNsFktzNs1bJWoAKwU4k9WTeVhxbo4gqnLvK1GCK0b7kWV104AotwmZ03QCQkuW7%2F0H7TXHzmyZnmktolW51RoY1j8CglQpKJ6pzkykWCS%2BSPuJYPb%2ByxtJ1BbzBxvV8jKchl5HNwS5W1m5vAfG1zTFSMLXLSgw&X-Amz-Signature=b548f4ce919a54eb9008a68b94d031addd9515d0fe53ab6cd4a596813a192872&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664N3UOLYM%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T133303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIHYh3zxh5DabvvXxM5MYipHbLK%2FnwxeWfT2Bk6i%2Fp87hAiBlm1bgFPqA84hrb%2FaFYyMxsSA%2BbMKWBCtDgvB1fGlHJir%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIMDI0SwQ5utIVAxVqwKtwD%2BNK4uZqeG7ZODCJZU6Ml3CPu2rzR0WOy1S3c2bHeqC9kzIhXrjTmE8xbiLV%2F2s6VRGxj6FjEhK5a6cNihqyk0ACC%2FsifenrtmdqDLMSayB1tzj9gwJxtlLfid19I6HYDuSVSceahrwMDB7vmqOlyrGWoSC572zpZQhwUu0wPttUwPdoeHQe1rkv9eeSL9hQM7fVEdlvxbZ6MxXDnApH53dL9Fi2XskPF1Y4xraSaiqJ5I4qF1bZ%2FSQB4NPiBbP%2BU6ePgQ9jxd1JaQYRv4OfoDzNSaXxLulih63frZSn01gfis72g1MQ%2BFUJ7UaEGdxeHDfE15k%2FD1hPobZjRvJJI2Z1sYy0nhsPCRrWay%2BYgixPyTMvwBCpD%2BStFm0lg8usVvmyEVaD5Vx%2FB6BBoq%2BZ%2BMbmVx7X%2FzSSt5QfhaymkixCDfhjJSicGJ3vw7WB0bCZJl8W3EfgCOKcK76wlvCYzN1QBIbUiAQ%2FZjJfsPs8%2FVKaA40k2y0XIB%2FCpmNA4RZB4NmT9UyAidOsECvbDS%2BkLYec4eJRB37VJIh4dr73x96WJQnJ4j%2BTadz15At3GjNFvgbu9Mx%2BoNfSL3N8J24IqoCqPl6AWmO5Tcs%2Fw%2B2HDSyDpusz8UrZ7DWZrxaIw74%2BZywY6pgEdNad%2FQ7ofx7ADaIgXUYvVU5xImJNIKQ5t82sOk9ZtjeZh8RakgC83UWh1Fbd%2FAYKvcO4hpQso4HAzemifIcOMd44CFnRgBbVzeJVOFbYF34HNMMAu3v%2BWe%2F%2BURh%2FBxhGcZYd5nyJeH%2Fe5dOEUGmLo3VorFfPLsU%2FG7kbJuvKGvzgkX%2B12swNyTZalQy1VidUQobn%2BNRTCr965grvjczGEQfkE2jjX&X-Amz-Signature=a102bb850fdc307e9cd770edbeafe2d3930ccf0a9e430efa8dba2a373acc647c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664N3UOLYM%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T133303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIHYh3zxh5DabvvXxM5MYipHbLK%2FnwxeWfT2Bk6i%2Fp87hAiBlm1bgFPqA84hrb%2FaFYyMxsSA%2BbMKWBCtDgvB1fGlHJir%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIMDI0SwQ5utIVAxVqwKtwD%2BNK4uZqeG7ZODCJZU6Ml3CPu2rzR0WOy1S3c2bHeqC9kzIhXrjTmE8xbiLV%2F2s6VRGxj6FjEhK5a6cNihqyk0ACC%2FsifenrtmdqDLMSayB1tzj9gwJxtlLfid19I6HYDuSVSceahrwMDB7vmqOlyrGWoSC572zpZQhwUu0wPttUwPdoeHQe1rkv9eeSL9hQM7fVEdlvxbZ6MxXDnApH53dL9Fi2XskPF1Y4xraSaiqJ5I4qF1bZ%2FSQB4NPiBbP%2BU6ePgQ9jxd1JaQYRv4OfoDzNSaXxLulih63frZSn01gfis72g1MQ%2BFUJ7UaEGdxeHDfE15k%2FD1hPobZjRvJJI2Z1sYy0nhsPCRrWay%2BYgixPyTMvwBCpD%2BStFm0lg8usVvmyEVaD5Vx%2FB6BBoq%2BZ%2BMbmVx7X%2FzSSt5QfhaymkixCDfhjJSicGJ3vw7WB0bCZJl8W3EfgCOKcK76wlvCYzN1QBIbUiAQ%2FZjJfsPs8%2FVKaA40k2y0XIB%2FCpmNA4RZB4NmT9UyAidOsECvbDS%2BkLYec4eJRB37VJIh4dr73x96WJQnJ4j%2BTadz15At3GjNFvgbu9Mx%2BoNfSL3N8J24IqoCqPl6AWmO5Tcs%2Fw%2B2HDSyDpusz8UrZ7DWZrxaIw74%2BZywY6pgEdNad%2FQ7ofx7ADaIgXUYvVU5xImJNIKQ5t82sOk9ZtjeZh8RakgC83UWh1Fbd%2FAYKvcO4hpQso4HAzemifIcOMd44CFnRgBbVzeJVOFbYF34HNMMAu3v%2BWe%2F%2BURh%2FBxhGcZYd5nyJeH%2Fe5dOEUGmLo3VorFfPLsU%2FG7kbJuvKGvzgkX%2B12swNyTZalQy1VidUQobn%2BNRTCr965grvjczGEQfkE2jjX&X-Amz-Signature=33a93506da1cd2063049818c9a5ca8268c181c586194e1f7287f94a717cfbcc7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SRL4DBO7%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T133305Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQCqYRzbuQru89MA2%2Frb4moF5TwMS6br98o1sl9prN8J6gIgUItxLH7BE0hGRnvM09sb8MlMU7DLQDtqQd1FVbZMOEMq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDEFdlb6pT%2F1NFKwuISrcA3%2BaY6VscxlfVU5tn%2FaQ472IHpiHAZMEmKKqYEFmwfxkOPwJWwynYp5%2FHk139ICbtdUlFyNB6W1OyiqGWAS728WWwB5P4k8Fw%2BsVCnTopstxZBbcHBmXDEwRnwSvH05e8ohrYzF%2FoA%2BH7C025HNeolOwAMr%2FD5fw7UrgQqlCwSWnsnTdykMOUbgA7GISK9IQ%2BuBbNKxXUIpHVvyiNMcgTCyqOBDHb8k4PGE%2FtCgYocQ7agGIZDycmpvhzUNxP9SimzznvhR%2BwBlbO%2BaZ695oIPfstmKoQDwo57j%2BIbAKrIG8qh8%2FU4c%2BBCB3Xe4wxTyy7bIoirdrEh6HYKeM3FhBmf3Ytyct99yKBFoA836eRbXNqOudBaHM394EapYlDqbxMEDwMpXXgNoylHHuXqzzM5YEXAopZGoYZiU7mphzwMEHWlobpIuqhg5E6DGCxfzKt33M7VVwHG2bVEoqemWp8xBhBqIAE7RjdzGad1d5ujBa3V37sJvx1NQc22gBYiZ142NBBw2ypwUa76I8Z1PmW6AVkSScS89KZjgFc4NblS6fy8k0ZPGh0WtUUhcA8%2BG26JDS%2BdEA%2BKn6fqqmXRvhMeWROCNBDfxTH1zsUQ3TFU6fUfXlbeWsyq2ENUfOMIKPmcsGOqUBQpMw4%2FXgm0ckrufmXHqztaXQhAAHKRLSbFIYzpCPafI2MCpmt3Gey%2FqLgZ78%2BmSNFBOS5dsXlWvCLpJ3fBDsdcOUByLmVsIuJ8cdK%2FUZUM5u9Y572XWIQQwpVnHo0IXe5HTUU0Lu0UoNvbnnqWqwQQ0a%2BL8%2F%2BAbqzzjq2adfOq40Ob2ahXA%2B9BgjVEHjc37U8tMezO0obkNoIrr6c5fqMrPoHaX8&X-Amz-Signature=78c56e66cce845618cdc8a848be5e03fc8c4b62849ce7f31b19e7760e488aa7a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662RQCKGSK%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T133305Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIBlD7UCejA%2BMnnOiJEfuVOI%2F7EDdfSczTEi5asj61rd3AiB4kAO9zaaL%2F4hVmp2HSrAs1La7pvsU8e1b%2FCXCPGobFSr%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIME7U%2BIarklpFeYuaAKtwDNQ0%2FO2QQjC%2Frnl2Jd6eLyzEGV%2BQVtE0vCXo9dpxocU4Da3iGHzYkyP5Nwj%2Bxlp%2FtxNlclfPo6CDi0rHgpwplwFbxA2oT3Nb8VYK%2B072ig4aBtva77HScz%2FSBthG1srW2xg85hGYEP5WhWXcRkh%2BJiG%2BcRa3lzci0fXBLXLCvIhLuOJsLYZcK7J7dwC3VQ5IGlGdml429%2BfqaC4LIBFgaUuXM5A%2BsOTGCV66yYy6AotgDRMEpDHoYCklYys5bcKFPQTv1rcutNiDuWd5GEbQdDDXm5LMETbGgZDEnRaBFTRjICQwNb7Yiwlut5Oy2F6s4%2FYbtGCESfbxLC2Cx9lrGdCFPzzjY5gqXjmLPwi9F6TEB9s7oMpYbdxvT8IMfmWVzIaPbyIznPQp7Zd3HEhU%2BPguHpdxlKnJH2zEXVDv%2FYIvWn2pQw62ZRw4FTT2jxSEMFR%2FwZmYBA4G4c5zJTn9u%2ByFEbCYTnNNHaJq6y01KlE98NnUHII5yUxGK3ES4aNjOf60rZpZemZa278%2BPbBcOutubUdlPoSHDP%2FeGtWZy6UwGJtJdinhp6vKOGQj7Xmkh9%2BEMnTiQJX9s%2FpCoVt3Up08jU39rS0skaati3E5pEvWUzQiozOAxD1MwSkow4o%2BZywY6pgHRgoKcccDmlejFfOyp1pFf%2B%2BBpYqNBLF3bm3QzqdZB1oLXg0n2h%2FOFDIP9grOJJ8IYqLzBwTZYxAdsKxvmMCXiPfGUUEl9HpJniqHlUO4kl9aS8Tl%2FodB6IBNiHgQbu7w6mFBDdghhin1r0TM0rj9ZYMaYxohurDU0aQef%2BSU7wDm3Era4N%2BCaT2AISsiPY0aD%2BfdxhWChB%2BfU0Y65KZD0LjLIdNWB&X-Amz-Signature=a9fa8d922c4106da7f6ef3077d7f0b4951e1f21e4d17f141bea0a568ebc8d918&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RS7CVZNC%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T133306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQCFX3TSGgyg4k4rUx2pZjj%2B0fdt9aa7MUqO7rN00536kAIgIoR7VAXL9Ng9reVpMA7iupRlRSeSiAlVgvP3exMQXAUq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDMxrD0lOJO2f1oqeTircA3R8v4h1XppgFefuGssZu5k7usoWATBL8KSfX%2BI2I0pnH59cEvSLIAFbt97R6w9ibBHnSuXF5T5FQydinbcsz5GnevKw3u0XSNifh2dhQJMYM8kZ54DQgGvNUMJ%2F%2B1JVwbLwCwbmc4uaHaw7WGlccx%2F3A1oqqRRGEFWsx%2FHCf3H7aP2f1IxwKbEn%2BraUMuK4yt2crRquEm8OJhwXb6lyoN0I1SYNy5Lseorm%2Bp0jCuz%2FGrUz%2F3X2oILHOkP5ZPAoOQtG2johZMDjbKN1ooGorCPBqJsAm2Ze4pXehXSs3WJazPeATLUkZ%2FbxK8e%2F0bYznoyDo19RNUf4G99LDvNfM1fxDuqo7aLK33Nfb6bSvbh%2Bv9DWitjvvDlb8eyPQor6aJKbDc0P4V1VBOAcgB6c1T7MxNxa0Os0oO4OnUiGG5DBqt3aKwoReUlfGQxRL2Mjvm5Vl2w%2BQGBN1RJYGZb29uUk2lPyglcO3RZlB6%2BERLVj%2BrU8VnpXj9HvXOIfg7%2B%2BW3MWF4r3d3nS%2B2EcCJ4pgtn%2B5QTLCDpSjGMJ1VUK34n6EfVWwAAjbsj07vVKT3xHRA8FE%2BxqfKMNbvtGOIAyZbgtfg%2B%2FkZn%2BQyj76G2y5lbVKLrMrIM2VkVBGtsaMMSPmcsGOqUBtoz4XCy0rj1KiwUso92PM8t%2FzuvOFfmEpK07i69BP1F3DZi2QXjZQvHkrT92xIb6Qgm1H8l0LvvBPDwL1i68Vq0VCX2107%2BivIFdwC0RT9MDuDPhw5bckkRi4AHdjsAs9LQpa4hoaBCGMvwtDbWn4HNSkoG5SMNwtryzPmCQaZazjLkqs6Q%2B1HTLQksr98KHyCKRtAFUHTxoOpPMRPRK6pp3bsk2&X-Amz-Signature=e02ea0fc2cc9a84210a3f58d291b54a749816a490de00997094a819893226cc2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FRMUPW7%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T133308Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIHhdQINnLfQrfqMHBquMsc1084LDevUHyqpXsnCUVlgkAiEA1A3hFvKFQIAQNZ4EXlJWjgFioKhtmP%2F20TQuIMk4tY8q%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDOkWD7eZlZrkRw5A0ircA3qfCab0lq9gBZ%2FkLRMynDW8IBskYnm6MGwOdXL0xB2Opw9gaUbW6yqHx7q7RgHcc6DfUFZauOS8BU%2BPi2aakP1AU48HeKAE4%2FU%2FKnH54WBsLFgPpE9QEzo2QoK2C93iAjRojqlNBtcgHAzXvRchIbGF3v2kuTuvlBMrDx5dUf4t1ZSxuI5MQ7crklDn5IvUwJ1wbXm2ZxtQiRxwi1jUNoIxt2eWJ0b0SAurVYOr3mVGkMax8aZx1V55jQS0oXDh4HkY%2FXWDehXB0RE70w8jD9mmv6PqveNCe%2Bn%2F84C2c1taljkDGBbjDv%2BNicvFJoJseABH0os0HhjECOwfkTIXxszKZiWwjLa%2F061eUrGVMgFez5h7I%2FNqzYLTo6xxjpYRw21dsUeCgmaAQd7%2FAWbYDZncpIrz1zOfeaa%2FEcRwS%2FphTvSboEPoiNQPQJBl3VBRaRzPMMPEGq0FK5%2BEnxsH10w2JtNYmN9pTl5%2FBP9UrDfettC4pjWzMOuPsjPncXqnKWyouNkl5MCRwxz7f4KFxOtZdRAjUufJcJkVlttW9Yl60RM9Cv8GbGKzNCCHfShyldJ3JLRsCGuP2mnfnkF5i0dNqrr6WuHzq7%2Fhtx%2FuZSQE48SlgfaUuz0GczKZMMKPmcsGOqUByd5IvG6suMNuKh8n20cvftP1l0QdIpcYhdmEcwvZPDNfFxbZVIrwp27d0c%2FjkO3d%2BaLS43m%2FJKZrPIlPBlGUTGIx3z41PbjEBf87lxt%2FXLSV4423leWiibS4Y4B5qSmTOBOIN9fRxf8dc1iclm%2FCY4X2mvMwbyzI2LM7ExZWed%2FW8hBjG1I5y%2Fs0KNBmucQOVYzZ6cRf4WqwxIA%2B%2FP2GRIjKtEWq&X-Amz-Signature=0d8b7d456b46e64eb08865a2c8fd617bea4c297cc279c095650b6392a178e414&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FRMUPW7%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T133308Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIHhdQINnLfQrfqMHBquMsc1084LDevUHyqpXsnCUVlgkAiEA1A3hFvKFQIAQNZ4EXlJWjgFioKhtmP%2F20TQuIMk4tY8q%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDOkWD7eZlZrkRw5A0ircA3qfCab0lq9gBZ%2FkLRMynDW8IBskYnm6MGwOdXL0xB2Opw9gaUbW6yqHx7q7RgHcc6DfUFZauOS8BU%2BPi2aakP1AU48HeKAE4%2FU%2FKnH54WBsLFgPpE9QEzo2QoK2C93iAjRojqlNBtcgHAzXvRchIbGF3v2kuTuvlBMrDx5dUf4t1ZSxuI5MQ7crklDn5IvUwJ1wbXm2ZxtQiRxwi1jUNoIxt2eWJ0b0SAurVYOr3mVGkMax8aZx1V55jQS0oXDh4HkY%2FXWDehXB0RE70w8jD9mmv6PqveNCe%2Bn%2F84C2c1taljkDGBbjDv%2BNicvFJoJseABH0os0HhjECOwfkTIXxszKZiWwjLa%2F061eUrGVMgFez5h7I%2FNqzYLTo6xxjpYRw21dsUeCgmaAQd7%2FAWbYDZncpIrz1zOfeaa%2FEcRwS%2FphTvSboEPoiNQPQJBl3VBRaRzPMMPEGq0FK5%2BEnxsH10w2JtNYmN9pTl5%2FBP9UrDfettC4pjWzMOuPsjPncXqnKWyouNkl5MCRwxz7f4KFxOtZdRAjUufJcJkVlttW9Yl60RM9Cv8GbGKzNCCHfShyldJ3JLRsCGuP2mnfnkF5i0dNqrr6WuHzq7%2Fhtx%2FuZSQE48SlgfaUuz0GczKZMMKPmcsGOqUByd5IvG6suMNuKh8n20cvftP1l0QdIpcYhdmEcwvZPDNfFxbZVIrwp27d0c%2FjkO3d%2BaLS43m%2FJKZrPIlPBlGUTGIx3z41PbjEBf87lxt%2FXLSV4423leWiibS4Y4B5qSmTOBOIN9fRxf8dc1iclm%2FCY4X2mvMwbyzI2LM7ExZWed%2FW8hBjG1I5y%2Fs0KNBmucQOVYzZ6cRf4WqwxIA%2B%2FP2GRIjKtEWq&X-Amz-Signature=1f202a4e16d312f282a8d64a606866a251a9edcb51a2220cfdde96128d7458c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TXCECKMX%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T133251Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIGv2hFtR0CCORYE1Niw%2FQ1PMxXcDZPAFbYe%2FP8yWIRdGAiEAqOhaE0Ws%2FYNbCUI%2B6JW5x02IZ6ACnZ6sdbdGO5Z9yYoq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDNwj2YzBe1RndK%2BhWircA2tlLpXYWZnsp0S1I%2BfGqcBF0ZUnsZlgVHLSUoVjulcFCKvpAZiUGO7G1mihKxVTDNMcdVI7AYSOrLAV587VvvMnNmfO4WoTcSqzFX3bUbEzz%2BnQU%2FxkRfCP96aG6g8rhqmbhEYD%2F5ldkbnF%2F15sJqkcSvbqcRD5xG0%2BuLUa%2F%2BCNe7OroM7jFryVegfIgqMlZhbriQ%2FZEoQkcefzLuskkMOvwErNX0gmtOXODH3QJzrvNaXp29XTV%2Bx1IrY1d6iGwRj9xb391iRxxtwhVKRTecTjVHRT93Utwp35k2RqIJevfa4ULzOgeDYU5RwF%2BZKJjpAHcQ5S2R5TpWwT%2Bu1M8RaOVyp%2FzMFp8ZCTUHic29UTE0ne%2BfJwIZOUqUVFtLDRGmFXbCPDfICRV5ybjfahKyjQLIceWqZvVDBx%2BLT0ctxNWmzt3R45cBR5C%2F5qj9MW7PYp%2FLFa05ksNX9xMNqvUrPKrYxbEwLfVQBTTYrS8Dan67rVco6fQliJcTI1SvNxbbkyJx0PjD2aY4648MzcuN889PAOH4NZcbY11rYUqjlqdqFEC3vutoOLAf3WYDjNAT%2BEjlO%2BYQ2sj%2BejfzLhuf56VpIhBQHfroP95ijdid7r2rCM38%2BHB6BghAsGMIaPmcsGOqUBsCJcboCuPCqVqsWVr2%2BIaw2%2BYHGCWVZ3XfZ11FynMrp2kZSlGD4aRzJgr5cTl2U9cOoGZF1Q0scZbgY1fLzTFsRmYJ7k8nkr6UBo%2FRipM7jozakDDV9GRbaDwdMfXiZSUDLhQG6wn%2F7I6BPxhJmF5dHGAqICRGQJvzoB1aJdNyYpnyBecNaPzEmCIiZDDhnj6UvpqeoNtu8nY0lGarXi0gfQO9X6&X-Amz-Signature=f19b51514cf7d5e5ce4e67551c739ba6894238edf551f674a4a9ee5200370d8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZMNSZET%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T133309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQDqVIhlw3YLXFB2tISemGc1Kngsah2AdtgBJyQfMWg3VQIhAPemYa%2BZmxcHrgGAtoX%2BR0EMu1xh9StYcHl6PNotG9iAKv8DCAcQABoMNjM3NDIzMTgzODA1IgyBbBK4EL9kZx%2BQJ5oq3AOnWRbaOsNHp1ojUBdarfY9L1wWNxg%2BO4ZOdssi910EAANxSxqkMTe8PyrKh4si0DdKdfbssjPVPwqTCSB131iPM%2Bw4V98uhFKOk2bw4LkDherTf442PG2td7h2CDStpbQkitvQFkBWcwKL9Itm2LZhlrPIc96ATv3BzlyP7AsKSp0zlhXZwV8lnx8zdXH7aqB6GqbJI%2B%2FJ8SEYUP76dC%2FZlFXO4meG%2FAy3hsvvPbXxuXf%2Fgw%2BXON48ncowEhzEdzlDzEHDRSPSzn6AGQwY%2FsYO%2FUpCUho11fiFSvV9XqAOtJzsxNKR1ZRfJsimSFGt2JXMkQVtVJbtb3Fu0QRV%2Bm%2F52w4l3ChYX9vYuJ2gGCr5l7spQW84p2VJRIAtKfX8o%2BjrkXzckqNCXKyZjJ8IlLqW3bSis7RYi9dV3Ci9d87QpxADO8MSocfOg8shlGt4HO9SWm06UoxWXbA%2F3sMQxUKcgSnZJW5TI%2BIMyZdNdh43AUezCO%2FmXCF%2FbeN7y6Oq%2FCtoyM9AuPVCxJwgMrBFDdIZ7SXns%2Ft7%2BbVdu716G%2BCzOn7n6akPGkmdIvxgZMGvqWtBGfRTkptg485KRQiziTfnmYEZdPFM8XJZuzJe0y2nc7Xj%2FXc4Se%2BIO89QFzCij5nLBjqkAa%2Bxn6%2FG%2Bw1wScDdrfBtacfpOGMOTCXz9WZp7KCnKdGpiMUdmvVTh97TYQb33x%2BHAcLBKYjsI6mCSIdmv1g%2FlPmg5CJflAt8%2Fe8Hg2QBuzXxV72tDCuhZGfjXAToqfV2XgUZs%2F74rYk1h8fAMQ%2Bqgwp4kyDEIC0l7hYBFhNsTqn%2FQTAMFmW7pO2aXiX5vOtBkRYJg3XhDc6%2FcDwdFXYPW8imKim6&X-Amz-Signature=c912e7abe365a3a8ba5b88fe14f81674a46336bad976367f4d91a841e2a7dd2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZMNSZET%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T133309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQDqVIhlw3YLXFB2tISemGc1Kngsah2AdtgBJyQfMWg3VQIhAPemYa%2BZmxcHrgGAtoX%2BR0EMu1xh9StYcHl6PNotG9iAKv8DCAcQABoMNjM3NDIzMTgzODA1IgyBbBK4EL9kZx%2BQJ5oq3AOnWRbaOsNHp1ojUBdarfY9L1wWNxg%2BO4ZOdssi910EAANxSxqkMTe8PyrKh4si0DdKdfbssjPVPwqTCSB131iPM%2Bw4V98uhFKOk2bw4LkDherTf442PG2td7h2CDStpbQkitvQFkBWcwKL9Itm2LZhlrPIc96ATv3BzlyP7AsKSp0zlhXZwV8lnx8zdXH7aqB6GqbJI%2B%2FJ8SEYUP76dC%2FZlFXO4meG%2FAy3hsvvPbXxuXf%2Fgw%2BXON48ncowEhzEdzlDzEHDRSPSzn6AGQwY%2FsYO%2FUpCUho11fiFSvV9XqAOtJzsxNKR1ZRfJsimSFGt2JXMkQVtVJbtb3Fu0QRV%2Bm%2F52w4l3ChYX9vYuJ2gGCr5l7spQW84p2VJRIAtKfX8o%2BjrkXzckqNCXKyZjJ8IlLqW3bSis7RYi9dV3Ci9d87QpxADO8MSocfOg8shlGt4HO9SWm06UoxWXbA%2F3sMQxUKcgSnZJW5TI%2BIMyZdNdh43AUezCO%2FmXCF%2FbeN7y6Oq%2FCtoyM9AuPVCxJwgMrBFDdIZ7SXns%2Ft7%2BbVdu716G%2BCzOn7n6akPGkmdIvxgZMGvqWtBGfRTkptg485KRQiziTfnmYEZdPFM8XJZuzJe0y2nc7Xj%2FXc4Se%2BIO89QFzCij5nLBjqkAa%2Bxn6%2FG%2Bw1wScDdrfBtacfpOGMOTCXz9WZp7KCnKdGpiMUdmvVTh97TYQb33x%2BHAcLBKYjsI6mCSIdmv1g%2FlPmg5CJflAt8%2Fe8Hg2QBuzXxV72tDCuhZGfjXAToqfV2XgUZs%2F74rYk1h8fAMQ%2Bqgwp4kyDEIC0l7hYBFhNsTqn%2FQTAMFmW7pO2aXiX5vOtBkRYJg3XhDc6%2FcDwdFXYPW8imKim6&X-Amz-Signature=c912e7abe365a3a8ba5b88fe14f81674a46336bad976367f4d91a841e2a7dd2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNYE42GQ%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T133309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIGY7k8R75vVcHIv%2Bmk0wZBDiOrfz%2FwJjCXohaDI2BO%2BwAiAc5MzjS83GjVPHtp97dNc068EhRimdU5CBE2JNbodI%2BSr%2FAwgGEAAaDDYzNzQyMzE4MzgwNSIMzfR%2BpBKVU%2FPBVCG9KtwDu69AHEjTzkgKwibBP%2BDe8nRZNXQQUlIyOxrmw%2BAjuaL7%2FlZuZF1ecobzm3X2rH2LNdBvaummJo4KBwb%2FNiy1BcmVmwXFYmEBTDCQLaQSSVmzKwMio4BtPQIOz7agMYWA%2B7WoeNiLhOhNrPnhu0VKqbG2CwHzIX0ScX%2ByC0cYHVVysmg9EL%2FngNGwSrQbf1TYF9OiNTvPEfwGmMmJaOMGW8WD8rRMQls2QHlpZHAeE4BuIxaJyQr%2BPtt75opkGWL7tlGrD9roMEjby2wyz4mqFBPEIAlMQKFBOkdLMqE2Xe%2BDTeGhT%2BKq0l1FItoPRHCJhTPBvoVXs0nd71eySHx4MYKO22CeQ8jYn%2FeaCKknOpNZWH37b%2BX8Ho7bsd9wrBvgH9TDPs35Y0RFduuccOIZTuZRl5TSStrGByCHyWU1VQc0%2FQw2sxI%2BG22%2BLIFtrVctxxc%2FyoYEbMGl97qwgLzCfpy%2BdTqMKt34DObQxeZ0P92px4LGdzJAk1yXGi6ZIDaFADP3P8goivJHCU2qY0q866IP78658%2BU5mEGS4ciJLIj4aryYiancaVUHzz%2Brj8iUbP0elNNk4QkqWAsFL64ADUuoieCz8kH1nmVmRK9PGvqvP40Km9Jt9dubzMkw74%2BZywY6pgF%2FXmXbkIKWVNUiieHFIdVhr9B7IkWKOvRgVv%2FwdFiwU7H10%2BjZmdLgo1ah3ZQghSV1oItsGaPci%2B%2FM7h%2F9D1U4ISLNsgFd4MgGFBMrUlR5jhDnRD6nRW8mkm%2BZ8gUcHeDDnKf6mfD229XBfu4Qkm8K3e%2FAE9VHvn9bARtitvgP65hpzXngRwXzjmCNTlRR2Q%2FSgmsQKP6JSuisl7tTkAfXC8aqPPto&X-Amz-Signature=e3825008ff2aedc719350fada9ec79482194fb3c3594bf1d79d0ca7b3294275b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

