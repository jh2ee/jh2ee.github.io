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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2U6WJZG%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T093030Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIDrj2sQsNpgXbq7UVI5rcaXGkyCkaCowjvcgjlT2H0JUAiEApx4T0%2FRyHF9TeqGsipVeZuzDtI8yYiM%2FnM%2F026TVoYgq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDBN5j7vzz682aJeKgyrcA3eniV57R2MF%2BS1Uaq3Xalv%2BzQ6FGGcyQEdL6SGZ7yMlFNWZIFizGFdleljgVVwvzT%2B%2FEnvjKoEJtjEw0f%2F5qBREKqvMdrsQ8Ro6joNC4p6EgF7yWy23zn9WyusZEMVKBglHaZpF%2F20e2L76zBtH8nJle1VlHUFGFoQgpw7N1AlcecSRduK20AUg6tAYSgmuAIoNG4BTdnHqhN0d5swTFNaYjrd5LRdzzsMd%2B8%2FMJ9Z%2F5y0Ol%2Fg4qfHoLr%2Bhw%2BccFsn8Loihkly7hsLqQld1V%2FI%2BCFPqumCpegsCq64ovhObebi9niFqsiYBXPblEdsUH9V%2Ft0Hu1UTcICCKvmnTc%2BM0AAg1WxulC705YHRxQtXvrjsCM9hk9jUp2GIpBh%2F1ZLQem%2BWhKHL2HY4pU%2BOh1tznohaFgHZlIn6faDQxgKWzRQnftB9WF0AF6enjjn5%2FNaN29e8R54w03k1p3EeND5TSLsF0jgUD8KLFvBSvANYDNK7WaNtsQMOdGNIz7yCt9H29wYB%2FQRpC5zVFrc9Oe1H%2BavTVsAMEE32CeySIeODPMudMcyFhCyE17VkD03brOs9CbXMHO%2Bp3pFmEg8Q7e0W6n6LMIfJ4KeV1uyXS4nmgJqSjn%2BPItDyQsUm3MJfHv80GOqUBlqfVKdesucXnrJCSDEqlO6o4DBat5k7PBdeSlcj9caCZcQ1%2F052bC454Q2V3F9rSGX7A9WVZ9Er0CIX3Xp%2F%2BHGz%2BXv9OJVzvsU3GBuFEIF3UvVfPK9%2Bg0c95jrzQE3AKLIUt6vAaOP6Im5FV0ppUHSOwZ%2FTW%2Fd5ZMCXqV88chTovBWxonwBlWBwLw3GZMNIy7DiyEoOwtB7LBC5q82sfn5VexzS5&X-Amz-Signature=13d903032c09d62bdedc5b60b5f587e95fdab84dc3a063638fa991ea6cc98764&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2U6WJZG%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T093030Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIDrj2sQsNpgXbq7UVI5rcaXGkyCkaCowjvcgjlT2H0JUAiEApx4T0%2FRyHF9TeqGsipVeZuzDtI8yYiM%2FnM%2F026TVoYgq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDBN5j7vzz682aJeKgyrcA3eniV57R2MF%2BS1Uaq3Xalv%2BzQ6FGGcyQEdL6SGZ7yMlFNWZIFizGFdleljgVVwvzT%2B%2FEnvjKoEJtjEw0f%2F5qBREKqvMdrsQ8Ro6joNC4p6EgF7yWy23zn9WyusZEMVKBglHaZpF%2F20e2L76zBtH8nJle1VlHUFGFoQgpw7N1AlcecSRduK20AUg6tAYSgmuAIoNG4BTdnHqhN0d5swTFNaYjrd5LRdzzsMd%2B8%2FMJ9Z%2F5y0Ol%2Fg4qfHoLr%2Bhw%2BccFsn8Loihkly7hsLqQld1V%2FI%2BCFPqumCpegsCq64ovhObebi9niFqsiYBXPblEdsUH9V%2Ft0Hu1UTcICCKvmnTc%2BM0AAg1WxulC705YHRxQtXvrjsCM9hk9jUp2GIpBh%2F1ZLQem%2BWhKHL2HY4pU%2BOh1tznohaFgHZlIn6faDQxgKWzRQnftB9WF0AF6enjjn5%2FNaN29e8R54w03k1p3EeND5TSLsF0jgUD8KLFvBSvANYDNK7WaNtsQMOdGNIz7yCt9H29wYB%2FQRpC5zVFrc9Oe1H%2BavTVsAMEE32CeySIeODPMudMcyFhCyE17VkD03brOs9CbXMHO%2Bp3pFmEg8Q7e0W6n6LMIfJ4KeV1uyXS4nmgJqSjn%2BPItDyQsUm3MJfHv80GOqUBlqfVKdesucXnrJCSDEqlO6o4DBat5k7PBdeSlcj9caCZcQ1%2F052bC454Q2V3F9rSGX7A9WVZ9Er0CIX3Xp%2F%2BHGz%2BXv9OJVzvsU3GBuFEIF3UvVfPK9%2Bg0c95jrzQE3AKLIUt6vAaOP6Im5FV0ppUHSOwZ%2FTW%2Fd5ZMCXqV88chTovBWxonwBlWBwLw3GZMNIy7DiyEoOwtB7LBC5q82sfn5VexzS5&X-Amz-Signature=13d903032c09d62bdedc5b60b5f587e95fdab84dc3a063638fa991ea6cc98764&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQ66LVCS%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T093031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIHGN%2BEIK1fVwfbMzcgtHHgO3jU%2BfdI3dQrpFWRPYI%2FFZAiEA%2BiwkL2c2Ral%2FDyG%2BTZzv%2FDrDn5ItmQQEk0aarM6a%2FOIq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDKYaPGSB4fnTSfYvWCrcA2rsXQqQh9lxlrrnIByqEXjaZiMr%2FXEepr53cuwBwh%2BqXqR9rS3B9%2FaBOR%2BQ6XeS3y92YPEJCMNapcF0s0E0au09mZrAWejlqwrgXRVjIzfShs4PD6YKllasCcvc4oggLHxbv0HNkRSh8K4da4WBi3mJx76gYLbd4CY8tmPjtN939JnNgocm6hvdV9lcsX%2BMFELIgQDD7iBlFGOdIKn2%2BrkZpXYoPOvF2ccnT3EQtadqJNsv1xagr5QP1GxYMiKUhe%2F%2BVXZUGuJeYMVUQ%2Fi80VDUfnGgzSPbvlSUPBw2A3r%2F6F%2BXOA9YDa3UeR2x62Wxmd0SdSuAWOX%2FtgV3vbBJp8uHtGA2lsmyXZwI7qv7SIWwITukrSgo2JkKL22qs06pvYasTpsgExpOFgSrfagx1Dl5WqwTvplMtWXVeSPqRepLkp4LpDFqhK%2F38TKSnkGVApR40oIg4%2BTxTmOIYP5oxkmsh4TEP6qegB%2Fj8fIu02v%2FGpPukeEaR%2F%2FsyCCZy51su7BSNOkYi5XTaRWw744N68%2FNB%2B8kR2vxD7%2FLWQR%2BOBh9E%2FIkFma%2BTnbZEYp4PyIFm%2BvmaKENbThYvLQnY%2BR8YBDtIvYpeW8mgfO1uQurJmZfi6VAYChK3okgIZTJMIbHv80GOqUB77XMdKXXBngi50vNYOQ4sZBQF%2BfmybTRm2ILouj1u%2F8dB%2F14RJkdMSyCxTmEMTNDybBlMAIRLKvmH7YHYwFM7b6YcDhWU2Grn%2FPojRNTwRytDc5UnmmhZIV%2F6Au6nTinX5AyGjXIm%2FWnyYGrr7d5BQRq0tqo3xrzfjlto6u%2FPbPV%2Bp4vL8GyhxN9zA51cFrLGBbrTPltLN2NOlXFEOGkEqgEZOba&X-Amz-Signature=e7b817ca5426d8b62710af00f90eb8a1766d67e4590da42e550c6ed343fceada&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VS4ESYSI%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T093032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIFt2RUzCfnPGkeUxWLAxals8yJwjR8fJtgaJqMA%2BWDB7AiEAufVPlzkw5Lvs7WtY5DDaIQpae83p8fil68Mwz1rfpKYq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDE66gTka%2F54BTUOLiircA%2FGz8KSPOIV1oaoYNtaXL0iSpc%2BSqwmMbo5PtPrWPToyUqqEX2j6KDAL%2BUjAlZSEbFWkQJo%2FtFYdzdDh%2ByHWq8cUYlGNRrEZAEg1hR%2FPReV7%2FYMN89ZJXp92UMQVoGbiLm%2FUEhyLF%2BCkfUHhwLSZXPN37CaKXn6nVR5y1MWrvU1qJg%2BCYTDu%2FDvX4J2x7g5%2BpAyk3LoWopkNFODzzXh%2Bd53HOvAnusFWJYPYdhs3jrZjS%2FkmgaphxGEiGPEPayWcgaYIhUY4dJjqWlN4IVimNf7VRAs4sBvWloSKmS6tl8obWpWJAopupE9tfJuHotlRezZC%2BMY1322cjjC97OU4PZXgXRq6hezYSfoKyeedDptPK8EDOWryC0ZMEMkZssMFay4Zp2%2BTQH4V6sMjEQfi1YHxSIv4fiZDFtb3%2FWoc8tLfNluUJRdh6%2B3cQVNVJ8nv3m4wlYzLR4SYNxagqIjQu1%2FaXPMoqDhX7gt5o2RcT1NAgRqf%2BEHt9eXU8MrHOrD1W6tHyO1ulAXGASMjAvAyppEHKXxihxShEPSG2m3tCaqFjHPKWXLhonrHnnSp2id9mRPQJLO3MIsZ%2F3gJ14xCPXJvqM8NssQ80Do%2FvFXu8p9YRw8NN7mO08QUw6SzMPfGv80GOqUBTVFCyKKYyGF3Ac0FImuEemWxP6A2CQcwasQqHVCoz6g8Mceo9CdeoJoVtF2zed5QERD77%2BT34dhmIOLipPbf1teSXJ5YDPni6LFFr0fj6LApFea2cwjlt7QCYEeJxoiRLFea4mvoc4s8YxdRhTjH5L7l158nmJxMvRWBhOUG541edv3LZgvD6qfM%2BaHJdjmsg0N14MyaSrQlHKgWeUHudzTjhn6s&X-Amz-Signature=fa7d7616be66bf89f8fcdf219d0931b5355579568545a8ebe80e81144bcf1980&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VS4ESYSI%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T093032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIFt2RUzCfnPGkeUxWLAxals8yJwjR8fJtgaJqMA%2BWDB7AiEAufVPlzkw5Lvs7WtY5DDaIQpae83p8fil68Mwz1rfpKYq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDE66gTka%2F54BTUOLiircA%2FGz8KSPOIV1oaoYNtaXL0iSpc%2BSqwmMbo5PtPrWPToyUqqEX2j6KDAL%2BUjAlZSEbFWkQJo%2FtFYdzdDh%2ByHWq8cUYlGNRrEZAEg1hR%2FPReV7%2FYMN89ZJXp92UMQVoGbiLm%2FUEhyLF%2BCkfUHhwLSZXPN37CaKXn6nVR5y1MWrvU1qJg%2BCYTDu%2FDvX4J2x7g5%2BpAyk3LoWopkNFODzzXh%2Bd53HOvAnusFWJYPYdhs3jrZjS%2FkmgaphxGEiGPEPayWcgaYIhUY4dJjqWlN4IVimNf7VRAs4sBvWloSKmS6tl8obWpWJAopupE9tfJuHotlRezZC%2BMY1322cjjC97OU4PZXgXRq6hezYSfoKyeedDptPK8EDOWryC0ZMEMkZssMFay4Zp2%2BTQH4V6sMjEQfi1YHxSIv4fiZDFtb3%2FWoc8tLfNluUJRdh6%2B3cQVNVJ8nv3m4wlYzLR4SYNxagqIjQu1%2FaXPMoqDhX7gt5o2RcT1NAgRqf%2BEHt9eXU8MrHOrD1W6tHyO1ulAXGASMjAvAyppEHKXxihxShEPSG2m3tCaqFjHPKWXLhonrHnnSp2id9mRPQJLO3MIsZ%2F3gJ14xCPXJvqM8NssQ80Do%2FvFXu8p9YRw8NN7mO08QUw6SzMPfGv80GOqUBTVFCyKKYyGF3Ac0FImuEemWxP6A2CQcwasQqHVCoz6g8Mceo9CdeoJoVtF2zed5QERD77%2BT34dhmIOLipPbf1teSXJ5YDPni6LFFr0fj6LApFea2cwjlt7QCYEeJxoiRLFea4mvoc4s8YxdRhTjH5L7l158nmJxMvRWBhOUG541edv3LZgvD6qfM%2BaHJdjmsg0N14MyaSrQlHKgWeUHudzTjhn6s&X-Amz-Signature=8b35c9c42cd2ae53c80d02e1e4b1bcaab295b09781fc75b334cb878c2df15c95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664N6OQ5PA%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T093032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCICB30yfWRCUvuQ%2FIxBo7bzSb6jSyWCi%2F3j26sjChHPdSAiBV38Lv%2FRyi%2FX3QLTD3JMqAZgx%2FnMauTO%2FSogdRYbcMqir%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIM1%2F0bs6abFy1lFLHcKtwDwM02I559sHH850t8JvBJ18Lief5AYdJPZIMgBJsIi%2Bqdg%2FiJYWErF4%2FbcN%2Fglw%2BeMVW61z5VnHXaiWcZ2OmgXc7oXFkS5VQ%2BZphvr6MsNWh9ejdBwEC6Uj3%2BbYhv59EKr7pVt2dGwOv2OjZskRpFDNcejiDg7AaOeu9uOtsQ0nbP29RE9JE2xFze9wVFEKUSyQJuc3XaNlQuE81OHpbmCRUGsw%2Bx2v%2FkOk1L07SH%2FqXjSYa7eIk9yV3%2Fy4E7NHacWPP0F1wx5QXu6ou6MYjrXIIyP5GZsCyQ3Pw2gjACbMa0MoEdCD%2BbxvPuM3LrwyOylImADvmkOZ8qN76t0VgksN%2Fz15Dg1Bnu%2FUjfZE9tpeUSueojJCTY6yDdwyJwEpacE3wwKjvvZl%2B%2B72XfJ6NnzlVh5QfxFQAhoqs%2FJxT4DzOrtoNGbUGeA%2BRva9P75L%2BtKVQvvR6GCa8ukPh5mM5AwBPSppyeRv2a2A4IVCXSwHY4dSfS4X7INiq9PGldejck57TRIyAyODJXwMJvFgGCBwh0IIS%2BMxbNTjNfEzvJ%2BpCgvmoSBX5LqBc78a0X0BsXrQr%2FHJRj5g8XhujwQDH5O%2FsmvVQGoE02K2yEDglU0iejXNftGjIEUoZgzHEwxse%2FzQY6pgGFy71MWg7jUYFb%2FalsMbiuQ1Mt2ib%2FZxXMhvkGrXAXdZZEj69xtvm7JmzUFLz4e9%2Fg7hcXRK20FGTaHzG2vT2vLKW%2Bm%2BkK0P4HeQd0scPr%2BVqm1ulQPE1E6hLf%2Bo5TVfvybZGhOi%2BmR1WtA%2B3INy2hhqMZt6yMy4l9smqBxIY7cS5wBSPf2SAHcF52LDaZWEEcZKp8sYbiI1eYrAiapVwDXUAhfYOo&X-Amz-Signature=de2f1f62ad39e56f06aa94aa1682febfdcdf9185bba0821301bbfac909a1e521&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VA5Z3CSA%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T093033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQCjPJcdhovNQzkA3p2BpqJzZXiVGIqseN2h7NJjWYcQ4AIhAPMwx2TWlOlC1YLKLGx775C87t9%2FBCbXBipUwoP%2FvUdOKv8DCEIQABoMNjM3NDIzMTgzODA1IgynUkXBXdeYDat3UNoq3AOgeLY0HAVZwkZ4X%2BgEDI%2F5I8ul%2FVZbd%2BYUzOdix8MlFATbgTKsED6xXLyUCLeNloVazaRsxsafGGiL0eH4N5RWggZjpqPcVZMHR6DkHZBNf4pHbwidJA%2FNbas72FIdG2A%2BL791uUhrCDS4qyEFa5FUHuzT1%2B7YeIqP5IDh%2BUQ9xlsvmRmujKpE3vqQx0KdRb%2BWD%2BGmepEvxPEY9nPPb99VXfkLaWNgiP0yY9cHsrI9lRwfwbX2vvLqUz72MLFZdSdXgyPa2CrevF8KdXGWdRng2w70G4VH4fiyKcBffjciPvHoP5brCH5JjYbFe0boYCDdg%2BlcUSOedMe0MNwbZ23LICoher3jNCS1yFMDDdanvP6e%2FwiuvPo4JO8pwhC%2B%2F5okWpbKA%2BDVYbtze8ng747Ym36RiT6g%2FMaW%2BMt%2Fxrs82jfLNa04ww7vY1RZ6YLHRupT7%2Bii8tuuDdavnmyu854H0r%2FKoTD3WWNBLdEheXmTKuiVf%2FwqUq1byvzhHC14s%2Bq0WYt1N4stjWOAKT4j65SYG2aH9biBTJ9yUZIhJIGUcxY5OrUonYUNV2y5RkdA%2F1sBOK9gCDVRHihsW%2FKILEDK6rS2xpk75aTxSXsmCqiZKZ6GG0%2BfsgGTUNk2TTC0xr%2FNBjqkAbRe7Ynma5UgWb%2BWRvOqKqPpRdfpBbgR5UPk7lmQVMXnCK6QZ0LcW7JQiYvcBpz7RnoF%2Bq7AibSEUtSslunfVoRsuDINuknyYFAK1p4baGwygVzkrirsv2MRG8WMzXQ%2Fl%2Fcui1EVVJ7A4fVRjE6fCposWB58ZmFa5LW%2FtvxYndPSx9bSwtYnbpzRHx%2FhnbrS%2FDRt61UZXQAqi17HN5AvPzO72hT8&X-Amz-Signature=ecd3f5b55f899bdf766bb68acb5c328dd3bcba85093b83d7bb17acc83ecadd52&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYKYMI27%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T093035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQDz8cfDrmW2c2BwZFOFlqYarpVpL2oHApGcOCupXlrYPAIhAI4IjYcXjI7WcppAYnRR7qEMpOVt7w3D9iTy253dM3EsKv8DCEMQABoMNjM3NDIzMTgzODA1IgwKBh42mEf5LG0fvwwq3ANwH7bhI3SO41bDWqEfyKqswX6f7%2BUvBf3bbYWThsmyTKSQISZV6ojW72dIXej9Jmxh6hEwyvZtwEw1ZxD0kU5q2Dzu14JTwBvB31RN6EAXLY5CgHukFrvRW2jtBBmRBExu2IzNJEiNjppZEwnkQ9j9kl0PZsm4B65xx3TKEJG7pcAPSVLGpL1jBgOTR8IHiz4Jr7fvff5d6DupeGUIQrelrVkYbm8P2DSeCLfXq%2FQ6Oj62p1oodTj24pW92HrGZSYMHG7e70%2F1GPEogtQ4qltN%2BBOdV9GsSahoJ9ZrHB4tZv6KGCU%2FNnEKQjfEJdBP%2F8EV24iN0UiWLTXroN%2FuDnaXxWtEEnTdGgxC9vtmgaK7FJs%2ByK0FVNAUmovndfu5%2FjI2UFvrae92r5lwfqy%2BrEMAogKfFHqmwa1%2BtXKbeqeop5QMOd5fQMqZ9q9hSo6xem76DVo5h1dKiBg%2F8DcuZSIjZtY81ciRR9ufSnuU%2F%2BsNOuJhUjctoJMRIrc9ChgzMFJvg%2FF%2Fcf05lyVJ4MS4SnzKMguQhktwwc3dhYy6DpgcEo1AwJNIXsY%2Bo4CXTakYYNaWfjXD3ET7ZOIYG8hFE2IHLcrZXHlHZ1lhm8aySmPJ9iI1k93nE048LLLdjDD8xb%2FNBjqkAZT7Gle0aH%2FHuMgTpsA0ajM9irYGV3gPgzsXa8mYWqZ37o5knHWvoo8%2Fabw5KTK%2BMXzdru42Dzzv%2BhEiJAzE2Sul2KVNbIsSHH7Mh1ReWkiNEIoVLS2fybr8BRiBfjdW2F80PWxAPqJTLLf2YPgdOSQe9O1rQYDv9keC2Qpl6qiDAxNyMaakryWEeg8OuKot47N54X2nplxbGIGOOORV2XQd7%2Btm&X-Amz-Signature=f5dec02912b8c46fd24425ea8ef8681bd42bded453e54251fdd11edea17fb143&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDY4ZCJH%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T093037Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIEBzkuwAMV%2BWq9uRJJJqlvujD7cm%2BE%2FJ3v6lAfkeDwkmAiEAuI4YM9oFSJ0uiAW0dmOlD4ST8CWFF%2BQDBFKYlJwopEQq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDD%2B6zmLxDXB%2BOD%2FNOCrcA6QM88lvcoFxQXUW1efY1LyhHAOKu7V6akGazQ7TuDgdwJNfjYbuZLKUustu7ZrJBELP7qo6wd%2FUaLCwjsMHuPFtwOoFBvS3DuLpV0fpo66XL14y2bQwWgmskvqkN%2FZWy%2Bz5t1%2BKG79t90QfLL%2FhnXKmkAcZXKPP%2FUX6%2B1K2yi%2FI5NPpQ6iT7Dn4jOeazs8i2cvIoj06IHJ9YOxLXbNYnN2WcYpajKaqbnZTFJqnAD%2Br3g97yuAlgV37h%2F3XQahc7pYB3x19hhxGP3wh6Ywv9UbOg3vgLFF3P%2FefUMJyTeg%2FYQsoImcxB8HpZp3ub9uBcKVZIG9t%2FHcdoN6kTmhcJyMrAiOwfKz%2BINz7EgPXtXrFS5HLUF1%2F4yU8EuoFDN1ujuk6vBqltu%2BnLThHSt7ICYIdJCuSH1zw0PvuDqfJQyG8M%2FcogTFiQDHgxsoVyOc13bsKgvZGA%2F7X%2F2ieY6hVYlJDc%2BQ7sHexvxdz3ERIKJVp8G%2F3wIw8sQENQIf9ZtJ23o5PiE4Ps76nQXwvZ8NEUlTAM1M%2BRH5yu49w2RjbValDf65TZWf1FWe3KEHWWtBIniXJAcV5V8RUkAEjgbOr%2BBlwKBDqO46NGJ1Bdh1SGucTWxA8y8uIY5IcAXrmMMXHv80GOqUBFxMS%2BifQjO27fadgChQ3UZFH0SyJ4fJ5yJOOjkGrN16rzdsJh6KyQEluwGlGCNThtF6qpn4guawAQMU%2FJYF%2FNc9dEFMSGJSUvvEvL3c6p2w1cOo4Zk74kNYLDi0HawhjV89aT1KM2g%2FikErc1csNpxtyI3mM9FoAMx5zNiNVLCQzNXuB41qdJKrppOjsWYLiODLY1Q9wk3tUhWnEK0Nr%2BilvKWqC&X-Amz-Signature=4fd5c1b2d53688ea47e0fadde25e79710b7ba6cdd0ded6bf76e06efb414ad663&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDY4ZCJH%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T093037Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIEBzkuwAMV%2BWq9uRJJJqlvujD7cm%2BE%2FJ3v6lAfkeDwkmAiEAuI4YM9oFSJ0uiAW0dmOlD4ST8CWFF%2BQDBFKYlJwopEQq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDD%2B6zmLxDXB%2BOD%2FNOCrcA6QM88lvcoFxQXUW1efY1LyhHAOKu7V6akGazQ7TuDgdwJNfjYbuZLKUustu7ZrJBELP7qo6wd%2FUaLCwjsMHuPFtwOoFBvS3DuLpV0fpo66XL14y2bQwWgmskvqkN%2FZWy%2Bz5t1%2BKG79t90QfLL%2FhnXKmkAcZXKPP%2FUX6%2B1K2yi%2FI5NPpQ6iT7Dn4jOeazs8i2cvIoj06IHJ9YOxLXbNYnN2WcYpajKaqbnZTFJqnAD%2Br3g97yuAlgV37h%2F3XQahc7pYB3x19hhxGP3wh6Ywv9UbOg3vgLFF3P%2FefUMJyTeg%2FYQsoImcxB8HpZp3ub9uBcKVZIG9t%2FHcdoN6kTmhcJyMrAiOwfKz%2BINz7EgPXtXrFS5HLUF1%2F4yU8EuoFDN1ujuk6vBqltu%2BnLThHSt7ICYIdJCuSH1zw0PvuDqfJQyG8M%2FcogTFiQDHgxsoVyOc13bsKgvZGA%2F7X%2F2ieY6hVYlJDc%2BQ7sHexvxdz3ERIKJVp8G%2F3wIw8sQENQIf9ZtJ23o5PiE4Ps76nQXwvZ8NEUlTAM1M%2BRH5yu49w2RjbValDf65TZWf1FWe3KEHWWtBIniXJAcV5V8RUkAEjgbOr%2BBlwKBDqO46NGJ1Bdh1SGucTWxA8y8uIY5IcAXrmMMXHv80GOqUBFxMS%2BifQjO27fadgChQ3UZFH0SyJ4fJ5yJOOjkGrN16rzdsJh6KyQEluwGlGCNThtF6qpn4guawAQMU%2FJYF%2FNc9dEFMSGJSUvvEvL3c6p2w1cOo4Zk74kNYLDi0HawhjV89aT1KM2g%2FikErc1csNpxtyI3mM9FoAMx5zNiNVLCQzNXuB41qdJKrppOjsWYLiODLY1Q9wk3tUhWnEK0Nr%2BilvKWqC&X-Amz-Signature=158bc3919da2ec77be5da29766d6ed4fc0071d8c0a9e112c0b83373e85736811&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDY4ZCJH%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T093027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIEBzkuwAMV%2BWq9uRJJJqlvujD7cm%2BE%2FJ3v6lAfkeDwkmAiEAuI4YM9oFSJ0uiAW0dmOlD4ST8CWFF%2BQDBFKYlJwopEQq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDD%2B6zmLxDXB%2BOD%2FNOCrcA6QM88lvcoFxQXUW1efY1LyhHAOKu7V6akGazQ7TuDgdwJNfjYbuZLKUustu7ZrJBELP7qo6wd%2FUaLCwjsMHuPFtwOoFBvS3DuLpV0fpo66XL14y2bQwWgmskvqkN%2FZWy%2Bz5t1%2BKG79t90QfLL%2FhnXKmkAcZXKPP%2FUX6%2B1K2yi%2FI5NPpQ6iT7Dn4jOeazs8i2cvIoj06IHJ9YOxLXbNYnN2WcYpajKaqbnZTFJqnAD%2Br3g97yuAlgV37h%2F3XQahc7pYB3x19hhxGP3wh6Ywv9UbOg3vgLFF3P%2FefUMJyTeg%2FYQsoImcxB8HpZp3ub9uBcKVZIG9t%2FHcdoN6kTmhcJyMrAiOwfKz%2BINz7EgPXtXrFS5HLUF1%2F4yU8EuoFDN1ujuk6vBqltu%2BnLThHSt7ICYIdJCuSH1zw0PvuDqfJQyG8M%2FcogTFiQDHgxsoVyOc13bsKgvZGA%2F7X%2F2ieY6hVYlJDc%2BQ7sHexvxdz3ERIKJVp8G%2F3wIw8sQENQIf9ZtJ23o5PiE4Ps76nQXwvZ8NEUlTAM1M%2BRH5yu49w2RjbValDf65TZWf1FWe3KEHWWtBIniXJAcV5V8RUkAEjgbOr%2BBlwKBDqO46NGJ1Bdh1SGucTWxA8y8uIY5IcAXrmMMXHv80GOqUBFxMS%2BifQjO27fadgChQ3UZFH0SyJ4fJ5yJOOjkGrN16rzdsJh6KyQEluwGlGCNThtF6qpn4guawAQMU%2FJYF%2FNc9dEFMSGJSUvvEvL3c6p2w1cOo4Zk74kNYLDi0HawhjV89aT1KM2g%2FikErc1csNpxtyI3mM9FoAMx5zNiNVLCQzNXuB41qdJKrppOjsWYLiODLY1Q9wk3tUhWnEK0Nr%2BilvKWqC&X-Amz-Signature=72979cdd67de78c929eadf2578edbc1b86731202c4756aa7fb4b42a510df8cb2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQADLIX3%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T093040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQD0tn3RJaLXsjuCDxc8mxqh%2BgOmpTq68hCox9ypLJS%2BqQIhAM%2FnUjEfkcXYhPQwk3F7ulVZvfCAOLFl%2B03BfPxbwwT%2BKv8DCEMQABoMNjM3NDIzMTgzODA1IgxhRcuUNKUJGs8cN%2Fsq3APEE9T2IurkCWH7jO6kXiXliB9Mg6s96KKmqbnepXBgkJOcjAwbPpeyqA3yYkQ13T6iEGQSRvpbu4MTOYP6YJDgHZb8nSmElJS7ggUdeeMP1Z7CZhSVi8CBKkbHDOfOgg7YwJ%2FPX3hP5V%2FDRDtIDSp5tHqyv9wua%2FTrBa6Kqmj1CoZoy1j9xhumbK0EAxCCVagbvlHI3c71cOs8ojS%2F3cxCetsnSHKJPjw3ODz%2Fft3IkAhSQ5VK4gF0OOsSilHWPrEd2VEUqIJ2k3UXtucxl%2BBY9UkDyMIT64KGby1JH21HBH0ZLe3BmGDmRxyzAJruZNYZ%2F%2B4RYqgwJRvtYt1OwX2uAS44bjOXQEMw6SC4OMa8RwHr%2BasNpU7s7hI0RIGKLkmucUpET1W4SbrKf0Eu2CTz1VP0yIE8f39soEYxAhAdWeq2FREb1DpbFhCPllyJDWk7vLK275ry8EjmldO4l67rghUcr3hmrd8XmCWaWUXjVTdpDTQPqVx48CRQCbep5L9SnT4V7P6blZRu0vC3CQy9SNqLqelNKA7uG0n2bSZek1ezA9X4UXZ6e%2FZcqN7hFa%2FazNMWvcpgv8ksPHUmcmBQD%2FhUXcectqrJyH5cWk%2FSHHBxOQ31d3aG3LrA4DDQxr%2FNBjqkAeZ1saOv%2B%2BtmtZobp8COVsYqvTwYTRjMDpfAnAPklzzUbDy07Kz6KbII13V5l%2Fl3VNrsyT1JwiYt6K27m7W6JztX9Stp%2F99ZA6WuE8oy4S642gJzVh20T1swp1e71MGaJu8OVAt2lUm3hZXvxzNnPzgaOnAIy1bh%2BALE%2B6ZyUBipmXrE87Yn57cJczbQ7OnyN5cs5OoqS87bQC6SY%2BD0DeGuFEUC&X-Amz-Signature=b014de242531041759dd6ff49469527ea8b129a2e567dfcbf17b0bbf5700e188&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQADLIX3%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T093040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQD0tn3RJaLXsjuCDxc8mxqh%2BgOmpTq68hCox9ypLJS%2BqQIhAM%2FnUjEfkcXYhPQwk3F7ulVZvfCAOLFl%2B03BfPxbwwT%2BKv8DCEMQABoMNjM3NDIzMTgzODA1IgxhRcuUNKUJGs8cN%2Fsq3APEE9T2IurkCWH7jO6kXiXliB9Mg6s96KKmqbnepXBgkJOcjAwbPpeyqA3yYkQ13T6iEGQSRvpbu4MTOYP6YJDgHZb8nSmElJS7ggUdeeMP1Z7CZhSVi8CBKkbHDOfOgg7YwJ%2FPX3hP5V%2FDRDtIDSp5tHqyv9wua%2FTrBa6Kqmj1CoZoy1j9xhumbK0EAxCCVagbvlHI3c71cOs8ojS%2F3cxCetsnSHKJPjw3ODz%2Fft3IkAhSQ5VK4gF0OOsSilHWPrEd2VEUqIJ2k3UXtucxl%2BBY9UkDyMIT64KGby1JH21HBH0ZLe3BmGDmRxyzAJruZNYZ%2F%2B4RYqgwJRvtYt1OwX2uAS44bjOXQEMw6SC4OMa8RwHr%2BasNpU7s7hI0RIGKLkmucUpET1W4SbrKf0Eu2CTz1VP0yIE8f39soEYxAhAdWeq2FREb1DpbFhCPllyJDWk7vLK275ry8EjmldO4l67rghUcr3hmrd8XmCWaWUXjVTdpDTQPqVx48CRQCbep5L9SnT4V7P6blZRu0vC3CQy9SNqLqelNKA7uG0n2bSZek1ezA9X4UXZ6e%2FZcqN7hFa%2FazNMWvcpgv8ksPHUmcmBQD%2FhUXcectqrJyH5cWk%2FSHHBxOQ31d3aG3LrA4DDQxr%2FNBjqkAeZ1saOv%2B%2BtmtZobp8COVsYqvTwYTRjMDpfAnAPklzzUbDy07Kz6KbII13V5l%2Fl3VNrsyT1JwiYt6K27m7W6JztX9Stp%2F99ZA6WuE8oy4S642gJzVh20T1swp1e71MGaJu8OVAt2lUm3hZXvxzNnPzgaOnAIy1bh%2BALE%2B6ZyUBipmXrE87Yn57cJczbQ7OnyN5cs5OoqS87bQC6SY%2BD0DeGuFEUC&X-Amz-Signature=b014de242531041759dd6ff49469527ea8b129a2e567dfcbf17b0bbf5700e188&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YAPWQYRA%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T093041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQClU%2BOmCDHc%2FGaAi42c1o7%2Bhy7OrMs94OD7mLYPst%2BYtgIgGPNAHF7Y3ocmcdrmHqlinJJnKV3KSwCBaNteXNyW5IQq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDJ9ljwNQqqXMtvMM%2BSrcA5%2FwmIF%2FgX0DcZf90aDVEZdRT6vWqjz0y%2FJ%2F79pklLiVoiLmcN9v0TsKdPmqhlJrRT4eHrQ91On6OUYAVplMsoUwC%2FRYgRQXSVWMsPCeSOHPfeju9xOQ2HPM7HHxCpSo%2B7pEdezT68nZ7xtdTQ40rSrE4HlI34MOxmSn3ox7CRImpuhI6wyeUZico%2B4Q3fIwIafm0Z4qEhMlfCsj9o1X3vtKlAPp%2FDsCEHh8lxPmbElPWSZB3aDApzfgU6dlBuI41DG7d%2Fvz7QtNbLWo%2F2VddYTBOa6GuKz8wWNA1rjtnSz8binpPsTlDvrhG%2BLXu069CuauBZBP04xiLoXNF3GhwcjXnS8VYX1lVkEtfaXYl6MY%2B9%2FiMqPAGVKOpUq7pNmrcg%2BV658On3Yw7LYt7nive%2BsWMctp61Gy0WNwYomwyFStR%2F%2BhGQ7XcT%2FR7COEJuWXQVR%2BVy8WACLE3BEwrfL5PoEf1P5ESQJgvQh5jLKFg%2By%2FHposFNblg4J90zko51kU0JrCXjlvL5m%2FxeQBWz0gWlHBic3j%2FJIlaS35s81eodtNmFviiU32d%2FMj3DNdfKvGtiudc6hAhQP8zpK%2BrQU7YWElsMXWEOLIcJEIpzc%2FlFh4SlyqnQ%2BpNeag5%2Bx8MOTFv80GOqUBsAXe9z%2FSb6gO%2FNfvpxCbCzuVeBL8qdRZgxq6ve8Yf9FfZg6DXppNzRk4U4IxKZoiI97SeNcfAH5Ue4XIzo9rI77d7lp5HbQmGG0EQTnBPzZX6L1NqF%2Bj0rRB7lMkURuj%2B7zB4sDgnVx3CcnR146gYPTG6lMp%2FV1u4ZhZVn7Qs58J08oLt48q4kJHGdyVMLwfcVSb1qsZSps0N21p8Bwuec4VUMHm&X-Amz-Signature=b17d7e1916d73abb23dfbbba33db29a368ab2ae06a622b9614d47b9823c0f238&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

