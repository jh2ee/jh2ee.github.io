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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BWRKXMS%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T081702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQCkog2CYyA5U1nOWkMgyH04G8xlFlpq4pux5RwPPFkfXQIgIqLuozd%2F2iGEiZTCYwZEHOBLp4%2F1%2BHSrCSfYLZajUiIq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDB5n%2Fmf9j%2BBPcskRMCrcA1rsZKZOZb10lKGDaNpKrxshZqZ%2FY0iKxNw9yp4PfWx1KMd7fJ7xqxyCVTpI47uZf%2FspDdtpiixDtVbEmFxc69D9qW2M5YtiVP7B00Y5Lf4aL0oSDoiyiBipXSven8ksR%2Fz6%2BcCZjhUy9ruur7OMwLfwbCl0vNb1lewsJDWlsNrvqYQ%2BUh9OUtXBUw7eA1RrLjpJ33RGivMjq9T3JHxwjwSwctPJ6TbnJgWIT%2FBvbQ0LvY3lIRt9Xpo%2BuGMYSxJ1GFAxiv9RDfQqnivOSbwjdU3loqBUXOj%2FuiupkLnsw8jOKAxVgK%2BNJweJfaVoGp8tyXwNjD7cKuLTyAd6fBSMN60ogYpEccP6um06RSl5nX4%2Bxdf%2BPjvIjcc%2Bt6cK18iapd27VfpEyvhMSqPLSsZXxyAqaSv71oZ7wGrdPtTiuPHJFwczsFwQnK%2FJR5iodVJ3eTD6HM2y5n87LNJiXqkg0PXokoprrLj2wNfEJByRHABzEw1YDXaKvR1OEYJvhjTG9%2FgZjAo%2F7wokNuRWKLRpEKcPUAkaVXPKvJ%2FFA3XrLPN8p8vtb4qt3P7B6e2hw1VdSDZv0sOuiXGm%2BeomyxzhGNBYfVkaQxUxrNhfLm4VRg3qT2KaLqH%2FH3oU6iFaMKfyxcwGOqUBdAgk4GtOFNuuklC7%2FvzhZ6Jd7G%2BQzF8rcD6ISY0EleTwy0C%2BqrbvNCisNeHGQrlm3Omlo%2BFVlgIgdH%2BpmedbAEWanXFHRqdDuvmng55wtKs2CVk2V96cYn0RChuDOcsahhtdghT8dVK%2Bkx8MeO7qDSPPP8giZ5fVt9szdN0iWMKruK6N6JMbZoJSH1ttO5k6UqosCKRREwayR5HlbMLa0LD437ZF&X-Amz-Signature=41c769579d63ab9dde151548bda89cb22175fe764655c6852c8db449a76bd845&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BWRKXMS%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T081702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQCkog2CYyA5U1nOWkMgyH04G8xlFlpq4pux5RwPPFkfXQIgIqLuozd%2F2iGEiZTCYwZEHOBLp4%2F1%2BHSrCSfYLZajUiIq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDB5n%2Fmf9j%2BBPcskRMCrcA1rsZKZOZb10lKGDaNpKrxshZqZ%2FY0iKxNw9yp4PfWx1KMd7fJ7xqxyCVTpI47uZf%2FspDdtpiixDtVbEmFxc69D9qW2M5YtiVP7B00Y5Lf4aL0oSDoiyiBipXSven8ksR%2Fz6%2BcCZjhUy9ruur7OMwLfwbCl0vNb1lewsJDWlsNrvqYQ%2BUh9OUtXBUw7eA1RrLjpJ33RGivMjq9T3JHxwjwSwctPJ6TbnJgWIT%2FBvbQ0LvY3lIRt9Xpo%2BuGMYSxJ1GFAxiv9RDfQqnivOSbwjdU3loqBUXOj%2FuiupkLnsw8jOKAxVgK%2BNJweJfaVoGp8tyXwNjD7cKuLTyAd6fBSMN60ogYpEccP6um06RSl5nX4%2Bxdf%2BPjvIjcc%2Bt6cK18iapd27VfpEyvhMSqPLSsZXxyAqaSv71oZ7wGrdPtTiuPHJFwczsFwQnK%2FJR5iodVJ3eTD6HM2y5n87LNJiXqkg0PXokoprrLj2wNfEJByRHABzEw1YDXaKvR1OEYJvhjTG9%2FgZjAo%2F7wokNuRWKLRpEKcPUAkaVXPKvJ%2FFA3XrLPN8p8vtb4qt3P7B6e2hw1VdSDZv0sOuiXGm%2BeomyxzhGNBYfVkaQxUxrNhfLm4VRg3qT2KaLqH%2FH3oU6iFaMKfyxcwGOqUBdAgk4GtOFNuuklC7%2FvzhZ6Jd7G%2BQzF8rcD6ISY0EleTwy0C%2BqrbvNCisNeHGQrlm3Omlo%2BFVlgIgdH%2BpmedbAEWanXFHRqdDuvmng55wtKs2CVk2V96cYn0RChuDOcsahhtdghT8dVK%2Bkx8MeO7qDSPPP8giZ5fVt9szdN0iWMKruK6N6JMbZoJSH1ttO5k6UqosCKRREwayR5HlbMLa0LD437ZF&X-Amz-Signature=41c769579d63ab9dde151548bda89cb22175fe764655c6852c8db449a76bd845&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQWRLRSW%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T081702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIEt9H%2FayN6UIzoEG%2BlIWLhES9wkWnykrpYI1gdkdAIMBAiEA4u7mi62BXuaf%2FVd7wnBgHjwrp4%2FWTatra4%2F8czi8wZUq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDB%2FJERHVUEOXVeoaoSrcAzouny3vdB5Kc5VJ0j%2Fo7dj12HbX1JxRUye9RAYxPYPlSekYHnfQgUEsDNxB37cJmIwxzGLnb%2BughmhrP9Qoth9ub2LJkAiejFF2MjnB1ouCsY%2FT3wQDnid8SOrjUyMMUVfWTtyH0cBkynT7FspDyk8emWim7f20ANkEZ%2FDalt8gk99h4rARbjTnzAR%2FJHNN3cQxWy6GwtPsfawVh9hbhckfqRiq7Oubtt7CIsGHvd%2BEFf3wiDAhDcP1150bnIDf6XZXNeuDwYprdpYKoWaLqGsxDWG2uyV9I%2BR0jr93mUtfSokiNH1RlWvrenQms9LEhR5SrSPB6eqCLRxGfYTrkpK0kdQ8qTtr%2B%2BTiEA8%2FRduKtrqMemyWryJLSaCgRiAioMOpO76wKO9Uh6N3owXOLG30AHpwOzDN6YRZ3qwM4F2%2BIu%2BXhvGeMch0LJZaFNI54kcBNWfHkU1XZhvtXUO3q2naUSfY6znHVJw4r7H%2FX4DdfeDeiCEtAZtqFvPCzKAnNOe0%2B7JINGbXqQ88PEgYJUBvgQdIlGM9sDa3TW1K6rK%2F6sp%2B3iD9aoQvF2ZzZP2FcGDDvQ4Vvk0lq3ibYCMyvGWlDFthNZLglcDLAx6S7%2BSLcnf4f9OGC0fzPaqSMODxxcwGOqUBK3KKrLjM7kXXzNUUbZJb3osHlcI%2BxykjaxFaY3mhaisGbydlfGGHCa%2B99ILTw3O6jEpLqqBEb%2FvMUfvT4dMllQ83ixwouAYnIOnRXW5buBwUhueYiPPzxxBf6A3khDXynda4t%2BHP0jjs3KJQPJ%2FNg%2F2o9nz0zFJ%2FQtz8Us0RBv7HS%2BWq4WXIj53ZN3Q8lQ7YmJ%2BfHts3j7jsSDwLX31F%2FQZOG3%2B%2F&X-Amz-Signature=8d2b1a7c99c04559a90cde65e9fb45c988026cbf543a86b2d3f9d17b20b9656b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7YFEIMU%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T081705Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIBNPNWeG8KSUutR1O0nMn6yPMABitsJB6CtRQqFSfDEfAiEA%2Fj489GmGKB7lbVljJZ2S9gAtG8gaMDZuYqZH4vaOOQoq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDMoKWZHD5CRpKjs4ryrcAybzEOQhN1DdoQzoLFsqAxrmnquFrFhrpQW3R6cBn5xO4s%2FUoNKoSn6xObLrznBlmYLt6lVma1GfUzG5dF9QvppdSImvrpuoBfl7hMtUt7ZOHPBhvHM9s2EB1fCoHMbDy8cXXxxT%2FUD9lLaAJDULq0KjV8m92qFuGJKFYnxZ999rZUfRFR5USYu8plj%2BRu1MP281ERC5UQUf8RY1gJEfwwB7hUmMnHfu5SOvSuTE7zInHW25k8taV7h4ghYihlQGz5l4IphRBYtuoUPAnR6jEVJBSxMGSLVLGWJ8lRvj5haUlM%2F72gtRmOeELH77fS3Dj5PxtrQ1oJUToK9IEyflLC5LOfo7OK3T1qpCIRYwrog9hRG6xh%2B8w9TF11Y2NWemG3cpJ0XatKPirz7jvnrHBotBV0aR%2BoIXgv0jM0LOlSlNEcbXF9%2FvOKtDZfwWMxSrXuL46IpzThR9UqCaM4nkW7evwtdRrjc2InNWudxs4XVtn6%2FwRRbybHcWfTceg1u77AARmehijWJuyYvE0EXoW0bqEYCfzMaeicohrA3H5qk20fcxLNQJSrSFnoyQjkTyTVpsVqypHuhRHTAu5kqm9rX8%2F8sDpRZIpyyiFqUp0djiiz5qAX9fD%2BTEuNVtMLfyxcwGOqUB2oEcH59HN7kRGr6A61Hzihs7kTwWd9PmP4%2Fu847gltU2LzPVfjmpXmo0uuz4MigaX6YqjOFaLgejMtYIjii8m6%2FCXvcdVNIpjfx0GtF6LghLqzoxMh5Ha0VQ1VXUB19NwZarpf7dwh%2B%2BVTqDyWGjjGKzbyUZEksKgwcvRh53CcFSvQ9SbMj3NgIYESxPSKg8qMFIL51sReh2mAGWt38GH2Mu8paz&X-Amz-Signature=7031b0b328da3df3a9efe261ea0c6abcf498860b571cb5ab3837a8089bec7f39&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7YFEIMU%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T081705Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIBNPNWeG8KSUutR1O0nMn6yPMABitsJB6CtRQqFSfDEfAiEA%2Fj489GmGKB7lbVljJZ2S9gAtG8gaMDZuYqZH4vaOOQoq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDMoKWZHD5CRpKjs4ryrcAybzEOQhN1DdoQzoLFsqAxrmnquFrFhrpQW3R6cBn5xO4s%2FUoNKoSn6xObLrznBlmYLt6lVma1GfUzG5dF9QvppdSImvrpuoBfl7hMtUt7ZOHPBhvHM9s2EB1fCoHMbDy8cXXxxT%2FUD9lLaAJDULq0KjV8m92qFuGJKFYnxZ999rZUfRFR5USYu8plj%2BRu1MP281ERC5UQUf8RY1gJEfwwB7hUmMnHfu5SOvSuTE7zInHW25k8taV7h4ghYihlQGz5l4IphRBYtuoUPAnR6jEVJBSxMGSLVLGWJ8lRvj5haUlM%2F72gtRmOeELH77fS3Dj5PxtrQ1oJUToK9IEyflLC5LOfo7OK3T1qpCIRYwrog9hRG6xh%2B8w9TF11Y2NWemG3cpJ0XatKPirz7jvnrHBotBV0aR%2BoIXgv0jM0LOlSlNEcbXF9%2FvOKtDZfwWMxSrXuL46IpzThR9UqCaM4nkW7evwtdRrjc2InNWudxs4XVtn6%2FwRRbybHcWfTceg1u77AARmehijWJuyYvE0EXoW0bqEYCfzMaeicohrA3H5qk20fcxLNQJSrSFnoyQjkTyTVpsVqypHuhRHTAu5kqm9rX8%2F8sDpRZIpyyiFqUp0djiiz5qAX9fD%2BTEuNVtMLfyxcwGOqUB2oEcH59HN7kRGr6A61Hzihs7kTwWd9PmP4%2Fu847gltU2LzPVfjmpXmo0uuz4MigaX6YqjOFaLgejMtYIjii8m6%2FCXvcdVNIpjfx0GtF6LghLqzoxMh5Ha0VQ1VXUB19NwZarpf7dwh%2B%2BVTqDyWGjjGKzbyUZEksKgwcvRh53CcFSvQ9SbMj3NgIYESxPSKg8qMFIL51sReh2mAGWt38GH2Mu8paz&X-Amz-Signature=cb8076b6b7a75bbc2ebd661b226d34c36a07c0e7f3ab6339d602506fd939ed67&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TDXWA6IY%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T081705Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQDm4HtccWrLAKGxRBEH8nrJtWJzKHgx1fMOWyS2%2Fy8foQIhAMQsqFJl4vcARVHIub55KmlKcKYOWZ1HHpOqUQf9RUBEKv8DCBkQABoMNjM3NDIzMTgzODA1IgzOcBs2Oi5y%2Fyp67jUq3APumgyL9hWRjRxC%2Fey775%2FsN52Olz5RZyKxcsnO%2FHq41T4%2BxT15BJULUX0tinYSZTdoJ1gsAInvLrs2pj7jnsB6jElFCSNtMSvogE5CbFmtl2eORywZGARR7V%2FL30rp%2FpHeTv%2FwGjQYmnhaY3TbCBwR48u4OJXbuxQyLXFkSGAswMUlI%2FIDnhUjEXHIoBCMQzG4iUB8bY5W1cIaweTvRNTTdThYRsPFY1qLza3zcd0FYyYgtiq1kCaf8PnbIqoHNhbukaqdY%2FMBfj%2BEqcrFND0aPNj7esxvxjYsS2UglLyEGzLQ3diS7JSwMLOxicwKnnD%2BRt4Va%2FtbYGRtCGLjNTGAY%2FICYfoobhqW02A%2Fy0b7tbFsdhmFAyTCIz6YFNBAPHX2sPokqBqVqz3XFMzkEvg9Rto9l3gfmJuE3NWuVDaLAiJ1WiMgMnarS9JqMYJv1hq3QxR2KTYZ7gHVbukKPjnpCWPyFNeKUBpPZhQ%2FniG%2FNXaJ6cHBBcAUx71IAVYS%2BudifUeyYTYY%2F9IqtWlFqltlANvkIfohpTM4p4J3SgyfYngncMgorl0CnYYLztcEjubGA7j7QzK7Fs0VYAsfAyJbdT7qQEpb8q%2FrE1s9cSUosR51C0BGDmY4mAkTjDC58sXMBjqkAeOmLFreWoPTHfn5JiDuw8qQS0x731fLgXKDEgDkGYXY9JlITEfpVdvSHdjmSSypo1hQRzZzCaFlML%2Blk2acsQBseQM33FqpVK1prciwLXH00MlTphmmTeIkxPIB%2BY8FuyL9FZu1S7I1K9I0HRU%2FyFTlG%2Figi01Pnbiuzu%2Flo%2BvlEcdpZcuOygv%2FNwiFUZ%2FEYLRABQv%2FVbT5z%2FlV1ypqmr3z8dBM&X-Amz-Signature=11464736000a0f63a019e55d174be58c1b8b6c2bcf59abac8f9f4c1dd39f35c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PH6MAMZ%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T081705Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQCnYVHec7jpIY%2BURNGIO08Po%2FTorq7wg3ylJvMZin0zrQIhAKFXl17m8wHQMJFtuy8Cami17i8fm1ecEuAZ0t5NC9SOKv8DCBkQABoMNjM3NDIzMTgzODA1IgztIiVdehWBQ8xQv5Mq3AOtdY%2By0HotyTAAUw6X%2BpPzSETQey5MPffBWY2LBEHeZ%2BXxWlh6MLrGpcfjZc186W1qJdW8YqhM4VgOZLQia3ew5Dda%2BYsppHfBcs6HrUcAHz9aWEH8d2EKevxXjgeArTfra2bkiBnpXow8%2BGxRPzmUPiHKDZwcjGXDnxnGP7MGze7oFrp4NIruy5LCd9HurbCUbkbBuITNldxYad1seAIoM297app7iS30%2F%2FwirGXY7vhRvPbrsKuQj7HVKA8e91MWq51IBwuJoC7wm4AH3yE%2FU3jiL2kR3Xw5PdTMXD3Y%2FpHu%2Fgg9csdeSZPK6F8uehCLWNBrqGWjPcWQ1NaUUtSTZgv21bWlZPKTu5cH5cYNxxjOaV1IKHV0qNN%2F0gYcozt2XfcbXpq2p8g5i8im9l8rqdmIOmgULTcM5R8ZbE7VRw%2FZKYf%2FAwMRa7haAlkY6vtu2D0Scy3IedIH96UnxGmVXQIMHknQdVo3V2zPvLujg5WZjPS0Z0QY%2B2KkdA5NLVWYfunPnz2CAeu5t47Uubmrmm%2FchGWBWOmTOMDHoUmG3HVqGLN2Pk%2BF6s%2FpOyArHmqMa5Iw1Krpis7Cpg5pdGwkvaj7EXpDJUE8V5xe%2BgSd%2B9gY3hrAiwwViw8%2FqTCG8sXMBjqkASz07Y2GGzRGGJfZItLsumyyBhUTnmeNh3oFQu8ZPm2ZU7RKNpS8ER91KMut7%2BGj0hEAGK4PsC%2BHR7ZA1wcwYp88undcbQ5dev1JM78LD7h7ZMh5N5mRycKbMk5TPvfK92qIJJF4Nsov%2FK72sC7%2FemcfWpt6N3C6HhesXhifDNfbEjg8a9olz3yPG9RMDvDM0yvc9%2FazDybzrGWUJLEHdM1%2BGClu&X-Amz-Signature=500d0d5e63c67d8ee9389c499a6029740cb9508ba2622901d0a0d529c61b1cea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RGTH6MIR%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T081707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQCfY7Kt%2FBYXudbcA72qq1yPZilEevGVIqQJtLwFODIiiQIgO8labuewFxPD6TgPGvToUUKr58QRT627Faz31Dxgm5kq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDJMyQKtEk%2F7Ftpq8xircA588MjuCBDwaSRXymhs3nKNNnRSoCWYEn2iZuxp68%2FnKi2QfNxxw2Lo8rL6Dgo0PNklZooAqgG5EuYt%2BjUaog8pAt9BF5dXdo3ilhSp0qNH1ynVzsW9qsQpU63TiLwAqaTIFheqP%2FuxoqHdypWhsVYIV3OQSlskp3FB7JnlWqJ5ktamllhhjKLqcKKpvlLgeoJAhykrMNsGo0XkrrRzh9JREGuEGCfJ3d25hU%2B%2BlzQAeHd2VfiDOONQohMDS5TXXyOWPfcEGPOzHfNUZ0Cn5cH3Vcnqe%2BN40z0NZch%2BFKZNjEQaAm9jrIX2KooMdSBTkhmt8l6%2BQ2kpjZ4X1%2BJGwhm1NrjU7bjBGRT9X42RNV6DK%2Bo%2F7%2FxgySDWxK2CBcpF3N9LFNRdQWNbEfeeQNs%2FgM4PV3JsZGQVxek%2BidF5k1MRyRfx6OYtMM2hkU66xv%2FyOBrYEXsH%2BmWW0quVr5ojpxXZyi9M8BEJRjcnBx0c57clX5Za3tVIZalcZits2aFTbMrL4YkwpoOQL3106V0VTs0x%2F3PHw8Rh2M7xpbeVpSaeurtqwPfR8TmCl2PMwFhr2YUGTP11cd6iA3UmoJ%2F%2FM7bN8jg3qzb2p4EKO5QJ03cYuFcBZmdx0r11HrsuwMJvyxcwGOqUBljcpKSpRp7Em%2BsLbbH6hFDXMZBhT2n60Dj%2BSRxAG6EFVvyV82USGxVM8JQ7ogizRyM9Bn%2FndBbeOoXJnPN0LSBXjjkVhQHybyrS9WdaOlvQvt1iIr3KrvO4Z5SxgYpPlkTQkeK%2BU924JqHZfPde8Klhxkuwlc7N2R5MqkA%2FLXaBimB%2FnfuUqjgynkBxF%2BEqMe8LaJYPsgrQlfqEB3C9rRGbyd08X&X-Amz-Signature=4c719d8f3cb8a2ef37085cbc74fb7c978c6c6cabd3e69a8214e7c01ec6b201e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667B33MSY4%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T081709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQDLFifsKSGYtZV1nfXUO6KaLLz7zeYVAqL1ebd8yZW4UgIgI0vcxjJBnSH800aEoMEYxsv26wNjigzYwV4unTS8DQMq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDAary53rM0WynC1EcSrcA4TOzDVncEsAdb2pT14TeQ0ad55Xd1daA2vES1UmzjkUO6glYipCDLyawPpUcmRFDgmroxwa5ujv%2BDkOzYZaw2u0sDhZ%2BpfeF5fGWyok9lLjXowcAiyMWIYUeNLhbX4rmvqjVvtsJyOAuqajBkmhPw1PuxyzPy0YH5tdjkKycojdRc%2BeoKztcsi9YxG37nUBo8ze5ibRPl9JG1cfLslESM1zNyUA%2BcSvv4PqqGfLQrpj9tYfP%2BKkQaaKULzpUiw4norpAbcEY0Btu6Ud0RJvjYHvLbP8baU5i3lscB1ps%2FgskhW6Min2NB7IcV6qB0MxJnl9keLOYkjX%2FaxE2u0g24QZyqcc1BxJ5XXFVerBM3ITPK2X7e3wzsVtHfgGuWwHmrfCWxBA6f37zbT2wv7dBB4iEbhD903Jm7UPZ867%2B%2B10IFwA285iu9EPTjKF3md6rFoxgix64PVy51ijtOrJCXlHMpX%2BSSFFbWAIqSnahJa6Ftd25%2F3r5iBIoMPCzPW2cC07CuQN4YomK66xIO1OAF4TUUu%2BjAMrcUN9qPyBc5%2BrVL%2Bn%2B0Wh2SBwLleqaDOIK%2BEVUzhAx1F4y5v4gitG5IZ0wPIVm0rpBhqLQRgFx%2BGam8r6CsHIxng35QmyMLHyxcwGOqUBCwxNyDUDyRvgrUJHG%2BCdtGVIwmtNzHXYLs%2BMND4NaNDeAqSv5PpdKDPVEcFL4eS9cl8WjwnKMC%2BmDNYEKiYPIzOReiB331H3hlP3feLF0LaxeUZFek%2Bl4Kbd6nX9OW8GzXQIj7d3qs6XWjc4OHa8HbIbCeFB1DJvAIxRUnYKP0VgAXzCM02E3wRcxoOztaXGZVv1vbvloBFMFQW98MfrzquVnbiZ&X-Amz-Signature=9c802157f9e83bc7f42317f6719892b7f364147d2a628e032f6748c069b930c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667B33MSY4%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T081709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQDLFifsKSGYtZV1nfXUO6KaLLz7zeYVAqL1ebd8yZW4UgIgI0vcxjJBnSH800aEoMEYxsv26wNjigzYwV4unTS8DQMq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDAary53rM0WynC1EcSrcA4TOzDVncEsAdb2pT14TeQ0ad55Xd1daA2vES1UmzjkUO6glYipCDLyawPpUcmRFDgmroxwa5ujv%2BDkOzYZaw2u0sDhZ%2BpfeF5fGWyok9lLjXowcAiyMWIYUeNLhbX4rmvqjVvtsJyOAuqajBkmhPw1PuxyzPy0YH5tdjkKycojdRc%2BeoKztcsi9YxG37nUBo8ze5ibRPl9JG1cfLslESM1zNyUA%2BcSvv4PqqGfLQrpj9tYfP%2BKkQaaKULzpUiw4norpAbcEY0Btu6Ud0RJvjYHvLbP8baU5i3lscB1ps%2FgskhW6Min2NB7IcV6qB0MxJnl9keLOYkjX%2FaxE2u0g24QZyqcc1BxJ5XXFVerBM3ITPK2X7e3wzsVtHfgGuWwHmrfCWxBA6f37zbT2wv7dBB4iEbhD903Jm7UPZ867%2B%2B10IFwA285iu9EPTjKF3md6rFoxgix64PVy51ijtOrJCXlHMpX%2BSSFFbWAIqSnahJa6Ftd25%2F3r5iBIoMPCzPW2cC07CuQN4YomK66xIO1OAF4TUUu%2BjAMrcUN9qPyBc5%2BrVL%2Bn%2B0Wh2SBwLleqaDOIK%2BEVUzhAx1F4y5v4gitG5IZ0wPIVm0rpBhqLQRgFx%2BGam8r6CsHIxng35QmyMLHyxcwGOqUBCwxNyDUDyRvgrUJHG%2BCdtGVIwmtNzHXYLs%2BMND4NaNDeAqSv5PpdKDPVEcFL4eS9cl8WjwnKMC%2BmDNYEKiYPIzOReiB331H3hlP3feLF0LaxeUZFek%2Bl4Kbd6nX9OW8GzXQIj7d3qs6XWjc4OHa8HbIbCeFB1DJvAIxRUnYKP0VgAXzCM02E3wRcxoOztaXGZVv1vbvloBFMFQW98MfrzquVnbiZ&X-Amz-Signature=4acac1e72b8a79060bb0908348d423be4b2b497ce980f5e39fcd994131da1312&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GLPYGSZ%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T081659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIFui1VLue5kRXvLeZplnqWxj3KcanpjUaacM3HEpXzGbAiEAs73ekEp9REDr1wc2uvq7RQmiVCPMNQWhc2lqeawxLt0q%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDF%2BWaKD73w6naRM8DircA2fUFR77YW0YYvfSDfVsMUkbmrdiZl6AkrZVA4MZmkUb3%2F7JsgDcDEoi9TSL5VZh9TOjm6C8eMt%2BRSHwklwLsQ66zsMuKLJwwLcMYT1rxxmQ9v7vdzkkQ7lTFUJ9jgtMeHDU5q%2BFKk76Xu8QOdS5s6rYMMBb8ocFfm9U68Ais%2B38LfF4qOUFkbDaGZ%2Bvy%2BG89sD%2Fq9cv7WY8c9IrKuf2NnJvkL3pJBb%2B%2FY7CDO70x1h6TVb0pxpoQVgX2MUbyPhDs9GpewcxDoCpwJajpFTC%2FyrWAOBOPD0U77lI2y5FagDU94xEJh61b2PEYuGJF6mZkqxgN9LA0xLb10qRqGLYqpAzmIr%2BFlJ3fnbW9%2BZ6Yv8o1CfSqqtrCcUEVE9cbX3I8cW1R8pnhxOX7HVkLM1Wgd44phPFDVlgjRydNxMN5AW2EWXlt%2BVHG0g6WMi%2FqEPj%2FAsUxn9qYss32mWNcNdIi9eO7E97wTGGqEU5vEB59gRKpni5pMnW1YYqncN%2FjmoZKPOYzIx0WRtJF8K4lgiEM1nRucvvAbn1%2BpgxNg0TrZBTp0owRNvxdWd0XzCWf4Cd17HtHjjNErXnbeYQa6VUhkWt4rA6X05Z1LRK0mYoItvjowrR14eLIrrJz9neMMXyxcwGOqUBHnblrh7K%2Fr3UMvAH7vuZfXYXw0q9vJ0JIM0gMNKzQ%2BotaVkH9WNgEDTfwKrlqQDZ0WItaMOSyNkRyvt7PqJF7lNsP6hX9msGM3pAeECJScl5cEyfS9a9KgcjQe5NEJt7VaRvidImrnD7A3uN3lCTydGOgpt8eyw4%2F%2Bed0MGDyT6gOZN3bo4Bgoo760%2BOuyA%2FVEiaMR19EHdOnuaeWaE5BQ6rSZrb&X-Amz-Signature=f64fc36c109836d3c5f4859d4f4e8586402c8b38e3f2f9f55a378bc605ce005e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JU6LT3E%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T081713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCICl4X3oCA2r1%2BATbcMKBsbLFK08pcZSUpJdZSAukNazOAiAMSWYC43hk18tP86F683scymR3UbPJgVFy6OXzvK5izir%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMFgAP5IQzxwdNmxlmKtwDQVrWeFgRuYqJcXCz%2B4j6Dd6exU%2FSBbpsX8dhRojWYagRkXtNs5SJNCJ0KoS3junZuaVtGNg4xkkXNKcRhW%2FJY5rYvjJ9xh6SOJOT2URJGPlKu8uixD2LG8ricKrfpk5WN%2FIyRLqghISxX8LIibhNRoHVxdp7gEURu2s4TEsj5ns1hqT%2F0wbpg34Sc2YISxcysjvKzG6Y6kwaFLkjC%2BrDvlxeE1eUlVCXF53YyECI4%2BQgBhRWsJZhaNyuM3LyCq0jQA7Z2Pa2Ofbl3vLP%2FGXW%2FbPzHAB5QhsfFkwY1tPMKCVJv8GMkXHeuEQJFZiVsOdlv%2BC73CBF9nOz9v799otjDChK%2Fjy1svKpnUTamAp71scLnvMSyteCtRM6KnXWdZAwGCKY6X6RqKUPYVJHilNyEw%2FUoFMpMRsF%2BAG9CY4UeklcoN9dJrThkL652jSfEZT%2BjlTTqugrLLGmw9qLkHNCCM%2BkZL9in0IKfb%2Bu1lS7aJ4GvYuNkJ%2BKVodDCVlEvFkdWfffrZXlnc2CUehtRn64ZnCeupunPOHjAhVE1otB7utwu%2FAm9ITG7K7OaBqVc%2BNiH19d51Omm23xcWI4ombTgKqnwzusjXB1P7bCTFiOTEKEe6C7E64VMaxZC0kwsfLFzAY6pgF%2B8DLtwg3pj9DEuzkKu5ZCcJqjGe7hV%2B1fyaJlGoJ%2B5AHi0JPu1ZSF%2F%2Fz32xQRmY5%2Fu7pgdK6hroMVZLZrb6aI9QWmuxSmaqZ8jG9aL9tpg2pbQ%2BKcjrlgMPRCU9LzyYDPZu9l%2BzdakAPjCjlH%2FetI5Wf99o%2Fl8eBdRTAL3OYHU2o5wnqrqotU6Jt7cD7VJPaXSxeb0sUNBvft1eNPE9eHsINxw507&X-Amz-Signature=21f3353605b8add894cb989b8ccbffd12e6fd2b857289c134193f0fa78ba0a32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JU6LT3E%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T081713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCICl4X3oCA2r1%2BATbcMKBsbLFK08pcZSUpJdZSAukNazOAiAMSWYC43hk18tP86F683scymR3UbPJgVFy6OXzvK5izir%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMFgAP5IQzxwdNmxlmKtwDQVrWeFgRuYqJcXCz%2B4j6Dd6exU%2FSBbpsX8dhRojWYagRkXtNs5SJNCJ0KoS3junZuaVtGNg4xkkXNKcRhW%2FJY5rYvjJ9xh6SOJOT2URJGPlKu8uixD2LG8ricKrfpk5WN%2FIyRLqghISxX8LIibhNRoHVxdp7gEURu2s4TEsj5ns1hqT%2F0wbpg34Sc2YISxcysjvKzG6Y6kwaFLkjC%2BrDvlxeE1eUlVCXF53YyECI4%2BQgBhRWsJZhaNyuM3LyCq0jQA7Z2Pa2Ofbl3vLP%2FGXW%2FbPzHAB5QhsfFkwY1tPMKCVJv8GMkXHeuEQJFZiVsOdlv%2BC73CBF9nOz9v799otjDChK%2Fjy1svKpnUTamAp71scLnvMSyteCtRM6KnXWdZAwGCKY6X6RqKUPYVJHilNyEw%2FUoFMpMRsF%2BAG9CY4UeklcoN9dJrThkL652jSfEZT%2BjlTTqugrLLGmw9qLkHNCCM%2BkZL9in0IKfb%2Bu1lS7aJ4GvYuNkJ%2BKVodDCVlEvFkdWfffrZXlnc2CUehtRn64ZnCeupunPOHjAhVE1otB7utwu%2FAm9ITG7K7OaBqVc%2BNiH19d51Omm23xcWI4ombTgKqnwzusjXB1P7bCTFiOTEKEe6C7E64VMaxZC0kwsfLFzAY6pgF%2B8DLtwg3pj9DEuzkKu5ZCcJqjGe7hV%2B1fyaJlGoJ%2B5AHi0JPu1ZSF%2F%2Fz32xQRmY5%2Fu7pgdK6hroMVZLZrb6aI9QWmuxSmaqZ8jG9aL9tpg2pbQ%2BKcjrlgMPRCU9LzyYDPZu9l%2BzdakAPjCjlH%2FetI5Wf99o%2Fl8eBdRTAL3OYHU2o5wnqrqotU6Jt7cD7VJPaXSxeb0sUNBvft1eNPE9eHsINxw507&X-Amz-Signature=21f3353605b8add894cb989b8ccbffd12e6fd2b857289c134193f0fa78ba0a32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDOKLUDD%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T081714Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCIHBD96ktDainAX6%2BWxtLr5m9TNLNloY1166vtuk5g2WMAiAItsOlLsxYGRyYNI5ZVXBmuPVRNYuVMBnNYALCK%2Bfs8Cr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMNV2LSvE7x5BhplQUKtwDyNzQakOVUJGvD8dWX0vXs%2FV6NSmM8ipnKbLyRasrqyxCNeKlAJdzpNagbjL5WmmWiKtDu7N0bKb6WGImlITKulYj0AFgppl5O%2FtqSNLEk85GTS5snd9ztRgxmaZShRcBcTxFYueXdGg1q7mbCVAwjrgV%2FsA10Xmqy2lw6YG%2FgWymuFkGjPusn7VX1vv7AKxTghObWvmENTnT6fppNvWht5DapoUcvO7%2F5N81eTJeyxV0NUPCk56madCkTVowkKIk0rIUJoY05oLt9Mw96GX6oF7BxO1wjAP4Yn6j8BYDy3LFw1MY5S5ihyn14%2Fvife6NmPkQV53eJUFq1FVo2LgqVBdNPQv%2FQOeJbDftPPHdxaWAIYJWLnfZ5TjkfoHdo%2F6rvElPt3VCtHlqvuGTD%2BAByy1VzR6gmpYSCzGPHxLWYBWDrOKfmWudAtmYNUSfKausgBjTAuFT9bOlGsTljhxASjpDVajwLFLuDUpDEe%2BVrYdMocUKZxBihVmHmJPW07wCLz4MWzm1%2FXb7F0LEIaqT3iCrxPK8DcZc50Kj7xr2RnSIxwc6S7cp98BJmXuiO08Pr2MUWalwW0u0TO9Wprt06qWtmNLs2zDUDPLkYyjlXz077Z%2FCuBkucjCOLEUw6vHFzAY6pgHCzfzXCuTrAOe3O2aEUR5bODXdF7RaL6U6n4LMSgfh7QJuHJoL0gdwR5vP0IiAYR9g7fJ4yLHHARWm8TAEhi60ikY8YLqkjlPLLyNvEeLf25nwK9crYBFAvl3VDHD8r%2Bzxh2%2BlgpPwBElXuAUV851wI3qefUNCxZiBe%2BojHXcTjBr3iazCH1VHmQBTbannajQ%2BENrHdxaMXbQ%2BW%2FHQyHmLHxVLv1r%2B&X-Amz-Signature=c5410331329959543560ec6adb67948ac9e24d5ddb40b06b333957206a8f3dad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

