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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VT5GRYR%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T191245Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJIMEYCIQDOoL2XovyFN9RR6twiC1Lhb75qKMLWeKYcKH1rf9UqKAIhAMlHutOGzU518JV%2F6JqfBDOQQnt5OF4itGsD9d8NtXstKogECOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx44tgVuHcIH0%2Bk7S4q3APdFJM28%2FoVQ2NyJtgMb4stgzt3RZiunizEb5ETEXDxT19j4NLfSoL9epcNJaEJ8orttU1EHf7E5c31Dw3pUC9VOvtyeE%2FDAOBu3%2B9EJivSEb0XH5IfggovENDsRUaK%2B5fE1xDH%2BR6%2B4B383OwjMXOvLDintEgB4KGF1uKMfPSHCCGiPhygGggt%2B2a%2FcIPIvi5bXhm5ecBD8kIZku2bo4gnj6gmVFWeuWzVVC%2Bi7Q%2FRkpEvJIK4cREhwfTftyAOWJ8oWIS1BCLB1XLbq8rtVyv2HXe1Q%2Fzv2PaYSj3nEzKVTqC5CSYnB4wEB%2Bt%2FT90qLy2PhMUW9bbIzxGek71IKdlWQJ5a8hgAHxBpnJMaEcg4QWHoUdSU%2BsEuWtnCMgW66i4mlq3bb17MCLP%2B5N%2BA8dmlO4QoxggMIuGFoM8Uy35Qg%2FmWVsBR3DK%2BLKB0ZQd4HCJ%2BpT2nwHlQlWqHkwxqqmkQMZZ3MYcls%2FAuPDPWNvuWuL1HUyCKOTAYLt7wIJch7WnuBHyFbUF1xDKhESynpHxjKiGnOdGV6GHpYuSWZ7SwFBg7RzXXGlsXHFKKA7ISazBcO%2FqQtshMcqYm4zb9L2JRfoEgrk1Wt6z4THrV0nVvE%2FNzM4IRRoaoxgXw1zCO%2BcPPBjqkAayuknegXiu862zHUxLtiASDwkw4unWGFn2hzERnDaDQkwZ2SI2%2FpOX6mbSUamfe%2FhJibW5Xxop%2FXUpBy5NFsdjOqn76TTdVDjRcN6ZtOG%2BNtGfbRInoP7eii8rd%2Bqbg69gVHRdYxYxw5wkY6Gh4GeA0T1JqRu%2BlgcJtY%2B5LYQAvn0Cjl%2Fuf75zm1usG9aaGNIY743S3FoTn4%2F6LNGIRnEERb8VD&X-Amz-Signature=d6ae6fc1549fed5c93c44dcc82902a960339351c29760d361df38d8138b4309c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VT5GRYR%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T191245Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJIMEYCIQDOoL2XovyFN9RR6twiC1Lhb75qKMLWeKYcKH1rf9UqKAIhAMlHutOGzU518JV%2F6JqfBDOQQnt5OF4itGsD9d8NtXstKogECOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx44tgVuHcIH0%2Bk7S4q3APdFJM28%2FoVQ2NyJtgMb4stgzt3RZiunizEb5ETEXDxT19j4NLfSoL9epcNJaEJ8orttU1EHf7E5c31Dw3pUC9VOvtyeE%2FDAOBu3%2B9EJivSEb0XH5IfggovENDsRUaK%2B5fE1xDH%2BR6%2B4B383OwjMXOvLDintEgB4KGF1uKMfPSHCCGiPhygGggt%2B2a%2FcIPIvi5bXhm5ecBD8kIZku2bo4gnj6gmVFWeuWzVVC%2Bi7Q%2FRkpEvJIK4cREhwfTftyAOWJ8oWIS1BCLB1XLbq8rtVyv2HXe1Q%2Fzv2PaYSj3nEzKVTqC5CSYnB4wEB%2Bt%2FT90qLy2PhMUW9bbIzxGek71IKdlWQJ5a8hgAHxBpnJMaEcg4QWHoUdSU%2BsEuWtnCMgW66i4mlq3bb17MCLP%2B5N%2BA8dmlO4QoxggMIuGFoM8Uy35Qg%2FmWVsBR3DK%2BLKB0ZQd4HCJ%2BpT2nwHlQlWqHkwxqqmkQMZZ3MYcls%2FAuPDPWNvuWuL1HUyCKOTAYLt7wIJch7WnuBHyFbUF1xDKhESynpHxjKiGnOdGV6GHpYuSWZ7SwFBg7RzXXGlsXHFKKA7ISazBcO%2FqQtshMcqYm4zb9L2JRfoEgrk1Wt6z4THrV0nVvE%2FNzM4IRRoaoxgXw1zCO%2BcPPBjqkAayuknegXiu862zHUxLtiASDwkw4unWGFn2hzERnDaDQkwZ2SI2%2FpOX6mbSUamfe%2FhJibW5Xxop%2FXUpBy5NFsdjOqn76TTdVDjRcN6ZtOG%2BNtGfbRInoP7eii8rd%2Bqbg69gVHRdYxYxw5wkY6Gh4GeA0T1JqRu%2BlgcJtY%2B5LYQAvn0Cjl%2Fuf75zm1usG9aaGNIY743S3FoTn4%2F6LNGIRnEERb8VD&X-Amz-Signature=d6ae6fc1549fed5c93c44dcc82902a960339351c29760d361df38d8138b4309c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FADVBVM%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T191245Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJIMEYCIQCBz0AgHtx%2FqsoGyCMNPqwO%2BfQQhSwM7cFgnJ9dNE4hHgIhAMDxmyOzbzsHLR4%2Fz7nN0HzHa%2F2qAYpxrqHHLV4UoPPDKogECOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxdJjmC%2BwQVBtv4NI8q3AOAUmPvU0STioVnoMZIW1ykJWnnoGvw9jfigrUO6eTzHeuOOs6pIc4wGnxQfj75f1cZmClPWnnPzWYwGTWho0F8x0GJ8NT0EGghEDPjmPirGKDyKUpB8jyWZNhGXGDWzpBqeR1fedQoIYZ58MIolV%2FBldWNRrgVHmSQV9mz%2FdfeFlIz%2F%2FFv3mzTfzCFzIYeldr0UY5kKeQvT0VnNx5TPoOuMID6mS9pBYnOSzNtDbDpiZRlKhxL3H9qbmtP5uR9GayaysMrq6ECDDxYJXg1HolmYl%2FTXRvGf5s6eZj8pR4fimc6GyF3dWgUtFSO%2Bd0R0MD6USnMpj27VYDbe98Nx%2FE5rGsKy%2BFsYWAZk4sY3oKBD1r4sYeJ8I5F5MGUpAwjrpfM2ObwZJfpgA6G%2BSAcatoP1dqwkdAo%2FiAGoH%2Bwo1IBD9MZcjaKwRD882QNLl%2BnhCkxjypQF7AkfjsZ7rxjE46VJuy5bUJzduULwtNAyDR32OtaprN267rucZKU4piOKsHdVAv8Ut13MgPejcssi2sSBysrHUM5W2jTrE1FaefyS656cchg%2FQd4qPdNu4UW7XTsdgvaxxoktVL8wlCK1W66uI1GTXis4t9hYCcKu2dBBmqTgVvLOv6X0nQU7TDy%2BcPPBjqkAWHY16cXBvRiw6DciWLYZs56AxkYIdERNPvrllEkOXUoRat6C%2B%2BDhEiCcExoFGLzOeOjjuGJdF77%2FFOg4mirJylssSXpTXRrw5GJbqmte%2BDav2Lhds1KVDE5387jQWeT0tNVpwYqqwyBGU0qG4hVyVpydsEu%2B0LTNMvqPi8nAp4jhrUDfDz8gtV635aHQlGiIuKV4KKRBmFzL1ugYWyc1O%2BBdkjk&X-Amz-Signature=33e1d399eb534f0637124848a165f6a53d17b9a9e9ec73eb33222861c23e357d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TO3PHQ3W%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T191246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIH2N5yxRAkCFY3NSScBkKcpZchxvWQVucwsj0C99lnpdAiEAxZi4tvwv2hXt24wgzEVNziyUEihCO7QmXTl8M76izusqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA3ORviwrxJQzGd1cCrcA68vNwAt%2FsggQfiw0KFTObI2IAVrkUaEk4fXk01n6puM6WcvPpYfa9JoRCz0iOtbkT40ZdX%2BY1J1371M3Em15j9R5n17cK8L7z8jk2o8nQYljAh6FdlB132N%2BkVgbNVBCtxcjwKJCRdenXSxAT5z04ahetaG1cRx6nj9YaMX%2FLacfoTUBIj9DNdDUpUm0NMjzPWmGCWVb72ANSAwSnPgzwjGMZEEiSyIWs8Y9Uu0QMxrbC0JCAebE4zXBpejRZ14a92rUhPWXSCN7k0Avf3NwnAGUjXiR%2BPw7G9dlhLgvy6w56dMZ7DbYnM%2FfErpbb7F40uaW%2BVuTYidP%2BbDq%2BeCyP9weZYS8kTzK6fqnn93GQM72%2FrSYZ3iN9fRFUbZMf0RhETXi0TQoDj0U5z%2FWPrhjvjQyEZXjXEZTNVsGFB07cPSoFR32XTLJBkg6q1zDRLjo0NoQDFn%2By%2FnRCKhm6GQTiT3hxOMze0H71UXNA5f657bMm2lMdCUQFIku7luTRxb3w6waKDb35m7mxkOx%2F1LaMSUHmF9LnkdB1hk%2FDXP7L1lUzShrD1DXncGQdLwUGwjidkfRhMErTiCeDpJ8zYf0ebKKIxN%2FOZvy2CWIXkRTP3UaGby4J4s%2BXzFGaYhMOn4w88GOqUBrusp9NSKkhKllqunZbkzZ%2FypaEZj78ixU%2BdV6uKpPnxhxt6bhus67LE55VwwBY56oQikq%2FIG8gpNSghTPvhC7Lg0EtBa2EkOcKyJIuljFiWKYsPM2kOnaOQPsAwC3HX4PbgR4yxnO1IVh4shadMpArBO6%2FXXFeYa6j2FqjcYwgwNO2l2Kuk47Ozw7bqzTXX9xgD5Jb%2B50JaXFkNTKAPqdia6S5SL&X-Amz-Signature=d7943c49675eff658ec7985b070231f74997f52ded77abcc9c1f46d611238b3a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TO3PHQ3W%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T191246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIH2N5yxRAkCFY3NSScBkKcpZchxvWQVucwsj0C99lnpdAiEAxZi4tvwv2hXt24wgzEVNziyUEihCO7QmXTl8M76izusqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA3ORviwrxJQzGd1cCrcA68vNwAt%2FsggQfiw0KFTObI2IAVrkUaEk4fXk01n6puM6WcvPpYfa9JoRCz0iOtbkT40ZdX%2BY1J1371M3Em15j9R5n17cK8L7z8jk2o8nQYljAh6FdlB132N%2BkVgbNVBCtxcjwKJCRdenXSxAT5z04ahetaG1cRx6nj9YaMX%2FLacfoTUBIj9DNdDUpUm0NMjzPWmGCWVb72ANSAwSnPgzwjGMZEEiSyIWs8Y9Uu0QMxrbC0JCAebE4zXBpejRZ14a92rUhPWXSCN7k0Avf3NwnAGUjXiR%2BPw7G9dlhLgvy6w56dMZ7DbYnM%2FfErpbb7F40uaW%2BVuTYidP%2BbDq%2BeCyP9weZYS8kTzK6fqnn93GQM72%2FrSYZ3iN9fRFUbZMf0RhETXi0TQoDj0U5z%2FWPrhjvjQyEZXjXEZTNVsGFB07cPSoFR32XTLJBkg6q1zDRLjo0NoQDFn%2By%2FnRCKhm6GQTiT3hxOMze0H71UXNA5f657bMm2lMdCUQFIku7luTRxb3w6waKDb35m7mxkOx%2F1LaMSUHmF9LnkdB1hk%2FDXP7L1lUzShrD1DXncGQdLwUGwjidkfRhMErTiCeDpJ8zYf0ebKKIxN%2FOZvy2CWIXkRTP3UaGby4J4s%2BXzFGaYhMOn4w88GOqUBrusp9NSKkhKllqunZbkzZ%2FypaEZj78ixU%2BdV6uKpPnxhxt6bhus67LE55VwwBY56oQikq%2FIG8gpNSghTPvhC7Lg0EtBa2EkOcKyJIuljFiWKYsPM2kOnaOQPsAwC3HX4PbgR4yxnO1IVh4shadMpArBO6%2FXXFeYa6j2FqjcYwgwNO2l2Kuk47Ozw7bqzTXX9xgD5Jb%2B50JaXFkNTKAPqdia6S5SL&X-Amz-Signature=fe7863868e7b364eab34ac0039edd4a3c9208bfe9f2ba239df363cc61af89d70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647AAWRBB%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T191247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIFAiwJMI5IHtAlYge150Qg5HIl3j4NoXkGO3740JxZ5hAiEA3z6TKkQ%2FHrmd4e2W0YskpmVZfPTcKr7yMzeGP6oP1GEqiAQI4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKDBHajLwDO%2BZZ0QayrcA9OfmUX75H1hviCPWCoOPyixnTZdZe7lHjxl3nw2lLqXZ4O7FOCDvusRXgk%2FILz1E%2BYofvt%2F6MYkHblkm79%2BFrZDXEGCxMeGKm9reXQbX9qQKP9b61D1vZMCxpsk9GL2wHBj4czX3H%2BPYBDW2ZNRreGT%2BGXKZlps43p7QgYXXeXdjycB6QSVlinTLv5R2VxnjrN%2F%2Fng8EEGhda3m3HluU7BcC7bdV73rWu9ONH0nVi0M15W5ko2QrMav26qkYtka1zUW%2Fi94Ht5HthFf%2FY4S%2Bs4rJKgTon%2B9xcbym%2BHjEOiAPKQUAt6tznH3eIWGpT2WKcrZl4ZTy1Xdej7bIwHwk9UERYypVv5er67kuc3qt69nwubNkv6F2wXiMS%2Bz404mFwaMKceKPIQXa4mfVezDJ3Tb0FZUghZSnqbKfWRDNZtGiS9OjUJV6%2BnQzNsQf7TtSLMftFzWhoZJ57ihA2wURZVmQb3ONn%2BpS%2Fzo9z1wceFZNks6ansuDi4R2AVO0w9BUdKPOJ7zBM7hyujzyZrzvRCACi32tHj7JpmH7e496mUTPMNi07cRt%2BhQJLbAu8%2FuOjV2KFcwFwNEdnuze0Ld2bDd%2FyGmzPkF8kZLk2gXj95a8xHwge5rEy%2FC9WUSMMj3w88GOqUB2V8GGRKgHl9ZVlhPyPt8XeTeDAKTklzn4xS5sGJeP%2FVeguUEnaFNJpqLQefTeMEzzN0WJ55pVHdUTXmKBpXFQZKJKG2wrvCpdMptDQG%2FFcfeRxvBRoGtcc7woHj4NmH0YiKRp4rW5ghHd72Z%2BiXHrHkdcdpmCILbcoPHkk1qzi8A0NBd6HTZV4g3vNlKBd7j9qpGgNx8BSF5Y5%2FAfa8fAmAGrMXE&X-Amz-Signature=0d7fb31ae07f327170ccbd9e26674d5e48de8615ec8bdd517e5e9deb812535fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFCWA2AM%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T191247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJGMEQCIFWrMC6E4%2BBUq1JoP4cDskNnu%2FSwFk0QDGOSm40egLEaAiAPaEABwI7iHJ32UyOUxyvAH69l8YkzMm5rJOgW4OtWySqIBAjj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQxzFtFpJvWhY51YvKtwDSorgEfOe59iklK9U%2BtR3fS1%2BhHqo4BK3Pm9PHk0ps4O%2BwscsWwE%2FRZR9tIm82ThjuiWR%2BmSDp4G%2Fc90rSdDNHSv85JGGZcXrr929DfEzKX0bGqAvS6dMlTM4ih3HLCHBBotoN4y%2FtF2sV3hX0b6HzB0%2BibNkEwB8IduvFH0meA2bHLNZHZYURjjJStRSiN02ZN1CWbkrxerboQQTTEUqPWecDeq3axRSCSLIDydEHFvKM3%2BJ%2FnVL14GamD3KssYHelbE5cj7dRVCL2T%2FtYwBNALpOjKSgzV2YhcZR4B2iY2Ug5gDF9UdZUz%2F%2BKpvMuqM0YYi9tx2Uii2NF0RE1GrItFLXRcZYN%2BbJusjNF6MBwRFS3PngAflzLD2KYZ4v2QUabNemz%2FxeX5jVnDILTXH%2F1yyoo871USwIXznHYu3gi2nEiW2GSZH0jZ3ISnex04RkdUKkdakrzYJIOMgd%2BZRjmG6iKUUy6QTfDeVlxBBvTqOrTfUOXW%2Fq30%2BV79iYNNYvs4qWHpZKSfEj%2FidK6qcSZaeyxVjYsq%2B%2FoPb3wHbA5WMFvoKJPvFmvZg6OGiW35t%2BBFt151Xkq%2BlG0eZ%2FIeLkbEKoNIVfkK3%2BdpBOHNcApK0vH8qa7sVFvfObb4wr%2FfDzwY6pgGrPtv0k0MPyjvDeDrAuIElp%2BcBdj4ABz%2FRh9BCuCaGRquiSBBemgPHbzkfMr7ROgtxc7lg2EFMYnUx6xZpkLF7OUBzfkLvftXJ8ASV8Ml%2FGeAnNF54X9XBjLp3jMWb%2FM7YxJbfyy9GZ%2Bu8RqUy7RMY7BqUSWw%2FI1ToDkmyBH0WBnWqr9Q7yz%2BiKosiJcZb%2BHaUlcDL6r8p%2Bu9SY9mV9S6MX3igS2dA&X-Amz-Signature=db9e4d26bda24ee773fe5d6abf94de1f18b9f4c8df5450c2ad3160a137cae330&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VHWHRAT%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T191247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJIMEYCIQCeZ01rvBVv9iYOCHR9BokU0oIkK%2BykxcD3JfV1O8uojAIhAPMWded3VEHs7eeCw1XPkX3vWpCxOvV9%2BGLTtM10nGxkKogECOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwJ%2F%2B4LLmAOmsFL9scq3AO6%2BMc5v577bLtsDQeJfa2lhllQ6nsxzKVJpBucWz0eu7aKwJL27CNreCAonfHdoy2B2d5LFp6I%2FoJ6u%2B13T8TUmOIsbSSiUyACx2kX0msuiSa0G8SYjOpsN3xmi3rEDRes164UNcKskeRKs4m%2FQDS1jpAjequn8fehkT%2Bx0k%2FBM9dKVCM83feZ%2FrZt0UdvhlFiiB5aQvWcbJhWHsldPo0cAkalWAQ1v%2Fs5YzNzTuHgSESVKNLpyut3MEIA7kMaTytqkwh2RvEneAvaobQmnzVdBgBtgnwDro867z3B4VwLyUupII7FB9jp63KeOy7X0fH55ZGY7c%2BajRtf9wPLBcCG14V5%2B70Yfv8OByz%2BRwXSOg3FpxQKaMrn7rNDHEEMn3mp0ndlZeyYwzsx8%2F8PsDN%2FDrVkterwM6syiQ1VYeZYLUd9sXtgZivxkLTxVPqWGTgXFEq%2BrkMC4Lp2bUAT4rJgbiGsAZSRsljsxbhaeaaDwTnVS%2FT1Rm3ZMkcqenxFSqaeI8t8GvfdfowcqnJ3Tsmv2r%2FI2h5pmK6SE1rmCjoI27XCXY2aqWnqs9qxZt8aJ93G7RNwiceYD1uF9%2FdgHNmKTQDazgbRKFebuCKhGzHLKBxrPAfX4mH6OT8kvjC%2F98PPBjqkAaxkzGwq3%2B2W9uQSy5%2BixT9bRZ6MuXzUVNSbgssPJC%2FKgwJMyPPXZUxBuW1E8oqWNa%2F3mpm%2BaZBfb1Oo8NU9z8Ag1ASETrCamN5mBtTG1lQ0Yq85BXTbgjJhTV5tW0MUfcDXSLhPqBLbZ6Mquj4gVqbhkvU78IAVmfsIwOUzlAPO7GfQybcSamoPNvdPArZeiLcDcLxPE9zm2tbPLUaBsAOoJfEI&X-Amz-Signature=4533b8c6d2d87c34042222614285ab0c2e867711d89810dea9441cb4c5369895&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHQQCMBV%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T191250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJGMEQCIHWD%2BkBiTyLxD75H3EQmCuDzkZMvZaU7pZSxLZZcceZEAiApEpky6BKfwt2cFaOHyZwegDFdel8gJcGlAylXApWMaiqIBAjk%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM4izTB7b5g1Z%2BzC5SKtwDkPeotl6h3DrHsFrPeVF0XA2Fky7lToZrpAWn1BKsXiXVufwqWXutKqR6Ix6cbUfT4IbSJyA4hflYII%2FvFd406nLDa%2BMX%2BLtkYwYpNnHLBnjV84wkeNXHl31CW1SMQUQAwkDjBHTF0X57WFvSwnUiqSnvfIJhzyWwVsnUacV4KvIivDMkYZt7HB%2FYS8vzfuUohdceBdXbn13%2F4hBCSpAPNzd%2BrNq3qq7qP1Ohkj2dXGB6JDGa4DnNUEPEG3VdLpCBRxvAe3vCZESnl1HHCo1yqI5H4BU4nIrPt36VQFvfrMeauIonlIFlsTFyyhmUfrSai3jGit8zLxvqpaLEwHFYPa%2BoFm9SKZd2TsizJEQUIKz5SZqLIKuQRbQW6d4muhxVO%2FB37d88DNA7kHa2hwx3V%2BcpOaP1KGJyiepK9EtjbE%2F0z9yzbrXO%2FlGHFraeo05RMvWRjptaneNyJ4AhMqn5qe3Es69z79R3Gr9IXlM6z59of%2BhR6QI6tBhRRgHzS5rAh6FJtlF0M%2FW3xkHdrvlXPLHm2MT2X2quHCqxA36R00qM34mgNN%2FUIqeQaKSfZucGr6S42lxyhaDKTRF2pRlabxTat%2B88x31Y4C8M0JDn2mUKXur5mvWAEQDUxp8w6%2FjDzwY6pgEfZQsD9wrNN7OQHiATyp%2BQuWgsJ%2FcBzYugSSDPUzyJwJrVRkzjn6N80obpNKbANT4Ow949rO6QlqBtSB1hZ8bCmaNxNrFOAFeXu4bsuFrhwa9IFF80w1IEjBFaksQKEXCPSe5yD3IDecqgTDBryCBJqBKgTf3Cu7GZDJ9%2FH2xq1aVPurN2xnK4mcnLfQgrnmOHjZghdfk1mj81DYpI%2BpVdh58P3rUE&X-Amz-Signature=406def698092601dcab73557fdfb735d954512ddaed11c178dc7166930f4dcb4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHQQCMBV%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T191250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJGMEQCIHWD%2BkBiTyLxD75H3EQmCuDzkZMvZaU7pZSxLZZcceZEAiApEpky6BKfwt2cFaOHyZwegDFdel8gJcGlAylXApWMaiqIBAjk%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM4izTB7b5g1Z%2BzC5SKtwDkPeotl6h3DrHsFrPeVF0XA2Fky7lToZrpAWn1BKsXiXVufwqWXutKqR6Ix6cbUfT4IbSJyA4hflYII%2FvFd406nLDa%2BMX%2BLtkYwYpNnHLBnjV84wkeNXHl31CW1SMQUQAwkDjBHTF0X57WFvSwnUiqSnvfIJhzyWwVsnUacV4KvIivDMkYZt7HB%2FYS8vzfuUohdceBdXbn13%2F4hBCSpAPNzd%2BrNq3qq7qP1Ohkj2dXGB6JDGa4DnNUEPEG3VdLpCBRxvAe3vCZESnl1HHCo1yqI5H4BU4nIrPt36VQFvfrMeauIonlIFlsTFyyhmUfrSai3jGit8zLxvqpaLEwHFYPa%2BoFm9SKZd2TsizJEQUIKz5SZqLIKuQRbQW6d4muhxVO%2FB37d88DNA7kHa2hwx3V%2BcpOaP1KGJyiepK9EtjbE%2F0z9yzbrXO%2FlGHFraeo05RMvWRjptaneNyJ4AhMqn5qe3Es69z79R3Gr9IXlM6z59of%2BhR6QI6tBhRRgHzS5rAh6FJtlF0M%2FW3xkHdrvlXPLHm2MT2X2quHCqxA36R00qM34mgNN%2FUIqeQaKSfZucGr6S42lxyhaDKTRF2pRlabxTat%2B88x31Y4C8M0JDn2mUKXur5mvWAEQDUxp8w6%2FjDzwY6pgEfZQsD9wrNN7OQHiATyp%2BQuWgsJ%2FcBzYugSSDPUzyJwJrVRkzjn6N80obpNKbANT4Ow949rO6QlqBtSB1hZ8bCmaNxNrFOAFeXu4bsuFrhwa9IFF80w1IEjBFaksQKEXCPSe5yD3IDecqgTDBryCBJqBKgTf3Cu7GZDJ9%2FH2xq1aVPurN2xnK4mcnLfQgrnmOHjZghdfk1mj81DYpI%2BpVdh58P3rUE&X-Amz-Signature=3229d0789d57d9ed832022e0cc5083a055ad92ae568bcd97849ee92ef3a1dad8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X77NPWFV%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T191243Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJIMEYCIQCmYk2cs3c49ZsY1obpuhdanE4XbybdEl7NVmYZpqpx%2BgIhALtEWh%2B0VFWak2%2FgfpUIjFF6eckcyhy44dujW6iZLy7DKogECOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwd0C9Sw%2FUxVePtkLoq3AMX4yOhf0CbMqghDDH3uLHbYBnMizw%2FvIxv368ZOz%2FXDqHBjmvfiU2SuQre4kgxP%2Fkctaq9g8ELpfYk6M%2BYaO2YjKS%2B15DTX6Vpu7f8XoFyn3MKHw08b096R3A3umHR35rXuzqEgt8Kl%2BInrCkTl2DE63J%2B6LlooBHSsulcWGpSTWkteWxVRg85r%2FqVmIdsxB6KdZTbUkUayLQLiBvJW%2FtghsDgTlqZaXPFwvBCpOdlJ7OJAtlQWkXMZ9Gio49urs2U3xumaqKdF%2BoU1QZg23RpwbqKc7Eu6gqBVlUzJavZ8G7xlB%2BtoNOqYC9dCgB3S17rpRF1JpK5t6zYGjBLQzGN3yXta8VVKQ512IfRHkTrkY75ebrqRv6274q0U1uXbLASLvPUsS4I4dUUDCduJG%2FPWsweCWD9rb%2FFS1BoT%2B%2B6%2BNej9nht2fiHkz9N0ngZTurT9iV7N9fsSFqJsfTCqM1dZV%2BO5fBisjfe%2BoffpM4vgmZI8nI4d%2FIlfQq7meRhKCCWUh2E0kkSERGZ%2F7Ue0DJQ12IvYObbgPDPrIBanDKIDmh%2FnXGUjdQ4Elq7UxJIPe1DTgCO1fm66nCnCbyvS%2B4b%2BpghhUviZObUaYHgI8NImq8rXqZpuv899KGoQDDA98PPBjqkAZ8t8G0%2BV2JHxQhIrCdDif08b3js7i1GXUOfXpj9oAeSXK7R4s7zKoHWBpyerGF822Uu3z3VKmNdp%2BVm673Eb%2Fnb7360XzBlLjUyRe336mJ4KNn0QBIB%2Bomf%2FjpUtmFCnSXyynDxZBD8uS7xeGgt%2B%2Bfz6l%2FXW4xb9XhUQhgNRsd2qSK0RlrW1YumLobhPV1KSko%2FzTNXla7lIC%2FrvZBcpJ%2Bf4eoQ&X-Amz-Signature=00bb06f029b436371e0100ffe631d8845c48bdb7efbd10e57dd68f64f1e9e0eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WJU5CAOJ%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T191252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIQC8NDAoGiNz1rpB8Q1T4jKUFJjZGr%2FOZsXFqP9EJVgqfQIgXYoZv8TrQrgr7I2veGSqACf1XJE6kv5sWqiJUCXqA0IqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNETZ%2BQtDQBj7O5AKircA5Dj22U%2FcvXqb7JkOgpJyleLtPxDn1ZMtPj9r5KtKnhic5JLjmWmwUdlJNuvEPYON78WYpJTrMRDdsqpa9cqrANYbegDdWFfWraTevRPgIa451E2D%2FuwwlmSBlE2JG4ep6Z8l8Gx50IVTRu68nm1pGVpk8eDRzSno8slxhuHsDihI8y2UA6y%2FhWmO9gFkBq9zg%2Bfbvh2ceB6GNnLpWYyMMB0EHdol9IRDwqddxtWZSqV1%2FGTw2i37YRXVlpK4c3oCImheF4vuw7k73g5sxOU900hFyE6gCtTPy2UPU37R5QBuD0M3YTF1ynXNaBlpp6NPWGm8WEdOSVKuUeEO4HXGAsaa0Z1mom%2FXZHs2312T0s9aMDkFCxP%2FPMufW2b7er0nd64NpmqAhN%2Fxr7YrnO0LVebwdr%2Fb6HQ%2FLxLfCFWYGs1FGyitWz64d320SqQXOqHCH%2B%2F%2Ft2GafUmXfRvvGm8sbQ1meDfEjt73TMYGacm70wRTb1Om329DGjGKebdlgqbLehZv25Lxh%2BO7uEOuQBt0God8G%2FeiWdKxYL9LW2bbdvGAdSfcFS2NOJDD3AucJeV3Qw0j%2FqZu4YPwt96PJXYgA4DcFBDzwxsR6bEBZcuV7IOXu2JHneCHlp5c67BMPL3w88GOqUBxc3rSVspmXUqbF3p%2BptVDaN1rebvx6GTpBkcYLBMwgC4ketZjZ2%2BoS4Ll7hcFUI0q5ewINcYzpekhc8TnbuYbfaeaz2tezCMBgsqQu9nnubJh3cJARXzkEFSbBp9K63sAnzkYhlOlKxxuXGH8qgD%2Feb8uUp%2BcnAFfW9BXrmAbo6IKsde%2FtUijQMDvlR1%2BWVTYCyvYcZwcFER7WvLx3ZQwp5ziLx%2F&X-Amz-Signature=98f84b1f2af31111d1a613e2b5146707a7fa1760d524402ab020a5926e5b9cef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WJU5CAOJ%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T191252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIQC8NDAoGiNz1rpB8Q1T4jKUFJjZGr%2FOZsXFqP9EJVgqfQIgXYoZv8TrQrgr7I2veGSqACf1XJE6kv5sWqiJUCXqA0IqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNETZ%2BQtDQBj7O5AKircA5Dj22U%2FcvXqb7JkOgpJyleLtPxDn1ZMtPj9r5KtKnhic5JLjmWmwUdlJNuvEPYON78WYpJTrMRDdsqpa9cqrANYbegDdWFfWraTevRPgIa451E2D%2FuwwlmSBlE2JG4ep6Z8l8Gx50IVTRu68nm1pGVpk8eDRzSno8slxhuHsDihI8y2UA6y%2FhWmO9gFkBq9zg%2Bfbvh2ceB6GNnLpWYyMMB0EHdol9IRDwqddxtWZSqV1%2FGTw2i37YRXVlpK4c3oCImheF4vuw7k73g5sxOU900hFyE6gCtTPy2UPU37R5QBuD0M3YTF1ynXNaBlpp6NPWGm8WEdOSVKuUeEO4HXGAsaa0Z1mom%2FXZHs2312T0s9aMDkFCxP%2FPMufW2b7er0nd64NpmqAhN%2Fxr7YrnO0LVebwdr%2Fb6HQ%2FLxLfCFWYGs1FGyitWz64d320SqQXOqHCH%2B%2F%2Ft2GafUmXfRvvGm8sbQ1meDfEjt73TMYGacm70wRTb1Om329DGjGKebdlgqbLehZv25Lxh%2BO7uEOuQBt0God8G%2FeiWdKxYL9LW2bbdvGAdSfcFS2NOJDD3AucJeV3Qw0j%2FqZu4YPwt96PJXYgA4DcFBDzwxsR6bEBZcuV7IOXu2JHneCHlp5c67BMPL3w88GOqUBxc3rSVspmXUqbF3p%2BptVDaN1rebvx6GTpBkcYLBMwgC4ketZjZ2%2BoS4Ll7hcFUI0q5ewINcYzpekhc8TnbuYbfaeaz2tezCMBgsqQu9nnubJh3cJARXzkEFSbBp9K63sAnzkYhlOlKxxuXGH8qgD%2Feb8uUp%2BcnAFfW9BXrmAbo6IKsde%2FtUijQMDvlR1%2BWVTYCyvYcZwcFER7WvLx3ZQwp5ziLx%2F&X-Amz-Signature=98f84b1f2af31111d1a613e2b5146707a7fa1760d524402ab020a5926e5b9cef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VWWI5UA6%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T191252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCICgX3s0YOtlOJpCazd6Brqqp2Zg23GKN6sU2fnX5nt3UAiEAstdavjSnlCrj%2BaGEvKFqZ14dBXrg%2BcQ1EkkhspysvqMqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD%2F5zrj%2Bo%2BDdBfT6PCrcA3ZLGT1b%2FjTTv1hXTDvms5QLAxpDZDqq5VIv29EEzFaKSF7pop0pn0%2BMLpykkfClMa1PBwpUR8s0aMcfZIf956Y4gYkXkHNX66ZAA3BIP8lPmiERRYUKXPMl1SXscUh7bJCNKw42z5z2G7bQCgFeaYdUofvPtnZO1JtpUpyfV%2FihVejKamLrEFd2kfv38sad7mqDW1p9iWD%2Bvll0WVArnm4V%2BezWxS0yfa1YstEv7G702g%2FIASqrNEbunYL%2BcZ1hYMkHISOWZ4%2Fl05QSxc%2BSc4A42IfW4vLCBy45FRdOBTQk90Sr5zBNmejDvg36ZdtF6RW4EjmIiYPZ6gIo3D9h1CWwgD01aj2v9PeE%2BYARwtS0Bn6eNkEy3xrEYrBVL3A6D15YCwrmrtOKDOib4sMYSyBvyNu%2BhsH4vWoXnttOvof4v7WC5tpAR%2Fy71sKhueRIrLcimjmfrHcBc%2BBqmT5TTDdHjxQhCyNXdnJASBSeFhrUqWbPfELutOd53d%2Bs0rx5gjpfcVt0Lh29CxkRNh2joU0g3C1eBtZeQhKSFfpwVr25l8OgwXohfthvjSZ7Q6FgQ%2Fvdmvgyqh4ilEqm40owDCCq%2BYIMHtDjGAbZgJcoGp3ae4WeuTwzm3ziSq2sMOf4w88GOqUBNxwARhVseKwoGRgOnLbhN15LOhJheDWROrHW1dci3VbSfS9Y9uDgSQHUL4stt9VFcuiJ9P6Y3a8MStyITMQFpFXdQBHs%2FTouRrOBFOy8uLYI6YcDgzIpu71utZa8aatzGa9jF1nvzP7LAvizLSXZ1BY6twPHVlHOMZbPAI%2FXEEl%2FoANy5Vmbl7m168TA9knic2tOjJCSgQprTXng9uh43ASf%2FVa%2B&X-Amz-Signature=6d7747304cee968f6c81369e881431f0d33d39f3b50bbf3a9ad12aa43fea9fc1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

