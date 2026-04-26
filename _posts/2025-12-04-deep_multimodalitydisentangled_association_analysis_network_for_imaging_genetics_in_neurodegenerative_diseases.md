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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664EEWAYLU%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T112903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCLadg3zDwSQK7q59XRGGYyM3hRXYw%2BrsHx2qi%2BfiySswIgBinNd2rAj5HjePNiyqvNltRZMlX3olTL0yEMDYKlJ5MqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNHr6%2Bk0GfnI6T0%2FMSrcA%2BKqKfy7kOWzsXwBtAJxwkLI7sn3US8Yt6cXUvjAF%2BpYN9HLuGJtq2LeDHp1khaK%2Bqs%2BcJB9yLCNVsWE9DGvep%2BBbLhYY9H70N0VclvZm7z50yixMhqXc2OH7hHJBlkCb%2B%2FTCR6DBgRcfUPGV%2FgMwEjvASQgLgfUOzbe684p789zlSJ6RrllJ2dcdOBg8l0kole2obhl2q76ec93fz796X0tNvxWf562oVbBNj96Lc1IEH7NaUU5kNfRV%2FgsiWJz%2BhpCI1H20dvfcmc13LxF699ohpkqbZK7mI5Jf5fpjqHuOjoulJ8nB5fjmqWidY0iPbVlfij%2FNeEyo6%2B2z04xz3AZk%2FVPeRMZ8u616%2BWxMLUmGE%2F6O%2BeumhiNVfV81aEuPaHERy4Dr1t95Ly461MrTZ18Uu3OIBYo90zljcvJEpXavvRNFKt074MXzBP2EUqmtH1DWH8nwfe6wW8ZyuuIYcp9G91lG4wandX7FjI%2Fkom5zewM4eIaSg2TTVFc2FomWOQDSTIBHu7yBzyvKd1gEBdknKFw4UF4L79qHfGaodYsCNlpC7FIy2Mi0WdXz2p82z0MCveJakpZ3kM3rBMu0wgG0GK%2F0S3jQdUdMe%2B%2FgLKCJ%2BZSS98rQiuzNVJAMJDats8GOqUBfByvkTgsjNiCnt6V768klf61lzGv2ytWDk0zjtZr0EhWYMcXB5LcZDz2N5ZG8nOPUxhdAjMu0L%2FiuBb1CXmT%2FUqBEw0OaTKpovvHHo1fL92J0lTmNJmnVLrJDAkfQDjf1%2B7WTWPuXoaB%2F6l0hagCBWa5LDv5cJUnreyf9S3Qq01XJtzH%2FiqXkHO0TIEH5G4F9we%2FRIfjZMCZy0675ZfuY95J7rr3&X-Amz-Signature=8d9c39e3e97152a388680c78d2966c3b1fab42a952ecc5e93c6bd4ddf7ecbcb1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664EEWAYLU%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T112903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCLadg3zDwSQK7q59XRGGYyM3hRXYw%2BrsHx2qi%2BfiySswIgBinNd2rAj5HjePNiyqvNltRZMlX3olTL0yEMDYKlJ5MqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNHr6%2Bk0GfnI6T0%2FMSrcA%2BKqKfy7kOWzsXwBtAJxwkLI7sn3US8Yt6cXUvjAF%2BpYN9HLuGJtq2LeDHp1khaK%2Bqs%2BcJB9yLCNVsWE9DGvep%2BBbLhYY9H70N0VclvZm7z50yixMhqXc2OH7hHJBlkCb%2B%2FTCR6DBgRcfUPGV%2FgMwEjvASQgLgfUOzbe684p789zlSJ6RrllJ2dcdOBg8l0kole2obhl2q76ec93fz796X0tNvxWf562oVbBNj96Lc1IEH7NaUU5kNfRV%2FgsiWJz%2BhpCI1H20dvfcmc13LxF699ohpkqbZK7mI5Jf5fpjqHuOjoulJ8nB5fjmqWidY0iPbVlfij%2FNeEyo6%2B2z04xz3AZk%2FVPeRMZ8u616%2BWxMLUmGE%2F6O%2BeumhiNVfV81aEuPaHERy4Dr1t95Ly461MrTZ18Uu3OIBYo90zljcvJEpXavvRNFKt074MXzBP2EUqmtH1DWH8nwfe6wW8ZyuuIYcp9G91lG4wandX7FjI%2Fkom5zewM4eIaSg2TTVFc2FomWOQDSTIBHu7yBzyvKd1gEBdknKFw4UF4L79qHfGaodYsCNlpC7FIy2Mi0WdXz2p82z0MCveJakpZ3kM3rBMu0wgG0GK%2F0S3jQdUdMe%2B%2FgLKCJ%2BZSS98rQiuzNVJAMJDats8GOqUBfByvkTgsjNiCnt6V768klf61lzGv2ytWDk0zjtZr0EhWYMcXB5LcZDz2N5ZG8nOPUxhdAjMu0L%2FiuBb1CXmT%2FUqBEw0OaTKpovvHHo1fL92J0lTmNJmnVLrJDAkfQDjf1%2B7WTWPuXoaB%2F6l0hagCBWa5LDv5cJUnreyf9S3Qq01XJtzH%2FiqXkHO0TIEH5G4F9we%2FRIfjZMCZy0675ZfuY95J7rr3&X-Amz-Signature=8d9c39e3e97152a388680c78d2966c3b1fab42a952ecc5e93c6bd4ddf7ecbcb1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZDIUIPDW%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T112904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB9DaueMyLX8bYmKGpd9%2FANtOuHR0kbtiXpHfEtDPpvJAiBqEJCw5c2253tt8ZzNNp%2BOVuP1%2F5ixCERoFXEOX4%2BavyqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMMb%2FckdonF1M6hcFTKtwD8YPohFagMBEVHRqYTqf91W0HOvAetGlRXJ8euDsW6xbG4ROf0E5cOvSTxzK0mqpVrpPldE0npwzQlqYvUbJei%2BXf35LT7kvTeoFUteb3bPcpSUGK3HvTZH6FZbD%2FAYn6o3G4BYsN3xS9hwoyXbJKFFigSoCEpP0iZ5LJg6LRx7fkzNi6HQAlHBkauYNtBP58upYTncsidcBpSykk%2BqaT3M%2Fz8ccN3IFTozUBBTme6dP7IMxd2MJ16s6FIC6rkHxQkCCKcSL91IVPSby6Cu6Mnr%2BwGjYRymCFTMvTHGuaIYokphF%2FQZb4Lioag1iD1cilNLwAzi0bKiagpLsgu9LBj%2Bss6JUVcRUO%2FEPdCK4%2Bww%2FX4FQwX0aTwqlWUFN2K4J4kkJmkhzB0JsT2LXejhvu2KhCZgDmflhTjMjSRG1OgRzLJKkq6VfMyeNceqHG7AzkoMO1%2F4e3tDFHG%2FNlsQc3SrPkLh1jnDKHt4BD5TRy6ewF3G4v%2B6z7yrzT0%2B0YcQpNIyNLcjK%2BRW7HOPYpCK0JbxHTRC99eo7TYOc4K3YJOsqGfWo4bAeqBzILTPTUaSfTYZEuTxc5vYGB3pDeJnyQJkZ5Bcl4Qt5OlPMMTS4SJ%2B2SX9bC5N5K6frB%2FLMwytq2zwY6pgHnM45pQdOns6v0jOhFG%2FQubVwqdXdOcd5hNyGl0WIL6IT1p28wvmfGz6MSxrvXRzoJK7g4wXJgQUoB5C4QRxVDfTvfhtrybm3e%2BMZGwSkMSER75u5ccWF8YJdVlZAw%2FfWHpXiTngxVBDGPanFWjqRg2LzPOVOEoDjP5WdUb7dqv%2BfxRqU4niHzNAW%2B2fRdclQrRDi0FHsxob4kSOD3FQ8bfT%2FEfs0b&X-Amz-Signature=be49a1a30d2305bffd1394c5aefb4e9d8b0e15fccfe9ebbe5f482003156ccd34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FXKG6R2%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T112905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCeXIVBvNi0114%2B6ZfjIMzHknmGbs5USM8ZWkPl0MqlpwIgTO2sK3dosVeQUkIj5YScZ3eSK%2FgdH7Q%2BuzuEqHN%2BVm0qiAQIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFrKa9yNnH0ccEDmuyrcA%2F4JDyjLaf%2FA2GWe4aZtjB1N6zrOJUWaYirModi9EVo6om0SjMT1%2B7rQng9HoQtjMtAK0bpgpGBM30Jx%2BUZV5fr6DlRp5Yr68rkAVlfX3OdOE%2BC98b6gXbximle2i1%2BZqhonwnnde96djj2b1YWuHOUB4oSiKssXMsRIjlXruCovBhxtcqKceBcKUCXY4fHvyn9FuXstPAUqBY81qG092mw7wasy2Aan0Rm7LDGskOeEulKY4P5BqYpMlHVyITejFKfCOLhofJnFoxVOOLU1F9MgvuHExUAcY1%2B%2F4%2FnxxXrTYrs1bqSf69KvkLHD%2FAZap16ElaKUQkWiaWv2kNaldEENeuJXdgAYO8L%2BGNqXzLgQZnRaq7EvLK%2F8Yz%2Fv5h3hgUEsyxjI4GRWgdnKOCOiLqQybFwn2Gvq9ki%2BBU%2Fhm2OV%2FUlqsDBKJul%2FbouP1Kjkd8uRQQDpzzgaa%2F%2BPXQnINCBgS7JS6BC273ZZB3sm5mpnYIruYIOXVzQHAzopd%2FQynLNePgXKL06vUEUYCsdDJQIGjc%2FuTCQjnykCgZH8WCGhWyB4x7uhv7lcU9lUPNnecmkzu5569VgABG%2BTjudfHBxam0rnNIN6%2BREKg6BDDGndGeUSFmJRQPqSCeBYMMTtts8GOqUBmCF3RCwLarKBDHjO25VUnOSDJ531e%2FuMNBK5ul3N0uxYRYp3ssbTp%2FjG5Jjqm4XIsfVH5w1ygF1VhORpESlhrypyOokTxfr4DNjOpHCv0PccKmVRaaDQlQ60h77ErBS9ZnLDozMZ23i341%2Fx9p8PcQeJ1Qk6bQzQPa98AnmPi8ZRC8hzbirKTj6bM4OekYHraLNmRQwH3X4BMnSFa6YMheB68a6C&X-Amz-Signature=ddaaef4f5c3ef00272510f788e1a390dd0c3d357c4f5a2faa6eaca00998f789b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FXKG6R2%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T112905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCeXIVBvNi0114%2B6ZfjIMzHknmGbs5USM8ZWkPl0MqlpwIgTO2sK3dosVeQUkIj5YScZ3eSK%2FgdH7Q%2BuzuEqHN%2BVm0qiAQIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFrKa9yNnH0ccEDmuyrcA%2F4JDyjLaf%2FA2GWe4aZtjB1N6zrOJUWaYirModi9EVo6om0SjMT1%2B7rQng9HoQtjMtAK0bpgpGBM30Jx%2BUZV5fr6DlRp5Yr68rkAVlfX3OdOE%2BC98b6gXbximle2i1%2BZqhonwnnde96djj2b1YWuHOUB4oSiKssXMsRIjlXruCovBhxtcqKceBcKUCXY4fHvyn9FuXstPAUqBY81qG092mw7wasy2Aan0Rm7LDGskOeEulKY4P5BqYpMlHVyITejFKfCOLhofJnFoxVOOLU1F9MgvuHExUAcY1%2B%2F4%2FnxxXrTYrs1bqSf69KvkLHD%2FAZap16ElaKUQkWiaWv2kNaldEENeuJXdgAYO8L%2BGNqXzLgQZnRaq7EvLK%2F8Yz%2Fv5h3hgUEsyxjI4GRWgdnKOCOiLqQybFwn2Gvq9ki%2BBU%2Fhm2OV%2FUlqsDBKJul%2FbouP1Kjkd8uRQQDpzzgaa%2F%2BPXQnINCBgS7JS6BC273ZZB3sm5mpnYIruYIOXVzQHAzopd%2FQynLNePgXKL06vUEUYCsdDJQIGjc%2FuTCQjnykCgZH8WCGhWyB4x7uhv7lcU9lUPNnecmkzu5569VgABG%2BTjudfHBxam0rnNIN6%2BREKg6BDDGndGeUSFmJRQPqSCeBYMMTtts8GOqUBmCF3RCwLarKBDHjO25VUnOSDJ531e%2FuMNBK5ul3N0uxYRYp3ssbTp%2FjG5Jjqm4XIsfVH5w1ygF1VhORpESlhrypyOokTxfr4DNjOpHCv0PccKmVRaaDQlQ60h77ErBS9ZnLDozMZ23i341%2Fx9p8PcQeJ1Qk6bQzQPa98AnmPi8ZRC8hzbirKTj6bM4OekYHraLNmRQwH3X4BMnSFa6YMheB68a6C&X-Amz-Signature=58d104b3a799def85bb9ed1f668e40a1e927471d25d83a8b1fad4fc8fc4ae07a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VX4FLLXC%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T112905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB8U8n9wGAAyh5ZX5wlBuI1%2BUDuNQT2KJRkerc81bVWEAiAYW21gzpnWGDxx%2Fz9OHIwaJpp7%2FEa5eSvbjU7ZEuE9DCqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMqv6PR%2F4ikBM0BUPzKtwDuHYXEgxm67rOuqJktJTjY%2Fb8acT1SL5cnj9yF9cyghRy4sP6sIeCe9fcTKz1jr3NJAuUrnhDA8AQ3vXIFUrT21PrN8VZonTv4FRuQC1GTpjl%2BTUkRhj6YBWmlZYaW2kvHiev2Zz%2FI3Fsw1wClnzT2soTazcj%2BRQxITNcgNZIbFXDqbEm8pQN9d28iqox2TwOiHrZCCz%2FYDvzS%2BxuAHhEg%2BIkH31apK833p1VGDWyJ%2F4bVYJ%2BUOiZjU0RVSVb%2BSyZRmRRTGfZyvyeMtRgUzAshtce8avOxb0HbuohECmbm2R9aMK7Kre7vyLy%2Fw%2B0X%2BMwOzQ9j37QbBnZFC4WYO4pnHwu3aYSKKkHcDnPTxhRpk4U151GihrWHwMrK%2FL8e4%2BsR2k5HglD9RhLQ8lp0HLOFMkStJrm%2BElbYMZU%2FXNgul63a%2B%2BVdCcIAXWthtWdacF%2Bhv9z7xtN%2FDmGvAckaiM%2B1ZXW7ulDw2DxWxnjivdh2reJNXcL76vMjnJDwi4%2B4QxrggRRPMUdA8STNQ1nryX1jrsiUcTkTbJ7ew2A9SFW8YsmRBEwbQGunvuQjU8R0PV8TZjY7uIq2WSkQ2mknBW9CXSjMuEdeXtJOC10U2MqW99xZ54X2r3VthtsYmQwlNq2zwY6pgFtsb5kS4StJrp6c%2B26cIyg3byHXTygpz%2FQwua8L3LpPWud5SHbAHgZlxBRHC%2Fi971oSE9POILCFc44IY3QgFmyNTqJ6N403MuNdwHPRq4J4A0vSFsLvykKb4GUwFUjB4O7Z%2FdZvV0F2WNPGH1Zq%2FQNMxTKvDChdNxOO1qIPkGfa8Qt0Rx7fEc0oWJHCTbW0LIvg9eWIQNGnAnpagBx7gTklG7toiyx&X-Amz-Signature=2f3d7887314d8bf1662e3c34ff2db3f03d30792aca5b97a63b49bc8247c873c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMNJ6LKR%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T112905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBKUSRaENGZrfvze5bhuBoxL8ncdgUspVhwXovP8Wj6lAiEA%2Fmregfj5yNRxdO%2BPNyKWoGwDKbYo9Da8kZZB12XkQRQqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMvDNmuALb4ZAyNWXyrcA1oJm5RRxxjbr9nQ7aa2HPPeoQi3qlTumSiCsejagDUhotjfBzawDCB2nWg5AAWG85NJ7v148FszRx5NXL48yFaL7jZTx2%2BYfPD8%2By1fUWBP0%2FX3nqw3Gam%2BOcefJsXp6vjkiNGK1TUNb29%2Fbi4FFQYWaEhPMGH2INXb9rETQm2fbsRkCpcFodugXtwF%2FGqh6L1zAY2TnhFPO27st91v69G3hOQE97WXac3fu2oi%2BFqzS%2FcX%2FlOtagsfuz1Rn3zeZqTDzSuXIwQRLC5L7so6jEbIBAfoSDcvLscIZvAldS4tXZ9g61EM6Q08iHr19i2Hmia1qjBAY8pZWqwqCWcA32F7Wz4%2FuN896SNVornlPKRfA2kmdIaEqS7TdWpIntjTh2G8Xzx25KSq5ltVzSAR9BQiSFa9UCrfqfqpaF0cxxki1T7ixunewPo9h9izUIDY1dWhjyugev1P2GQz32uhS4yMOGfbQQKlYXMNcq6gKfCoE3r7aj3dgUAIKjKba%2FkbiiiC6eegjowTRjvEeV8Vwcn79QQLnT91dEqXCdA9WTPPszmKiTIozY6hLRjDvBkdHBmPP%2BzvAL0%2BDz7qNZNp7Xs2tAgp2FQMdTg8BK76zzkE2M2L1sed82870y21MInats8GOqUBgswmm1OUCukxQZ62s3%2FVJ4q5R%2BFrnPa1ZmYzR8b7PVw0pwiW%2F6UGga%2BRj2ejD3VXFP5iFQ8LT61YPOKy60EJs43rlzXVCebfAz9gIfA3crU3tytsByFegPGcsdm9PXw313Ztn8kLD306vronxA9SGP%2Forrn%2FRSeXnXXOhlMwVZVsKfd36vgyjm%2F9aojvLuqL%2F3dFj3xp6rZzlPJPT8eKIZ2TCYTR&X-Amz-Signature=a88f1c479fb1c7ae25b51ad4c55239638e2e4820e7b23265055dc7b73d55d37b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SVJH4LV%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T112906Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFlq9ruJMsz8bDH%2B%2Fh04Bw6%2BbNX2UJKuAuSYvorfmvT0AiBGGA8QHDsKMjziZIsxdU77J8QFZnTCJnVVixq38iOxYyqIBAir%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM0XO0fNR%2Fu8fsqE%2B%2FKtwDMmRcu2An%2FJclNJK2h9h9mEwyAM1dmMZwPPeXPkrXPvgC0WHclMyN%2BGnhWobLzSUEoFkI%2F1yI5spTkFKKE8HCreos6goipLG53vCrQSHXoeWtU8DVO8kW7%2BjZJYguZIom1Q8iEco%2FUxBUDr8DIH9btKXIqPd7Cg5dUQ%2BOXmeW%2F%2FPtuiz%2Bf%2FCy%2BvHzyPxDM9FAq7%2FG9Nz7pSJxEEzqLoUnYUofUQ39frz8LWqx%2BA%2BwMWvbGI2WqG7CAPxoQNUootb87W4%2FvJQPv4ZaYSJZN4GzBBzwY3MdcUx2c4WxYeT106s4Hk%2F%2FS3VRfgsgBgwFittcJr5JVwkKId%2BPkGq%2Bg2%2FhzvOCb1RwS5t%2B76FJjdAh31UrkcgkK6GUY7gzWO5%2FfX4n%2FU0sd1XnPQIH482cRlpPD1LNfLQCK%2B8J61raXmUdLeAzIFdcUB8JTWW55mDXRCh5r8Oy1acpYbBCAIpUTrFBY8YXoVg%2FZxT3HCGf12G%2B%2B2tsai0nxWrHD0JP6wqTUPyosaT5T4jtUK3fDIB6RMHi%2FZex3AD90OCJLSs98qLp4ves8MpTw6IKuwqZKLVV9c0R6lX4%2FaoAvUOvSSc9AhQbCARmhlIvfFQ20gITsD4L6WJKbRUO0%2FDkSM8PBbQwnrm3zwY6pgEYm68yclR%2FqWfq60lzXdLbOA%2FeG7mmm%2FHavi4I4yR86kr%2B%2BMMHoLKb4i2BIfdHkBLXPkwFzWham8%2FZ3T521CCkTHev7Txursm6ehzXffeKrSrJC5pnqvcWvfRqT2v6VX6J86U50e6R6ICLz8TR0gwg1EHaHUtbojmCehSjZhEUiRlCr9G8SzHj6MFmFmGzUhSnWPCiCWQMp%2F3tfdzWPv7htHugebCe&X-Amz-Signature=b355c9531bba1399009c23b3e8d1cedb6f42c20545c53880466b04d8223793dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USRYE6YT%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T112907Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEnTdsVhLHTCp%2FrKs40Lky1OPwuXhkbj01mvGOSn1KHSAiAROm71PgcT4hj9tZDzOTtX0UZfIfpEzDaryCsn7btLWCqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRBZ4x1BshpNLytKZKtwDl6sTdXRXxSPKqJ6rGdCJEvq0VxKa8jTxeaK%2FGRIs1cQFp%2BzPU%2BLZ%2BUlHciUzDeMYGg43CnTeyGqD76eRNpUfCcDTcg%2BnhRa0OjAg9J9U1fXTIe12NM%2BRkc6NVNAwYag7DNWXYBEuS3h303Il7VRovfigAxzatPg9WM1XSflgpet2PVnuyzDbxl2gSH%2FKUI7A4gO9OG0vdeLX%2Fg3m3bjEO8Ajc1GICeacsiN9esfdGlfVWAw4rlparbiGvamyJ%2FsNdXgMrkW59OekeO1gcVsgIRL3lbzKIMlts7YpQVWLa7Ngp4pFJhYfQBpoDkqLASzeR7CQNyIP%2B3vL0Go9%2BLgNThiG5eB%2FKiLK2PBSGzkx7G%2B3qId18gIft9bzieOpQ4wWJtheIfZ13n2%2Bc1IPilZ%2BMY02%2F5W1IcURS%2FCE%2BOP8ikBIRw%2FPG9XesJJ0by6UZYyJNUiaPkdhotJM8I5MOImQMfKwwEz6lt%2FsTKQYcwiwhb8nqs859qdo6SHbBLDfhYu%2FxixyDhL6JyWXYhO8KB52PIKLXCJnv4mElZDRKTEucmxyAVqsnESooGHSUwWcm4U4A5d4569ixK4j2OeuKcJhFE4QuOIh6VJPpYcm6%2Fny9%2BrYEGhK14cNpOPvAY8w%2Fdm2zwY6pgG3qkoIfZa2yjJZdD1DUGtqMwGFjRc%2B3f0gN9e91%2FesGp97r85tAUQndK4VWhthY8cTDM%2FRKjZscx1D0H7jPG6ZzcX4BpSqePDT%2F4QwQelhC3%2BnKguIULv7lx7i6iEJZNtLx%2F4mRPo8P2XOIyZtywuOr9Ebc8nSxmnm4h1RtW6knpboy9%2Ff5AS2kMVsNjurCU1utCm%2FnXCcSnDxNsmWGdSoyR1gfvGg&X-Amz-Signature=d32bd819db4f18ff0346d2c1aefec1160aee46781102769d5e524f6d35053eda&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USRYE6YT%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T112907Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEnTdsVhLHTCp%2FrKs40Lky1OPwuXhkbj01mvGOSn1KHSAiAROm71PgcT4hj9tZDzOTtX0UZfIfpEzDaryCsn7btLWCqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRBZ4x1BshpNLytKZKtwDl6sTdXRXxSPKqJ6rGdCJEvq0VxKa8jTxeaK%2FGRIs1cQFp%2BzPU%2BLZ%2BUlHciUzDeMYGg43CnTeyGqD76eRNpUfCcDTcg%2BnhRa0OjAg9J9U1fXTIe12NM%2BRkc6NVNAwYag7DNWXYBEuS3h303Il7VRovfigAxzatPg9WM1XSflgpet2PVnuyzDbxl2gSH%2FKUI7A4gO9OG0vdeLX%2Fg3m3bjEO8Ajc1GICeacsiN9esfdGlfVWAw4rlparbiGvamyJ%2FsNdXgMrkW59OekeO1gcVsgIRL3lbzKIMlts7YpQVWLa7Ngp4pFJhYfQBpoDkqLASzeR7CQNyIP%2B3vL0Go9%2BLgNThiG5eB%2FKiLK2PBSGzkx7G%2B3qId18gIft9bzieOpQ4wWJtheIfZ13n2%2Bc1IPilZ%2BMY02%2F5W1IcURS%2FCE%2BOP8ikBIRw%2FPG9XesJJ0by6UZYyJNUiaPkdhotJM8I5MOImQMfKwwEz6lt%2FsTKQYcwiwhb8nqs859qdo6SHbBLDfhYu%2FxixyDhL6JyWXYhO8KB52PIKLXCJnv4mElZDRKTEucmxyAVqsnESooGHSUwWcm4U4A5d4569ixK4j2OeuKcJhFE4QuOIh6VJPpYcm6%2Fny9%2BrYEGhK14cNpOPvAY8w%2Fdm2zwY6pgG3qkoIfZa2yjJZdD1DUGtqMwGFjRc%2B3f0gN9e91%2FesGp97r85tAUQndK4VWhthY8cTDM%2FRKjZscx1D0H7jPG6ZzcX4BpSqePDT%2F4QwQelhC3%2BnKguIULv7lx7i6iEJZNtLx%2F4mRPo8P2XOIyZtywuOr9Ebc8nSxmnm4h1RtW6knpboy9%2Ff5AS2kMVsNjurCU1utCm%2FnXCcSnDxNsmWGdSoyR1gfvGg&X-Amz-Signature=4b950904720429c2e890c7b4a13ff601a8529e88feef36095d4f1eae4a5e2100&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWNPE5UP%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T112902Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDQdyQs1qST4rxtPIbZtuzaka4uZZcYat%2F4QrLtCHE94wIgJLOMlQ%2B2YkmWwGThIjRobYL1xfV0QqCRNAY5FvkOxRwqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAbWvqL3CPzziS%2B9ByrcAxLt3cQhyyTJVsb%2FSZfEO%2FUqleT%2FGQQ%2FIfbQtvie4lYAglhEutDrgWv13OU7Oca3YujEEAwgr1sZgGszAoy%2FB%2BMTiKWJKEX9GL03t9gY4GZZmsCzvRChJTadnpm6JXxFMWEPhMK06daP6EyGFP0QDVakDKlZrxBQcKALAtEvH6xLjV7bVxvNoABcvOlWGLElz8E7RlU1E0xMR4e2WNyraUdGA9BcY7JXqOEKHTrqKIfvyBtDZqOaAx7uECcG%2F84wi%2FwLpyccUFUNmip90L2uDM0iYEiluwQxej8UCx2wMQZtCA1FX4EjU1y2Vg4RVNFuRJ11uGdoya5DITml%2F9301dp1vxd%2FwGCJf6%2Fqe9jK662xyDWmItudqmaRq%2Fp9OHDvEI%2FdxoznYpH0l%2FPpwoy59FKwfec7Hc3kQss1QSkQusfk3f0AF8%2F1T0z8e3RymNunx1Ml0qtMBVF%2FfEHDrPKxaF7xwclCAcyT5loPLL7dBD7mk3nnfRuRd1zEcXY3JwFa6yT2SdHjsv8oKwOuRDMfzTfJKtenXcqmHgYsYw665LRJAIHdS06P0omvZ3g44r3swcPmek6rZGiftI2gvkEx2bIWp20n0zuvPNjT4jCRTivm5lgknavktU560ZP7MNXbts8GOqUBpHaciPmFhqAld%2BGEsf%2FtMbZ9HO2fxPjZgi6p8cH2xdikQjyINt1x%2FiWSB3RKPTZghfPv14uQZ0KmnntNFvL4gGKR%2BPO0XApcLiXDcB8%2BP5huPM5ai06XnQxCgCaFqJuEoMNTNbzF9NGrUXJOJTlqHte7fiBE3ojjAwEcKRuk7trUC7KksDoFc4MSnevGL7%2BW9QGiCfWP0kEi%2FiFhX5FBVoZ14SS6&X-Amz-Signature=0b657432b46a100a938114c662db43c7da051a684f2173b94f162c89ed6973f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662LRLMQ2L%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T112909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGLsmxwU5uYGZRw5TZUeIfoSA7vDx9x%2BKSxBm%2B%2Bp21GEAiEAmMXH88qgRG%2F2irw9tbIBiNapqXnMvCWOrsKGdpgpi%2BsqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHlJcNiAQvKfZtxqyircAybgx%2FSKJKLSjGO%2FjtXeid4O%2BQvDSezdc4t555iBu7qY8fKghuH3C8P%2Fuf3KtcJu1Knn43CFwiHr%2Bg14nuXSee%2BtCuGg0mgeOKkQKSlmRyNqIzdwIIvFpanoDQcgxxvBrnABizxhULPvj5Qim%2Fhg6Huub%2FM4NFYN%2FFneYhEL2CeXGiLDEVM5u%2FVMwP32QWqr7EiU%2F0ROUkdHJfxDG3JsQP6uXTtRsDqkpoB1w2dimdtECJAcbGl9iV5EI%2BtrHb8rtkXB3rWpLWHhY%2Bdf1agppw8dSrp59kp7Wi9mdRghkaQ5sxeM9PjLtjcqb2LVuuPh0fO%2FypUcaJ6qxXFNHPzcfp9rzGpo4EGxeDYAqIJ8FjHqaAPya9Z0PZk8897wIO5%2B3KZO6MRK4ojTRk40c45HYhKAcxHp1NYMElbA%2Br0BD6YD6URvfhQFOfg7lnExHK4vf0f%2BM8mZIX6G8Ny2RzwaHVyEt9UK9HHlCN9YFiLIo4Trv3C7oM8BrTafxl8ckrVnLQQKkYJDOgDzgWb7Btmsg7jBM88BBpBqXV7kzhbWZacX9G6mw7Ibv%2Fz%2FmEcucqrv4MLEUHafKsVI2c3QI5K5%2BlvAsx%2BtBYoTl6JaDlcMKK6ZUDzzkiAaD3PMaVdOMInats8GOqUBjP7sBB%2FqSUBvAPCGRINRL0ohBxYY65yFrp2%2Bic%2FOEQlQiqnVXSZFWi9fu%2BckhCXjdaoc7QhLi4GWWNhnJAZzPD11FSqrqNlkUwuVEpVy3chZd5tQTH26UwaSnXtvZLjU1pMbbpahz9DaVPW3zsJlyTzPQ%2FXOdurgQBWYVxIujg06twDv7zpam6xd9CUNXcDrUMJ9yI0KeWI5mfPU4jccynM4PPDZ&X-Amz-Signature=535e095f68c9fbbd3a65e89061b3e776fa1657df0608d9da2ccec4e8aca64da9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662LRLMQ2L%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T112909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGLsmxwU5uYGZRw5TZUeIfoSA7vDx9x%2BKSxBm%2B%2Bp21GEAiEAmMXH88qgRG%2F2irw9tbIBiNapqXnMvCWOrsKGdpgpi%2BsqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHlJcNiAQvKfZtxqyircAybgx%2FSKJKLSjGO%2FjtXeid4O%2BQvDSezdc4t555iBu7qY8fKghuH3C8P%2Fuf3KtcJu1Knn43CFwiHr%2Bg14nuXSee%2BtCuGg0mgeOKkQKSlmRyNqIzdwIIvFpanoDQcgxxvBrnABizxhULPvj5Qim%2Fhg6Huub%2FM4NFYN%2FFneYhEL2CeXGiLDEVM5u%2FVMwP32QWqr7EiU%2F0ROUkdHJfxDG3JsQP6uXTtRsDqkpoB1w2dimdtECJAcbGl9iV5EI%2BtrHb8rtkXB3rWpLWHhY%2Bdf1agppw8dSrp59kp7Wi9mdRghkaQ5sxeM9PjLtjcqb2LVuuPh0fO%2FypUcaJ6qxXFNHPzcfp9rzGpo4EGxeDYAqIJ8FjHqaAPya9Z0PZk8897wIO5%2B3KZO6MRK4ojTRk40c45HYhKAcxHp1NYMElbA%2Br0BD6YD6URvfhQFOfg7lnExHK4vf0f%2BM8mZIX6G8Ny2RzwaHVyEt9UK9HHlCN9YFiLIo4Trv3C7oM8BrTafxl8ckrVnLQQKkYJDOgDzgWb7Btmsg7jBM88BBpBqXV7kzhbWZacX9G6mw7Ibv%2Fz%2FmEcucqrv4MLEUHafKsVI2c3QI5K5%2BlvAsx%2BtBYoTl6JaDlcMKK6ZUDzzkiAaD3PMaVdOMInats8GOqUBjP7sBB%2FqSUBvAPCGRINRL0ohBxYY65yFrp2%2Bic%2FOEQlQiqnVXSZFWi9fu%2BckhCXjdaoc7QhLi4GWWNhnJAZzPD11FSqrqNlkUwuVEpVy3chZd5tQTH26UwaSnXtvZLjU1pMbbpahz9DaVPW3zsJlyTzPQ%2FXOdurgQBWYVxIujg06twDv7zpam6xd9CUNXcDrUMJ9yI0KeWI5mfPU4jccynM4PPDZ&X-Amz-Signature=535e095f68c9fbbd3a65e89061b3e776fa1657df0608d9da2ccec4e8aca64da9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DALM7XF%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T112909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDMFC2hQaxFbDYzva8wptgxpzIYpdGLYVyV002tEikNoAiEAwU6fKKFXxQJeLN2ii8b2KZ0OdaG7BEn5s33ppiqYP5kqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE3OcGX64Y6dAOI2VyrcA7ojAzPB6KIMfgB7kgL7T%2FOi8LJUwvf7qNESibhN6OSxN7ZonGl6XHAgzigjoc0pcUMFkcfD9WxK3tSGhpKRnwuTwi0BDz8HDc%2BqQRZF7ZxHcnSB5MJPAMb70fVxStv4OCrY6OT5lGFdlyzCWV5eNU%2B4ngvTZqp9vYk3KJdWTLBCpik5VygLXr0%2BJ1pNpO%2BjRIEvc87N%2FtK20TAuzdCvWWTTmGlZkdGGPkN1m9rKBGxHG1HjGRdGXvznk0VqfVdUGKNC8CbyHHXtfUb01rbWWjvvu5WFNnyi8SPO0Nrp6kyK3ZBKp3bcO4HvQTU6NcA4I3fJP1SLeNH5Tgg8AIzZ4zUABAyOSrU1AAmV3Ca%2Fp%2FqCpldRmitgVAmHp4HwAWE3pKe35YfFCWYtjTIU4XCLvY2Zvi%2FKrg7JrQEzMkceKOT7mQbuoPWzc2yeMc6exSAwAIPmz6wAcHSbGfLvInltN%2F51zX7BayQ33%2Fy2qEkeKuPmmO458mYfIXOS9WQtXR34DwiAFSUN4Qr3FtPvUQAkVlN%2BnihpCINsijrtwziPMACNb%2Bv1imbIWJN%2F0PrtWksrbru9L68JY3Yb2qEbbCW%2BmS2oQetCLC3N2nUfvQVPzjSzmFFH2liwC%2FmawGlkML3bts8GOqUB2%2FsApOaLfdshKOyVsCI33wBEqzJa2RzfUFM3KDWMmbFXITRd17iAADEWIqrWSjqwXS27XvARfN%2BJsczWnAuvf%2FD6oXsIQkzNOstqpTSeQyeDoZOfD4R7tz6BIYiR4xNcSJwvHFaFXttuGiD%2BkrcXXKm64KAkrtGYAELuk2toe8C6t8LWKxkaxSpeCab1d%2FNinjucbCAG4i9U4gT0NuJzUckZ6E91&X-Amz-Signature=477d56fe7e59899382ef9b9f1c592745ccda08dd799b587548e5c65479026879&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

