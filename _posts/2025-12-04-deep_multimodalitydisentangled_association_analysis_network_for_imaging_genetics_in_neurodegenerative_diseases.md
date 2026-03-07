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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632N766JT%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T081433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCXVzLXdlc3QtMiJHMEUCIBlyULlmbb%2B2KNVR4YaCX5aDX8uqsMo0LN8OM4FDgx1AAiEAme2jyvx53F4VXyB2mLJ4TYMAeeHOPP0ynNxI7Rq9z%2FIqiAQI%2BP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKlOGAcGHRbHycUiHyrcAzpugVneyXlfh0XuOF9mCjMbi31kAaGoRBUaDIq95T3XPCly6dxOk7XLROgTRG4EuQEhy5O5wMBPpwd%2FRqM9gYclZATc%2Fk0p8m1A2ceNewYLWQRyl0Yo4ebU5tyo4ziG7kgP0R1gXkalOLAhLT91exAE8RMelesuBSZoB1%2FA6oSRkUcrt%2FuA%2FwR%2BT8oGKyiM0LKNxTOI2DMEiSQ0zrW6UKpW8GUQZQy5YrtV7I5GEg12sUsXesdkFiH6Ix0DREEuJ76dXS6QnbXiN1ors0MDmCMuzhS1CSrWkRJTAs6LjOd3Nzv5ofdC%2BRgX0QhqGtfIpR6rJupWlc5jjeYZD71f%2FXzgQ9ChtG2XrWcoTa8XCcl4lf4WU9n%2BLlg1n4LdSEVma4BCY0RLBbcL7C9NZjlOxBqt1iQ6hjb%2Buma9FmYC1Ei3Ve0cDGSbcjODQ50LjBVUtKUMFggYTqOaQQpib2xgXWoSP2rvh6IC%2Fm%2B1%2BiQyfUwPjXElDB9Oe5KTCBXqgz3xCdrqFE3g3Sfk%2BF0KMz4bz%2BdYtT%2FSpExWNPWT9nJ%2BG2%2FNptnM5vLsjdPAXRZu%2ByCWUmgz1YCshwE5KpiBWJs7h248oVozuT89mjn0T6EKL1m1c6dG%2BGqsvVfTgJhqMIKXr80GOqUBU8bBSCTKfkZXibFBMOd34LAyXSSlUtG3eInmWm5BsCniy9MQaRk4Z76KciFwTDeVGMWEYU6wB%2FmkuzXoq543K8kXJ%2Bw7BZxTaz9VpCppV5a8mBoGBFkvIiDuroVvk%2FQmZESmr%2FVto2SHon%2F8MlFQjuepgdh2VeyDVmxftA2UjCqEiZcp%2FpgfU%2FD1MdGEDQsB7ncvXBdXeU%2FbOq%2FQZ01NQ0LBgEQZ&X-Amz-Signature=b84136228657752c9a11c3672f519648a1b96bf9d0db7e2b345a784f6f776573&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632N766JT%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T081433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCXVzLXdlc3QtMiJHMEUCIBlyULlmbb%2B2KNVR4YaCX5aDX8uqsMo0LN8OM4FDgx1AAiEAme2jyvx53F4VXyB2mLJ4TYMAeeHOPP0ynNxI7Rq9z%2FIqiAQI%2BP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKlOGAcGHRbHycUiHyrcAzpugVneyXlfh0XuOF9mCjMbi31kAaGoRBUaDIq95T3XPCly6dxOk7XLROgTRG4EuQEhy5O5wMBPpwd%2FRqM9gYclZATc%2Fk0p8m1A2ceNewYLWQRyl0Yo4ebU5tyo4ziG7kgP0R1gXkalOLAhLT91exAE8RMelesuBSZoB1%2FA6oSRkUcrt%2FuA%2FwR%2BT8oGKyiM0LKNxTOI2DMEiSQ0zrW6UKpW8GUQZQy5YrtV7I5GEg12sUsXesdkFiH6Ix0DREEuJ76dXS6QnbXiN1ors0MDmCMuzhS1CSrWkRJTAs6LjOd3Nzv5ofdC%2BRgX0QhqGtfIpR6rJupWlc5jjeYZD71f%2FXzgQ9ChtG2XrWcoTa8XCcl4lf4WU9n%2BLlg1n4LdSEVma4BCY0RLBbcL7C9NZjlOxBqt1iQ6hjb%2Buma9FmYC1Ei3Ve0cDGSbcjODQ50LjBVUtKUMFggYTqOaQQpib2xgXWoSP2rvh6IC%2Fm%2B1%2BiQyfUwPjXElDB9Oe5KTCBXqgz3xCdrqFE3g3Sfk%2BF0KMz4bz%2BdYtT%2FSpExWNPWT9nJ%2BG2%2FNptnM5vLsjdPAXRZu%2ByCWUmgz1YCshwE5KpiBWJs7h248oVozuT89mjn0T6EKL1m1c6dG%2BGqsvVfTgJhqMIKXr80GOqUBU8bBSCTKfkZXibFBMOd34LAyXSSlUtG3eInmWm5BsCniy9MQaRk4Z76KciFwTDeVGMWEYU6wB%2FmkuzXoq543K8kXJ%2Bw7BZxTaz9VpCppV5a8mBoGBFkvIiDuroVvk%2FQmZESmr%2FVto2SHon%2F8MlFQjuepgdh2VeyDVmxftA2UjCqEiZcp%2FpgfU%2FD1MdGEDQsB7ncvXBdXeU%2FbOq%2FQZ01NQ0LBgEQZ&X-Amz-Signature=b84136228657752c9a11c3672f519648a1b96bf9d0db7e2b345a784f6f776573&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665X5A5X6G%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T081435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCXVzLXdlc3QtMiJHMEUCIQCZoZV%2BV2%2BsBcZ7PFXIyBH1HSeEaP4ECW1OYVGbubq4jAIgCvGOL1zfK%2BSedeE6RLd73DFrNBYA79NmDWY%2BqC3wemUqiAQI%2BP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBsBJEITCylWYFKTWircA6BGWcDNA%2FRspUfvkWbmwEfDCcq2Ds3YVFbvd7mWRm5huNnDvaDBbFe254G3r9M43lxnHyj7xipovrvth5cmxAOH2hC8dSiH5AhQTz3mXH59mq2Q9zHl7ZBOddHeRgXtLME91ZkxDHZcfN2Sc7nrEURdcFMmyZh1hxtLpYGruGjh%2BEX1dQUdKvQ%2Fvcf0lMOrt9Ix3%2BFQgFTljMWQmrL31WvVxADNQTgaW5jzu068iJmvw6NAwiwOPWnoIfrrJgmmlao8C9nq57wGe0viNz%2BcIrHzSWLVbv9ToAHnvs94dyn4NCSShZM%2B5MZsa%2BEtqdwc%2BzKLftgydZMmwJvQ5V9bQB%2FHqq1XRiijODlCfWQ%2BRiNd0nICBdZ3rUowfY0Hp6SyUZA6acgR%2Fzsf5tQqKPyum8QGFUFBleZv%2FH2UzEqhuIyWAq6PNdmwYszCaHY%2BFqSJK2HblXiuwsJV6ciUVwhTZYCR%2BhPX1etkRufBbTt03Snlnu%2BLALJOCxrBJcnKQW1GDXRGENPSgtmLU26vvVgfEayq6xH%2F1OezhEknee%2BNG%2FqqA7nTkWn%2B1MWs9bW%2FVsMgneVcsmkxKPqLeqbIoQvnGQ1X16jkRloGDfkunhzVkNKWSEftce16XZMsPVqeMLSXr80GOqUBOzeNhe7Z5Iv5PBMGlILJBHeRx%2FgUWSUiW13OyW2V%2FhA2ZvUKKMRdTe17R9qx6GjSAPUmOTob6%2BvRk%2BM320sRefGQD26HdY7MHufnGTrVe8KEdCNzHiW68S0DQoX%2FhX5xb35oaLfsmDjnl6F%2FzwZ%2BIez%2FBxwG78rC%2F9JX3aujkNjJmSTVMP4zPGrVYd5rTYtTMRAj23XD7o9O3BJMWsYrUEfPDijW&X-Amz-Signature=e7089563885c3e5afbdf36b6e49405d46e68f8069ac12f87d606fb8cc9450329&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSS63BYL%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T081437Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCXVzLXdlc3QtMiJGMEQCIGbmaLjnfR0yOqsEJaipbczBjWKKfi%2BTyfNRBKmQpX3%2BAiB7wBQRqgu8ASvhvEjiNLPoMpmxMc6cMILE0k3Jiw5xNyqIBAj4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM3Vz1dpiZ4nq5Y3WkKtwDBi6DJW9SNsjU3PyBlTYekxwLg5ZG3Nc0Q2nel6xqD2Mn0oYqTvDDYpOUyT7qadkY5LnkijI97Sypv0uSxwdcaEhuDGw7bk6atxEATB0tjUYCEv4lPCPL61bleg%2BWZdBx2weDBPeTu2o1ARSdpDVroLSuvUngOcrVXT80OESLq01l%2BwT5Va4Yksdlo5H6jbXvB042l4Vk7%2BhTE2nGqGcdYJAVWvatGeap7sqZLqHLNNJ1940kD69uNrNtwvjrBdJJAk1tg6ikwAZqWfXuK7VBlYs%2B5cinYy9ancZ%2FMu%2B75MubqkHb4qQsxax9NyUyl5AIuy9CLK%2FOxQSvTiBR95gG99%2F0t37oZIGRrXBxeL4dOhwTioNPPA9wHxIFYMq4gRhYvtgjewkI6E8wUruju9NYbBiKtafRQ%2BjMo%2Bp5rfQzFnTTX3o4qmexqgSh9hwBM%2BFsshjjUSius0DHJ9QlUQDLwd3pk9DXr69xYmEnmDDibDJwCICaOo1HctbELGlwTUNlk4GNXF10vpbiXPHX38JzGl6oI0kvXw%2Bz8ohpl5uMBkrm2wbGv3ZrNnskM5%2BqAEJdVeFHiSHjDHQ0jysx21c5gNuhm4JzJNk6xQ07nSgc5fZNpDsNNcAAQwad29AwgZevzQY6pgGvymNCsF3ifTZGOmFTf8bJJjXvODqCSHQbcyDUkNS7AwFWnjbiXe5jghXkTOiwXW8a7%2BKtKcC1MGuvcJoMwrCsp2R0e%2F2C5CqBfnstEaQUtScCeQY3y6riMCDFAs31EUoL1oVl5B1dja%2B6tBL9bCF1jfZzYJgx7A6E7EkQZbwPv3aLefThbVio8COF%2FZb1K6BUERms%2BeKx9fMB5bQ4t%2BHnltm1LVU%2B&X-Amz-Signature=6f97dca21a747a1efda724d8e4dcfdafe027fa312ee455c185333de2dbf8e8ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSS63BYL%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T081437Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCXVzLXdlc3QtMiJGMEQCIGbmaLjnfR0yOqsEJaipbczBjWKKfi%2BTyfNRBKmQpX3%2BAiB7wBQRqgu8ASvhvEjiNLPoMpmxMc6cMILE0k3Jiw5xNyqIBAj4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM3Vz1dpiZ4nq5Y3WkKtwDBi6DJW9SNsjU3PyBlTYekxwLg5ZG3Nc0Q2nel6xqD2Mn0oYqTvDDYpOUyT7qadkY5LnkijI97Sypv0uSxwdcaEhuDGw7bk6atxEATB0tjUYCEv4lPCPL61bleg%2BWZdBx2weDBPeTu2o1ARSdpDVroLSuvUngOcrVXT80OESLq01l%2BwT5Va4Yksdlo5H6jbXvB042l4Vk7%2BhTE2nGqGcdYJAVWvatGeap7sqZLqHLNNJ1940kD69uNrNtwvjrBdJJAk1tg6ikwAZqWfXuK7VBlYs%2B5cinYy9ancZ%2FMu%2B75MubqkHb4qQsxax9NyUyl5AIuy9CLK%2FOxQSvTiBR95gG99%2F0t37oZIGRrXBxeL4dOhwTioNPPA9wHxIFYMq4gRhYvtgjewkI6E8wUruju9NYbBiKtafRQ%2BjMo%2Bp5rfQzFnTTX3o4qmexqgSh9hwBM%2BFsshjjUSius0DHJ9QlUQDLwd3pk9DXr69xYmEnmDDibDJwCICaOo1HctbELGlwTUNlk4GNXF10vpbiXPHX38JzGl6oI0kvXw%2Bz8ohpl5uMBkrm2wbGv3ZrNnskM5%2BqAEJdVeFHiSHjDHQ0jysx21c5gNuhm4JzJNk6xQ07nSgc5fZNpDsNNcAAQwad29AwgZevzQY6pgGvymNCsF3ifTZGOmFTf8bJJjXvODqCSHQbcyDUkNS7AwFWnjbiXe5jghXkTOiwXW8a7%2BKtKcC1MGuvcJoMwrCsp2R0e%2F2C5CqBfnstEaQUtScCeQY3y6riMCDFAs31EUoL1oVl5B1dja%2B6tBL9bCF1jfZzYJgx7A6E7EkQZbwPv3aLefThbVio8COF%2FZb1K6BUERms%2BeKx9fMB5bQ4t%2BHnltm1LVU%2B&X-Amz-Signature=d95d101400f11487e4288c3e813b7cec536a02480f242b4eb3095e81e292958a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665LGZV7YF%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T081438Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCXVzLXdlc3QtMiJHMEUCICgUs06tH0BHG8SFkXRNaL6Cg3mLig%2BxD%2B8ab1ypQoswAiEA1TB84bETPsPShosDVk%2FwELX42R7073ytnAk8OJYLcooqiAQI%2BP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMsxMwx0xK%2F6%2FnWiJyrcA36EfKC6g1e5bDAhr2BIl%2B2tqv%2Fwykx9eo1AkB7ShvxRgHE4PY7sJPtIpqM5YY9uK5PrwpxeTzOmxK5YYYxmfWZRvANbfcjfNB2PHpEq7SCjZdvqH6okF2mMxygtDCbc90aXT3x0ZGpw38LvOtLP6kBJfg7EiIY7HwmA7TYFyjaWPL3AMCDPnjUReplTxvsNkpotaQ0srt37WUlScLTsH%2B9eWgsKEpP2GjaqB%2FYzRvs%2BtjpAR9E6rdY2mIpEllXbufgjE24e1xkbptwdohX747bS98rnlpZ%2FCWSfNHj7CdYbZYaVlzPz9wl0hZOZBuo8GmUoVP0yRzFPN78lQgV1k7NXJe7RJvVfst7Q5I%2FGWHTPt18FRxyZ61SGDi7pWiQML9wNlw%2BADcJ6cuwUrmGH6VXxTA0NBtUOHd5idMefCand9NoQ4RRHq6sTfjDTeGpHcqQzGnFcu9koeRXqGWp%2FCaE3BQvOd0X0bqtbqz202YSIQePgVFOd2XdsP1vdetre3ntCzxER73yXSX20i%2Bgi4yXJpd1sBGEyeYKENcTYVf8krjxHLIjqID63zNg0pgvEXcJu97qNo2jQSFeRSPykO0MAL%2B8MmLzsvkcDHzPOPt%2BzgrxV1YgWtozEFLGOMNGWr80GOqUBJHRsGCMLThW3PKVns2KY49JUZKZHwxD4gugXrbC3oU71O5XdT3wT251z3cZ8hVHFMUvQwMrqJlxYdpc6sP%2FJNLhwosnTwC2Qa3UEmxNRrQd6WkFG0tMKrhJgtvkbmVgSJzi%2Bz9%2Bgbik0OwgsEKJfDRj1icWo%2Bx%2BQ25Zc3UaaApEeiWX16QbrJgolrgb4aT7v2WQcQfr2hhUoO5YFKDcSjG7KkGLn&X-Amz-Signature=c9b43afbf773604ea2a218f04ca0a06f6f4d3799b3acba352f7672086c19d871&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4CTYWZ6%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T081438Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCXVzLXdlc3QtMiJHMEUCIGwvmmZE1W2NjAvtgokz49FAs%2FEzxxcQtTLO7iQl5aB7AiEAj1LNgHWqTM%2FC1sjEU9SplGecaYdnn3NjJ4r1Y%2FAgRKwqiAQI%2BP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJAOHE3zBFf4qmFEfSrcAyqBwh%2FCxAcqEUuI0vD8r5Zh3Mb%2FSxLrp38qmw5vXBdrbevfdmYONPMDh1BeUUvpm0Bw6LzbPs0VkMqI7IoiQ8d60eLS4AoRmdAztcVW%2F7i1PpC7zL6XFxcRn9zE1tup8FaQT%2F2b0GmFRc2Wafpe8eNwTQetwLFkFLCwTKIi9Yy32ZAbtYDtMFF4wJ475qNX4I9YKNRjfdvPR7VxZPOJERE%2FZoNWMmGrysZ24f18Ij%2BUkQ7U9NE9c1l5XH4szuEUdwn%2BdE0119eezMqg4Oy5BV2cdsBJta67s3GC%2F3JyVBWmetJ8l1RA5Rw5ev%2BthU0W81meL7pvoDYOMEvKOeW1yBO9QGdpIcU%2BhbSzDSrPaSmH3TkG9fGh8xF7giTOREnZ7Hbexb%2BfBqrK4N4IfZZGodUVhlwfvviaePB8cxiOMnp%2FmD8BdGzIniIrT1e69S91j5naFWUggLS9F2E72dTPc%2B6gapBSykbN7OR9cINM2Km4OcQsArGU4yRS%2BohKboTJclQRkfwgEWWZ5k1qrMEQqE9zQGF46jG6Fv706HHq9wHWg1n59jlwgLQLkbpbJ5TtQ%2BI6jUQwJ2WKqohSPHczuju0wsKt55VlQV8WNFM6b741cE6qoPLTU%2BZyFFudMLOXr80GOqUBIAGuyg%2FjcO1ZTdc%2BctmCujLlN7s6Tr3QwHwWVdV3ReZE69XCWNj%2BePFe0RMtwmL0M4WyknvQYvd97pOauQtfn6EfSiLqOztXYJPBt5gXviapXNwlCT8XvVWpoj9D51gcUYSoIxbt%2FxV517HjfcLSa7mteFIFqhcfSTmqefdq8aqFg%2FtgFt3f2c3gi%2FYUkT9%2Fe0vX37t40hF4EiQzshZnREeVqVBc&X-Amz-Signature=a83116dc440fd3580ed6ffa413c2876ced167fd04e2f3309ee94e32f75a9250f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ZTEQUDI%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T081439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCXVzLXdlc3QtMiJGMEQCICYqJMRGbvExRA%2FeZaEdTxKFerx9vNvEa2KBTP6kIzFmAiBghFQHKcX%2BxcDMrx5he1aB5kCDHlG7YXRGgRMcU0TGDCqIBAj4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMAy7TZOrh9%2FciBUYZKtwDnCg0FJJHclS9HLT5%2Bm9K4yvmrMIPVIXqpGogrmz0Yza%2FBOlFD5RJYcG%2BxiBmtitbe8Ke%2Bf8KQiqiE2YNGM3TNpfOjVtivQz39g7KZ7P4z0cPe5uN%2FAwq%2BpS0iuVSt%2BXENlGgU22chEbHAHX2IFE0CNu8nEpTsvFJYeuny%2FaXm0yp6x%2BHeW1EXyiPAbLlh%2BxPmlDPRV0WeRK%2BPgf782w84II5pTBvQOP6zNuhciXI5EHrnbNNAnJ%2BGS0GEh9q6I3RZDCwrUL960SdW535d2X1qFoSTyu6bZYcUrMPmGuBEKJczPXfxUONODrUv2%2Fyyy8xYYgk6UPRaNcdPC6qYZqjc0VLZF%2FDGhZ9PGG%2FazcxKdlrqhwMPtpuTrcTrdaWb4YktHLNpphTuxiDysjlTHeFvSsmSC5U0Y3ZMCwa9hAiZzcwH80uKrRGB6I125CdrlGOEroUtLh%2F68bvtQCifs2D%2FfCPe1KU0IGMv%2Bp4F%2B%2FVj39Zl1oaRvdvwtwporLOEbR7Mo%2FezZaHILjTfqv6QsAoeqS1tAOGipoUW%2FwfSeahI5J2tP%2BgyWL70XdLBDR9ApvEXpTRtkM9SicE7r%2FXqB1Tcg8utea5SFidAbWYkqb9k7IurWJsToF3WoeQ7zcw0ZavzQY6pgGJoW4JSRGzpNSm8IXu3eSb59jhfydmEmUKeRB0%2BsNmHWaLRopGFcXwZWxJEdyGISCQE8%2FJG9aVarrURMW%2BAwcTpKrzyCbVDZ%2BN3q9br5133dny6kGAi%2BVKWbzol%2Bj4PbWbSx8SdLjJJdtrl5XVEr4R4RMWvw3kggKmBZxpW7FBqnqBr5QiIrNFUmR6LIaggcWaagogtFq9F8HwRHgPWMhYXweeRj50&X-Amz-Signature=c4e2bb69eb1ea5097500844a162fc10ec99f8212dcef4fbb3e490587fafbb260&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZMX3SBH%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T081441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCXVzLXdlc3QtMiJHMEUCIADV9gVIDKsnySe2P%2B3vgU84jLSls0imhjDDzog5ccpaAiEAvS5zOVXnUgiZtf7%2Fog1g6Bnvj8GGHcngVEKu5OHzfsgqiAQI%2BP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHTsF33BAedTmtPl1SrcA0jL%2Busoc78X%2FAdRy6Ue7GHKD%2FeORF93kF%2FQmbmcpNdwaL3cL98Djww2%2Fk%2FRdwbJFLv6y7NGH3c3PiMpN6Nbhn4%2BxtjM5vRV8lAfJCkoezOrNx%2Bmjq5vEXBig2nkr%2BAxXJzVDjmxHKbz4N2zz0ft%2Frg0bZjHo%2BTZkKF1ZfoIAP2FKMOfUC2i2CeYkKbB%2FqvHtZI6IMgov0jyCgT0%2FDMLgI9GqhUqucv7swalbDunmmKW9H40WCE5eynZEWfnBLCOWEmqXV%2FhQqUqrfw7hPsKbPwt6UqREbjWFHrFxCDwsl4u73SBUUsAKaNVsHd3GmmvtoeSmaYqZbC4weCUFsshSM6%2BkcGTJ4AmtKCuxm2FALkE8XmMXweCwY5wGgBzCNP5HvxfhUlmTaI7VUABwEhuSI0fSbbogEhx46U%2BSZebOofGuZOdrnATvbrI2%2FM1N3E03OBulT08T12V4HI4ZMPcMSfs05ukKKdPji2xcJh%2FYa7O2%2BYRjwmKj2yeLlMIzlTRVUMK1rxAVhF0iWgamGMgy0BLfgcanrv8umSA0baOS7u8tg9qTw78YNSX8DyCKjAdyTUtKVfKcsomueRzdvlsYrpj3arpe6KwrObe%2BHFRQ8L8S5YhDkwbD9Y2elrpMIGXr80GOqUBqBDREMUl39ud5Js5V2rJNZGkTG7P7azsYwHvBnpPHpZo56GTbVFqs5o%2Fj4Yt7Y4CPlVhQzS4hUypZNBgkR14uFo1Z0R%2FQRINiWSrN%2FzLXkOwPrY5PFWKMQ4ZFY7xrTvNZ76nnOz9cgY6YZhsLGzY4JnFgyVl85mE3HJHYnmIJ7IpGmx3ykiTzpir7rfh0ksEyi%2BccnxDTXM4VXkpvRYNqZPK6JJB&X-Amz-Signature=112ce4a57383d4f040fcea392848ce4f81fcc9dedea6743f0fc8ce17ba882159&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZMX3SBH%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T081441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCXVzLXdlc3QtMiJHMEUCIADV9gVIDKsnySe2P%2B3vgU84jLSls0imhjDDzog5ccpaAiEAvS5zOVXnUgiZtf7%2Fog1g6Bnvj8GGHcngVEKu5OHzfsgqiAQI%2BP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHTsF33BAedTmtPl1SrcA0jL%2Busoc78X%2FAdRy6Ue7GHKD%2FeORF93kF%2FQmbmcpNdwaL3cL98Djww2%2Fk%2FRdwbJFLv6y7NGH3c3PiMpN6Nbhn4%2BxtjM5vRV8lAfJCkoezOrNx%2Bmjq5vEXBig2nkr%2BAxXJzVDjmxHKbz4N2zz0ft%2Frg0bZjHo%2BTZkKF1ZfoIAP2FKMOfUC2i2CeYkKbB%2FqvHtZI6IMgov0jyCgT0%2FDMLgI9GqhUqucv7swalbDunmmKW9H40WCE5eynZEWfnBLCOWEmqXV%2FhQqUqrfw7hPsKbPwt6UqREbjWFHrFxCDwsl4u73SBUUsAKaNVsHd3GmmvtoeSmaYqZbC4weCUFsshSM6%2BkcGTJ4AmtKCuxm2FALkE8XmMXweCwY5wGgBzCNP5HvxfhUlmTaI7VUABwEhuSI0fSbbogEhx46U%2BSZebOofGuZOdrnATvbrI2%2FM1N3E03OBulT08T12V4HI4ZMPcMSfs05ukKKdPji2xcJh%2FYa7O2%2BYRjwmKj2yeLlMIzlTRVUMK1rxAVhF0iWgamGMgy0BLfgcanrv8umSA0baOS7u8tg9qTw78YNSX8DyCKjAdyTUtKVfKcsomueRzdvlsYrpj3arpe6KwrObe%2BHFRQ8L8S5YhDkwbD9Y2elrpMIGXr80GOqUBqBDREMUl39ud5Js5V2rJNZGkTG7P7azsYwHvBnpPHpZo56GTbVFqs5o%2Fj4Yt7Y4CPlVhQzS4hUypZNBgkR14uFo1Z0R%2FQRINiWSrN%2FzLXkOwPrY5PFWKMQ4ZFY7xrTvNZ76nnOz9cgY6YZhsLGzY4JnFgyVl85mE3HJHYnmIJ7IpGmx3ykiTzpir7rfh0ksEyi%2BccnxDTXM4VXkpvRYNqZPK6JJB&X-Amz-Signature=fa5a3f3447357aaf16657265feee7a962f7d6a8e862b9d33b2fe9f3443e60075&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BA4FAPE%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T081431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCXVzLXdlc3QtMiJIMEYCIQDW3j1ImzbNZ2OliMTus1ftIo9znzkUItVLMW6FY7flBQIhALkVgmP2PlNpNL7jXFx%2BEfrtuKcLWsMwHsBvmdli8OhQKogECPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxF0pGKa90%2BQ4c4sIgq3AOAeH7D19XDseqf%2BfK8U%2BQP2eMesE6mK%2BVDaTFcdl2%2FxNAkyaIlzXq6TiqTHXU%2BPVMtlSlpM1s0QyCd8bSeOxhztFCEVn3o4Yz2poPZeXtie3yocbcq%2Bzksaf9qTtCw8TlVc8ndvHYysnIykqP124q%2BZ43RcxDxNg67wM40ba39r%2Ff9%2BgFfjBokp%2BkLzauUQDtHwL9EDr5EuesIeXi%2B3T2O4Sk0UwL%2FfL532vTrn89d6ZmLCuN0nP9X%2Fyh3mn%2B%2FddDbn6RLY9WfQmzizLcm%2F%2BNQegxj8Ppyts3LASCUPlzMupSTtvVH%2Fs4EM221rWSSlnjtUY2eeq6FZhvgz26cwVFmXEhaPDk8C6445JhiNNc5VywxJYxPBY%2FzaLbvQUAih78U%2BSMLvJbn9MdoiSmg8h7VYcJxpIjLScKpyhtbgUE9KQ%2BgP8Mnnz9aJa67SJNn9rOMePiSk%2B2170Xs2%2BfN%2FpsyRCQJxYwKpTh2F8PMZ0xw9uq3cD2v6vsPioIBuyGXI%2F1shedkF9VtSsnRiPaIfBwazbXIBYxl%2Bv%2BOH9l4Xy78llUYZoxfqDZ5r6FlLrGL07AO95BxOPVLfzB0tFAM%2BMbhwfx2MS8oRWzWWK2nYep9jfhv%2FMH%2FDyHgjm7HADCelq%2FNBjqkAQ55XShPUyyCkkNUz9%2FkdtnUWs2QKXU9LopgvjMo5wKYxY2%2BkySICGbFQOHITYQ3SvwIMZTWwQ17xg8jNhtSr%2Ff%2BUnP4Z3sMCK3EzsPns2p8IZR8nI0yFmCF8OKJhSwkeKM0ISzaP2GlbayM4JFIpV7ONfkAf3ON01cNp54c9SD6R5qQhS1zctjPBsImEm3soSnKXOHpZv4%2F75hjGIpK7jnINVAZ&X-Amz-Signature=0313dcb3de81fc4a91bdbda493d5bc301f326d8935c9a3bef18f3002d8100380&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTR4WLER%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T081443Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCXVzLXdlc3QtMiJIMEYCIQDWLO%2BDyKWWsvDrrLwjtV%2F%2BydbIZKIHTwWFjYQB1AIjEgIhAMPen4P3EEZ1v%2FWQ1gfl5k9XvqxNuJefVjojAy2NY28YKogECPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxPqh9UJxzMlQm%2F8eEq3ANPRdi%2BcyXHVSxZ7wTQsJnqkEDnWRBR9wWf8RjlWBJn1nGyR14FZlQCSpacg7VwHDSC3ZB%2BQFuIep20UC9yQPZH3jMrvfaw2YxUpAEnRt9j1WJPN2sL9tYDZMkx245kch15zYExSwygVlvgWiR0F%2FZqAE7q1%2BS%2FADx1QF%2F7kCOXHgb0I7YGWFJDJhklo67vDGm5jmfG%2F7YRnVgMleL6GrXUFoxYQxkISzTSanyzVLZGXl6LWNOn5zEx0jjzZzqOW3doQQD54YX5x0O2BBrZA0z5K0DHEdfMuaURWoFp%2F%2FXdRFSg6kIXzBY%2ByruZRFcBquxt5PQJup%2FeguPNQUvq98jPJHT78BqNQTNlUsdze%2F2SWbAUR1CH%2BaD64bKS1MuUZAf%2BiJcseraYUt0H9usic2cBeBXgvDZNs%2BwNeGRv3MjWHfLbuR%2FB8YwO6P%2Frqu1ht7M1FkkKOx24QuqaoOAkmFc02Bqw5BzeW5FMIFWvCsVMJecHO1QQF0KA3iEiQ6IJSm08aoLPc1bddqDpc7DLxpYjYbIm8I4fSmlIe1s3YUg07rEG16e7CAGj%2FkXxTKXAxzxsA0nYDZaJkdzBWy1Eo9SNkEp7wAG2hgM%2BsJVzoJnRmWUT8xZW%2Ftm96eUxwjDhlq%2FNBjqkATndjKTFZTe6tSNWNpQNASHCm1%2BTUOyYGkRqBXIjkZPp3l8jWlQuesyI39qKlRdiFVeHePcCbD7jUbLu9p0SeExJyeaQaIz1QFVu47nB%2BkxmhFdcN%2BMhiHRGvZpEq4Iqto3xru0jiQAbZCYX6Z3D0A2RHijejQfYaOTGhDvMgy6XlbbjrB3Wzv9MYeNexKbIGIMDXLbXJ2XEhdep%2BQ%2BoyEgO2usq&X-Amz-Signature=0c2e7b5421dd86c2adec05558e384c0defe2fa64f681fbdf1f9f4aa90078c701&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTR4WLER%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T081443Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCXVzLXdlc3QtMiJIMEYCIQDWLO%2BDyKWWsvDrrLwjtV%2F%2BydbIZKIHTwWFjYQB1AIjEgIhAMPen4P3EEZ1v%2FWQ1gfl5k9XvqxNuJefVjojAy2NY28YKogECPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxPqh9UJxzMlQm%2F8eEq3ANPRdi%2BcyXHVSxZ7wTQsJnqkEDnWRBR9wWf8RjlWBJn1nGyR14FZlQCSpacg7VwHDSC3ZB%2BQFuIep20UC9yQPZH3jMrvfaw2YxUpAEnRt9j1WJPN2sL9tYDZMkx245kch15zYExSwygVlvgWiR0F%2FZqAE7q1%2BS%2FADx1QF%2F7kCOXHgb0I7YGWFJDJhklo67vDGm5jmfG%2F7YRnVgMleL6GrXUFoxYQxkISzTSanyzVLZGXl6LWNOn5zEx0jjzZzqOW3doQQD54YX5x0O2BBrZA0z5K0DHEdfMuaURWoFp%2F%2FXdRFSg6kIXzBY%2ByruZRFcBquxt5PQJup%2FeguPNQUvq98jPJHT78BqNQTNlUsdze%2F2SWbAUR1CH%2BaD64bKS1MuUZAf%2BiJcseraYUt0H9usic2cBeBXgvDZNs%2BwNeGRv3MjWHfLbuR%2FB8YwO6P%2Frqu1ht7M1FkkKOx24QuqaoOAkmFc02Bqw5BzeW5FMIFWvCsVMJecHO1QQF0KA3iEiQ6IJSm08aoLPc1bddqDpc7DLxpYjYbIm8I4fSmlIe1s3YUg07rEG16e7CAGj%2FkXxTKXAxzxsA0nYDZaJkdzBWy1Eo9SNkEp7wAG2hgM%2BsJVzoJnRmWUT8xZW%2Ftm96eUxwjDhlq%2FNBjqkATndjKTFZTe6tSNWNpQNASHCm1%2BTUOyYGkRqBXIjkZPp3l8jWlQuesyI39qKlRdiFVeHePcCbD7jUbLu9p0SeExJyeaQaIz1QFVu47nB%2BkxmhFdcN%2BMhiHRGvZpEq4Iqto3xru0jiQAbZCYX6Z3D0A2RHijejQfYaOTGhDvMgy6XlbbjrB3Wzv9MYeNexKbIGIMDXLbXJ2XEhdep%2BQ%2BoyEgO2usq&X-Amz-Signature=0c2e7b5421dd86c2adec05558e384c0defe2fa64f681fbdf1f9f4aa90078c701&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46654JV27NJ%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T081443Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCXVzLXdlc3QtMiJHMEUCIQC3uVxNaRHmpu%2B6raIqdt9RXg%2FSdeH3WZdlBLdhBpHJwwIgIT2%2FL72cjALmdTE9JYWUFuAy3POVBJjKPcG%2FfLWfLgoqiAQI%2BP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDsMc1KBCEciSWPINyrcA86x%2Bxr0yK%2Blx%2FfL7SmXsYNN3j%2F8BFt6Kv66XMyAuIFHZGnQXM%2F1zvcIqmzmIaRVyX2y3PF%2BnxpSgHoEaJkW0Rpyi6TZzGOaxQbkeIY4rTIawu8ErpK7TR1WcLgvZnFaKhlL7pD3q5GG3k4y6ip4zdlnvNBYhC6%2Bf9w4kJOAaRtQUf0Bkaf%2BF%2BKntFR1GEnDO4hqcXPrRi5Ch5asTq57D%2BfJsOYbjiujG1AthlcYTiFXPX3Pj5zO5FzllJHjRcPi9kEtq5Mi9Fi1Tn8A2TH1emakO954%2BuTuL3m4pkn%2Fb4cz7hZ7hj6wyJOVrT61CkGXwA2hXby5iMOX4JtHwdI2q%2Fl8LPgIevquvLnpKy9ZDPxZBcgxwEStyLZR%2BeTrh1at70v0viwwlELzAr1oR7sTJoTHaXDo8wuSVUAk6J5zLBHeNndQzGOD31zRmYCzICjpJF6Nowo2o60ycklaSsn4jDPmMibAYz%2FxhcBUmvet4DR6XLbDCvXol7SUWkn8oGj7O602RP8Twmzy0xfPqQPqK3oV78cPCwIlho2sDUXJkog3eKy2oK78S4KPoF8txVSF49zvemhp58mpppA4M0lRux4m0LYm5Gx6BvdrOypQilTw3smA8PI4fPjX7R4WMNSWr80GOqUBx68ap6AKclMIpCJxCmInvmPeN2jIV6BFvi4vrOhLKcj1E8DxZDO5WB8TzhNIzSC4MdezMLFeKcHblzmLMWbAIVj25RAq42A2ZMdYonItHcv2YTbJWoHRlcK8APXeYTr0JNlnW2XzdL2AkrGRuywO8jMLTwk8XZsl1Lsn6CmUrYUdWdxxXWryy75xHF7FizRSTEVHvxSeVCGXdolC0mbPyhmKQT6K&X-Amz-Signature=5b50558d7733712b0659861a33caf456d3388aa2bd4005436d86570c1ca081b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

