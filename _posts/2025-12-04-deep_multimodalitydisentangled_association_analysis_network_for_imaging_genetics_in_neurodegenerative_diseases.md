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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNGZ7MKZ%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T103428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJGMEQCIA4VngSi1OGNe53fdl0jkc%2FLjTA3khMdGSmnBLy9g4TZAiAqun1Zf1%2FRElfVhl2uKViJm4FrIYloqf6iJNgZTh5yUSqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMwS9u83m1ThhqJASZKtwDs%2BUutT5eqvZ5f3j1%2BqxSGhtP1hOpSnsvngvPGh4XTI8yzqT6XOODw0%2BFWPmzzVrGxGbVhsL36XhxGcxJYz54cdrm9NJn6%2B%2F7PwgxomlnaE5PMrvwyM9%2B%2FPiNjzyejWnQskIEtfO6VpDjqHZOP3I%2F1XDX4h4w%2BrwqI3E1P2nV267xqLQptIivlzPBLRDRJo5lKkrw6mbTtIDjLRbynNXnayoq5meRXkqjzGRwaoJm3po6k4qYwNgNBnRoLVGJz%2F2vSVJE9hGcn2bLZMtTKeWwUCgYTyiSZJ9Q6grhXPcYl%2FN5Cn%2FGtUj%2FrCgSCfrO33rEEEFYRICnKTniuoq33y%2F9DxnUIosmwKYJ3Jyd%2Bi1ab5VTA8MVJzdQBIVvhQIHd%2B4qmELjNbuPif46GS60vOnPPPwgQ1%2Bv%2FHSHWP%2F6VbDizNhrTnYA6VwQv%2BvVu1fG1QA5N4qr6ASz5AxhYnV%2FkVEH4pBDKTZvNmk5cjkz43Gmlx1tgctQ6Oc8sB1FBDVBesWVWhDOFIH31QzafsDHErqW%2BtkiTUbrQda6MQrV1CS1llGa5N1o3VNe1%2BWGAEeKWRvE5bSzjpPsKgwwhUw6z6DvAxvVYd8uQpVj8c5GjaL%2BVUb6%2BycWmH9%2FPaSgpckwqLOZzgY6pgGla7I5H1oqQ3txwqZxA6X5NZp2UpWzVWGq8Vv5GFRiiLy95YV68wzypiJ4AoC5iJ1zGSAhlayWsXwhzQMzDEa%2FX0DLNTwoUEYUeruZdpPY89M3n9Ur0rx754fb86M3mY4BWW7S8UFwHmN43OaRwjkk0K6K%2BAjs%2By%2BWJcM1Sujejopc1Pu7k86DFEwnTzKRRv9JHqV7UJelpYRTwj%2BTBCj0LkUNGqcH&X-Amz-Signature=319225f03cb7d8eb43132d555efa948492b46f35892f940c397c6949f4ec095c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNGZ7MKZ%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T103428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJGMEQCIA4VngSi1OGNe53fdl0jkc%2FLjTA3khMdGSmnBLy9g4TZAiAqun1Zf1%2FRElfVhl2uKViJm4FrIYloqf6iJNgZTh5yUSqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMwS9u83m1ThhqJASZKtwDs%2BUutT5eqvZ5f3j1%2BqxSGhtP1hOpSnsvngvPGh4XTI8yzqT6XOODw0%2BFWPmzzVrGxGbVhsL36XhxGcxJYz54cdrm9NJn6%2B%2F7PwgxomlnaE5PMrvwyM9%2B%2FPiNjzyejWnQskIEtfO6VpDjqHZOP3I%2F1XDX4h4w%2BrwqI3E1P2nV267xqLQptIivlzPBLRDRJo5lKkrw6mbTtIDjLRbynNXnayoq5meRXkqjzGRwaoJm3po6k4qYwNgNBnRoLVGJz%2F2vSVJE9hGcn2bLZMtTKeWwUCgYTyiSZJ9Q6grhXPcYl%2FN5Cn%2FGtUj%2FrCgSCfrO33rEEEFYRICnKTniuoq33y%2F9DxnUIosmwKYJ3Jyd%2Bi1ab5VTA8MVJzdQBIVvhQIHd%2B4qmELjNbuPif46GS60vOnPPPwgQ1%2Bv%2FHSHWP%2F6VbDizNhrTnYA6VwQv%2BvVu1fG1QA5N4qr6ASz5AxhYnV%2FkVEH4pBDKTZvNmk5cjkz43Gmlx1tgctQ6Oc8sB1FBDVBesWVWhDOFIH31QzafsDHErqW%2BtkiTUbrQda6MQrV1CS1llGa5N1o3VNe1%2BWGAEeKWRvE5bSzjpPsKgwwhUw6z6DvAxvVYd8uQpVj8c5GjaL%2BVUb6%2BycWmH9%2FPaSgpckwqLOZzgY6pgGla7I5H1oqQ3txwqZxA6X5NZp2UpWzVWGq8Vv5GFRiiLy95YV68wzypiJ4AoC5iJ1zGSAhlayWsXwhzQMzDEa%2FX0DLNTwoUEYUeruZdpPY89M3n9Ur0rx754fb86M3mY4BWW7S8UFwHmN43OaRwjkk0K6K%2BAjs%2By%2BWJcM1Sujejopc1Pu7k86DFEwnTzKRRv9JHqV7UJelpYRTwj%2BTBCj0LkUNGqcH&X-Amz-Signature=319225f03cb7d8eb43132d555efa948492b46f35892f940c397c6949f4ec095c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663QTZGXR7%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T103428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJIMEYCIQCoIxMr8pidQ9o5FFP6u9Uey8lFp1EjrEh4sU9wOlPj7wIhAMWdl5O35m%2FvFK1oDiVJqCJ6N%2BNk1OfD3jnvN0ZKjVUaKogECNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyStP0%2FO6ye4kIUULsq3ANQ26Xa1Yi5s6%2BH7AtcgdF9S6KnbVbKdOprOzSaveIx1oTFUDjx6dehm1cC3EO00RQJRxxIBkHH01K7bEHs%2FHIed6gca9spNj84RBwIxXMYKw8fEjjg0L4eqnTQ6dlJuO44iJEO5p%2BbEgT7668sBvbUASv4kKhPQfdsgNYHMciOU4WfU%2FQ1RIKhXYMNXfVww%2BppoqtGc1jT2LEqCFqn509pyI6Bat6Kqmehx%2B2EuMDzIASOnPEIanhouct3cCBH4LUWKkOz8Akl%2BzIdcUM0KGSa%2BXHVZIjzXWQArmf1blylM75gFA8ytZ3%2F2ghO4SCxnKFM2SBP6Y%2FslON8BspkSeJtGxCFI%2FIFqMiDOgf1dtliJtUrB7sgSHSsxCTDGvzzJrimyJG07WUpfyDUSZAtU0Ra%2FkE7npAGTwOX7ERPGxYHckTSI%2F96VKnnkCMotIiqVQpiuTBcX9gl%2FeP5dOuO3V95ojMahlj%2BBPEZaBtDYpGqTnnxuWhBCPtp6gWZ7KHDBs3SDJBGEIAHuk7OKIns24CjXmV6g2hqmeklSZw9D9He1mRdaBVNdJe25cNVuBuXAEkGwMP0nG40kyehiEoodMCFb6CDUZ2TcH2%2FY08dPQGIRp0ncfHc7u27%2FVIqXjCNspnOBjqkAU6B7G2EQLCFt9fS3dlaa4acm5zzUavM%2BphtrNRgDHJolFT09uO%2F3a%2FJZ9Q3k%2FZvW8ib56h2Si%2FzW5fa9khfFqJ7UZJWh%2FGUNgvUTyLPqMPEIi9m8iNfKO8LnOh%2FcFEuHAhSje87ghW%2FK4gqrFu%2BvorFM%2Fu3vM6DxPkdDd1hMymhY0ts2F%2FPy2MaT3KfOqaSVasadM9Ywt7nAvWMp0dOt6QkCBi%2F&X-Amz-Signature=7eab0af822492fec3393437e7312f223a246dd62ea00984d29f3a7d0d7e7f404&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TQJS5H4%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T103430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJIMEYCIQCrJpyxrO4JSP5XCYMaEQKRiFnUauXhICnsuAkY63R59AIhAJY0J7kefONczvG6vrLLGMcJmFUUkr01qGNfBHsmldixKogECNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgztJ%2BmrLoYElQSTukEq3AOwoWwI2Pwt6uWinxhXrufDzCepRx4F9pDyNYyQ4v9D9Def3%2BiZ4z63nsCkPSRqTsbU0PIEMxicIebuhAMli0wK5VCYKvNseH72N4h3mY30zunjy5hc8N24MCul%2B7EEdzE6Ogf4grCNJ5RchYwo3n%2B%2BhbBCB0x87K5skJd86Gqfc1jZz5K78SYz%2F8rniKnhyYowvk8mJW%2BAusqWQJNuH8mnkmsAyo9lR3dEfX6yV5z1LJit6oNX2Eiyq%2F6s5FIF7wisprQQUwQfWzoXBFbnDBjeRVATiT%2F4UUwZf0hGwuHViK7zCI%2BE0WYF%2FE71wIN3WbihRhD%2F7Mwc8EBjh1dDZas1qy1YFzYRly4SrESsFrKswZe53up%2Bspjrhste%2FtzcUCPJgGOI1IvEE2QfCCIJnUDiEicHIt%2BFGMZfVwre64jvs6ijGJgdRiPerRB2ncOcknaB9dzVBBOgR7bHmtbEzKdC%2BHSsfRyuUGtDtUrT%2FAkQDrmP1HUqoWzPm56fceWzIsfd1mjFhMC0ejHHH6w0XJFdlZhrxXBb3UoxnUhkdVAjJtVNEL8%2B9xhSvkO4XEZr1Va1x6NkOMAjG2aSINaJELVxmA3M852S0EHzmtEKn3YvfVNM3Y8ebXz%2FGpktpTCrs5nOBjqkAYpsHMvx6zf6nZ35P1jBdnXhOmHhmmiskpFmMYKwUXKkdHA6aBH3PuhJfP3etI7Uqgbetz81ktCoTBWEvxeOcETJFJ8yX1LtWwABiVD8fc5LiN4SdYeoA8h%2BwlrkQK18efeq%2B6fs3wy1bMrC%2Ftp%2BRE7DGjEXvFO1TYBFTfiW54tvbA%2FL8%2FmksB20cnZ14V9mXdUVyU2MmqiH7soA%2BD3Syw1xOr8H&X-Amz-Signature=b5b3313581a002cc38f66d2e52aa29f6f9a918f74345257418d43724c90323c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TQJS5H4%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T103430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJIMEYCIQCrJpyxrO4JSP5XCYMaEQKRiFnUauXhICnsuAkY63R59AIhAJY0J7kefONczvG6vrLLGMcJmFUUkr01qGNfBHsmldixKogECNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgztJ%2BmrLoYElQSTukEq3AOwoWwI2Pwt6uWinxhXrufDzCepRx4F9pDyNYyQ4v9D9Def3%2BiZ4z63nsCkPSRqTsbU0PIEMxicIebuhAMli0wK5VCYKvNseH72N4h3mY30zunjy5hc8N24MCul%2B7EEdzE6Ogf4grCNJ5RchYwo3n%2B%2BhbBCB0x87K5skJd86Gqfc1jZz5K78SYz%2F8rniKnhyYowvk8mJW%2BAusqWQJNuH8mnkmsAyo9lR3dEfX6yV5z1LJit6oNX2Eiyq%2F6s5FIF7wisprQQUwQfWzoXBFbnDBjeRVATiT%2F4UUwZf0hGwuHViK7zCI%2BE0WYF%2FE71wIN3WbihRhD%2F7Mwc8EBjh1dDZas1qy1YFzYRly4SrESsFrKswZe53up%2Bspjrhste%2FtzcUCPJgGOI1IvEE2QfCCIJnUDiEicHIt%2BFGMZfVwre64jvs6ijGJgdRiPerRB2ncOcknaB9dzVBBOgR7bHmtbEzKdC%2BHSsfRyuUGtDtUrT%2FAkQDrmP1HUqoWzPm56fceWzIsfd1mjFhMC0ejHHH6w0XJFdlZhrxXBb3UoxnUhkdVAjJtVNEL8%2B9xhSvkO4XEZr1Va1x6NkOMAjG2aSINaJELVxmA3M852S0EHzmtEKn3YvfVNM3Y8ebXz%2FGpktpTCrs5nOBjqkAYpsHMvx6zf6nZ35P1jBdnXhOmHhmmiskpFmMYKwUXKkdHA6aBH3PuhJfP3etI7Uqgbetz81ktCoTBWEvxeOcETJFJ8yX1LtWwABiVD8fc5LiN4SdYeoA8h%2BwlrkQK18efeq%2B6fs3wy1bMrC%2Ftp%2BRE7DGjEXvFO1TYBFTfiW54tvbA%2FL8%2FmksB20cnZ14V9mXdUVyU2MmqiH7soA%2BD3Syw1xOr8H&X-Amz-Signature=e5d3e05a17f922fae0446e48be5a20341d64068a725cd24fcaaad43177e3e20c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652O6YXFK%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T103430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCIHNWHJCL7lC2W6JN0zFHXLK9wYsXVS%2FPd9ZE3mSW%2B8zRAiB864r7xyrAIuXYnGrhQc6p5aw72jzUUTlQ7Y4ANK7uTyqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMAx7y4RSJLLgpA6YBKtwDpTsFI9RvV3GxC2g43R9F%2FKf6DW0kWVa7%2BDYiRNd0bgCLN5j6jpM0Ghs9FNRwkRITNXQ%2FlRgnl%2FuBOVZk434p%2F5guqkccKRjyk%2BScci4wVgLHgOXovd1XY5bgDdVtpVnv3TMUFBi8wNc8%2FtUWlhlxu47A%2Fve4j2w%2F2shEYNnpY5SS%2Fm9%2BrhHuDAW1lbPt2VVI%2Fk8dxI9ktOvIJ1P71UlSWUDzqG15WH1YbKKrcbURK%2BCXkdWHyBoDFK6zzvfn7tzvR9bF5MQmYrzcHObG12i4X1KfDdKk7dFQCMAftZ2O8Rcw2arxZeoGpzp63r1k4yACUBW4tl2yl3y1g1J%2FZpNPp2yVoRhBhqb971YSAzeH5xcZfj7a91n%2FwxPyZqdctx7qwT%2F9EGC8u%2FEeGJkspp9Iae3RT2%2Bjv2O1UGHVFJblxF0ho1Mpb%2B8Wl%2F6BkDTskB0belHQLAA63JM%2Bioa6WMx3g%2BKTZPKdJ1fGHAbS%2BbdfuUbyC%2Fg911czHfpy7vRhpNV3chABSE6vyVZzNr6JZRinn%2FHAV7hqcNL7nSYY0f0U62G4nmjY8oFSvf8jyI29nTCMDvf9y5cw89Sk%2FZ6mC5xyyv0sqcAg8HAVbDyVa5tVFUFIgUFeKrmoaiswVXEwp7KZzgY6pgFpFWS6lSF0fg2LvQ7WBFtqarjsdjZkOBhDEg%2BFh2742lBdrdOpPi9ObXckPtGaMP4xAxvLxm0jlIxEQpt7aAjXV%2FKm3Q%2Fxgu0DQXtmhU9evppWHO2qGttHMRkDcyCEwwjrqe7z5RHoowDZUWcxShu1hBeaXO0CK3fHs0ySVlZ0nNX2RwXaxtb95lIseYatgVhbXAm%2BufQbd%2BHJIo96%2F%2FcqF7Al0mdp&X-Amz-Signature=8ed07cdf31fb1e079d11d21ccfb87c9bed4ff90e1ffee2e35979f5076bb4bc6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSQMGMDN%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T103432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCID8SyQWamjM%2B9qbi2nWUl2mGBs0kbD8niVohVUX%2Ft70SAiB9%2FyVp9L2vqrtaUM4QhVV8TU13U1zWcYcMHKrAi9nFmiqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMeJiWicHsii%2By27tUKtwDnxjlkPuiTJD7wLBfO0ClkSn553Xxra7xJCxNedJbgZGy%2F2MfSC%2F4iGEsdhM1M3QQvqE75OQM2%2FydpeUk5ojUODT5ZFtap33Ws0yM4o0S2ypjsAGMmRALIzSFAOhf12tSOlOLCvjrszkMsRTwV0cpVOPwlB87F244KXv63d3OlX%2FrOmwIdziwRdLkKtUX%2BQ9Y%2BAJaxwom35Bif4bvH0bOqWHJF4AlSOPwHdMvxGK622fducvsoUgZxzeC8ak0GuTJGdLPWuvw1yxumo67LamolZcxgcR%2FAFT4BpyGTDSkzm51k2xF8D8oipmqo6%2BWZiswEWFpD6Gw4ZAk5LZLngtc5nM130X2%2BIVaDoUHBIim4U8sAR%2FRJn4R6DkhYHYjCFVdnbQiCunxaAxYu7UJ4R%2FSeXrKgaVLfUlTBS8EWjREeWJnPbwmgOYvMZg2RqbAv5FkoyGsuTCbCkGDrx2zEJCoGXHSbLE6rkXfKNJslNeCPjfrgGdZGfFkQ3nIDmpSLpoc2sWJas2hN7TsN8lgMUtikzDFdXkHNHSBeSWhBLMsbl5wcZEXcJtTXyDUCIEFQX%2Fh6pkAqEE78foP%2FFEg3moL2sQqMTMSGGwQZpJhaqbXMBaSkgX7%2FzUX1uNEa%2Fcw%2BbGZzgY6pgGGF73oYu9xnzhA3USWj9%2BniW9oJpLhl3wVCwv4U3Woc%2FDK4%2FVoyuYWP2og0nvrd%2FxcpQqbGKmqu3OaaqsvBGc1Km2IvLoLujEOj7ERxWRVX7ElgIdb6eBLn4Te8XQu1bOAvfB8ksayrf9AsO5b%2F76kv3YkPIc8Co8x1Ud%2Bq6npoHh8JwvH9SaGINjgs5jIBSMT%2B%2BcGPk2AaCN8OnCKRUleKqGyhjgO&X-Amz-Signature=c21c8c690ebe4b779992b18c9f85a8a1267269e737dcdb7d93c758cbe2d3c5bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNBO5ILK%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T103433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQDENq4SYbyGG7wIr8i0NK6YwbcdTE4CLMEbdUiqHTzVZAIgebmeA1CiBEpW6Sc6H3YPiAF62z8IBwWUf7rgtqLZbUgqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEmNMgT5WJ2zeUGGOircAzAZRfUbrpZ2jUhcUgJMYl1CqKb0XPJDBFb%2FrgEnor%2BD5WKm6g6xytqM12UZFvZNDYDVm3%2Fxsic8705bOcPDZYEWx9dM9SCa6VorUe9Z5gss7u3Z7KWGVFIPbfaMmhLc%2FfYWrLpEI0%2B8tgKlBCuEUJMeJfVvYIYjTMxudWxJNraEdNlr%2FlbHemlkLSv8ZkojdN5zcXA9WU34z9ogcznIl7hl7L6IaNdJdqmdB4bl68WtAvL1JSM3xop%2BFx4pWGr4qsz4JneHkZHVNdc%2F2gT0k76mo5%2BExiqcp8jidRvxpexixExStxSDd3Ms2XWK1Ndk%2F6W3qAoeTAh4ES0aMd0SdblhFRiIYM312saBL011W%2BGrDRTQ9qLCIX2estHOXpDlPI4PELY1zvBKKP9ZWv8XObD3oNlGXWexmhTZxnb3%2FHBeZjpA7vnhdoRky4CqRC6IMovqrxyh%2BWgwa1pDkEE8UKV0BReCtfYwCHG8TC1QcSixMPUzSP1OX4Rpkv56lgDZ03GTXN0oEfetGBtQjZ1kI8JKwb7pFk2GUUCT4zbjFSzwPWau5Ev0Byry272fKsceLm58TXHguTU4cgp0W0uMlDC62nyXBVIVOu%2B5Mf2c5H7BDMVaT4VlU1ncON3hMM%2Bymc4GOqUB5GQUZ2QjQ32xeMeBdxrPjL1yVnMv3aX7WDZaMwSTHK34p4z3KWAu5bmUG1vvluLt8Y6vzGrW%2BzCm8XdiKCByRcMb1P91xbd5Z3U5MHNBzsO06bCbePU4O9xqRgsc2mqYrsbTyxOAXRTW5HddTpc80e6wV2CHjSuaizUcX%2FOp22k9BMHfyiXLr83J40GlTTzjAN1bquvNkuBGV042xhoBFKcAo5wl&X-Amz-Signature=165cee464d62ef89945b5243962f2c7bd71f11567eb6b7d7f768ac87e4150de1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6LM5TBT%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T103433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIFDDeusgff1yhJxUGRUjebBAmsXh4jYf5a4%2F0frBAUJ3AiEA8lUT3uxm6pLPKZUVJM1NhC%2FZBXSDE7gLrDak8YICc%2BsqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLva4Mj3OFoF8Bh2bCrcA0bfHSAhFWQG6JhQjDdCWSJHSMPaXT8PV8SuAMJf24ULzACuzSGGKUJ5rXjX5IhvSwcZXTF67KjGufT7XHauDgAuUom93uALBHBupijZ8h0oB%2BozPBSJc%2FBhGYz2%2FXZ62DvfoO0e96zu85b%2B4oqFQeivJQDbCl5rdM1kMd9zOS5VDmE1idYIlt32PgULnJGnKV%2BFGKmUz2f8WZ6IkTjptrMbhd7k%2BGIBksD6NOLK1WleH8g3EOwwZOMSr%2Fflea7xyylIhXuBAMrC9O%2FBkoAouq59NgGoweZPwaW26leEfBuVaKwQ0Ks1JciHLHCpuW%2Bc%2Fb%2Fg%2F%2FtWDxdPOFpgBfp1oYz7vnXeGGITTWWg2WBl%2FmslppcCW0L43Tag%2BibzdCyBVGRdPzJASx9f%2Fpuu2hZ3GvdlaQ3ddktRAkr%2B4MZTYq6zGXlb8j%2FoH3tVLXeW0JgHvqT1E6%2FqqrmQ5owP9dAwnmHwdm7tEHW0rEl0yAp7blX6QrhAqpnuGheB%2F%2BWaQuAYcNtYhpgnmXrUBgjrFBJPzk8SXh5M6qsfmprsORKy4bviNoxwvGqsROpTC5XDZctCI14uchfI1jNC45d8Y8AUuJIuDaRnpPU%2BD%2F1QTtIzxnpA8My2ALPoPwYWnCx2MIKymc4GOqUB2WTu6UhylZVgAklVZeGLm95aD73OtOEQygNtbSG7inF3RWSKCyhUZM03eynN8IPyZLcoNpCcyjk78vED7%2BzcxOKtfcfe3SNklNOatgtGqz81u3CqugoVg2K%2B0z7Jz%2Bxa%2FPdymfh%2BubblwAynSAsy5hyyBO8ul9DE%2FdW6xsB4ObdmQ52TicDPAod6jKlyB5tG0lwAbq0AvLhYq8JsZGxJrgRdFqJZ&X-Amz-Signature=1826e82bb218ed91e49e093464ba484acfa40f46aa4e001a68bf10af57a58f71&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6LM5TBT%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T103433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIFDDeusgff1yhJxUGRUjebBAmsXh4jYf5a4%2F0frBAUJ3AiEA8lUT3uxm6pLPKZUVJM1NhC%2FZBXSDE7gLrDak8YICc%2BsqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLva4Mj3OFoF8Bh2bCrcA0bfHSAhFWQG6JhQjDdCWSJHSMPaXT8PV8SuAMJf24ULzACuzSGGKUJ5rXjX5IhvSwcZXTF67KjGufT7XHauDgAuUom93uALBHBupijZ8h0oB%2BozPBSJc%2FBhGYz2%2FXZ62DvfoO0e96zu85b%2B4oqFQeivJQDbCl5rdM1kMd9zOS5VDmE1idYIlt32PgULnJGnKV%2BFGKmUz2f8WZ6IkTjptrMbhd7k%2BGIBksD6NOLK1WleH8g3EOwwZOMSr%2Fflea7xyylIhXuBAMrC9O%2FBkoAouq59NgGoweZPwaW26leEfBuVaKwQ0Ks1JciHLHCpuW%2Bc%2Fb%2Fg%2F%2FtWDxdPOFpgBfp1oYz7vnXeGGITTWWg2WBl%2FmslppcCW0L43Tag%2BibzdCyBVGRdPzJASx9f%2Fpuu2hZ3GvdlaQ3ddktRAkr%2B4MZTYq6zGXlb8j%2FoH3tVLXeW0JgHvqT1E6%2FqqrmQ5owP9dAwnmHwdm7tEHW0rEl0yAp7blX6QrhAqpnuGheB%2F%2BWaQuAYcNtYhpgnmXrUBgjrFBJPzk8SXh5M6qsfmprsORKy4bviNoxwvGqsROpTC5XDZctCI14uchfI1jNC45d8Y8AUuJIuDaRnpPU%2BD%2F1QTtIzxnpA8My2ALPoPwYWnCx2MIKymc4GOqUB2WTu6UhylZVgAklVZeGLm95aD73OtOEQygNtbSG7inF3RWSKCyhUZM03eynN8IPyZLcoNpCcyjk78vED7%2BzcxOKtfcfe3SNklNOatgtGqz81u3CqugoVg2K%2B0z7Jz%2Bxa%2FPdymfh%2BubblwAynSAsy5hyyBO8ul9DE%2FdW6xsB4ObdmQ52TicDPAod6jKlyB5tG0lwAbq0AvLhYq8JsZGxJrgRdFqJZ&X-Amz-Signature=c87c2509ec90af393984ba07bca5a041451debd2c28b9f4226e0a5b2a6b8e8a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKIPVTPG%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T103425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQCW77CRluq7u5SHUeKcZuLyFJOQKaP84Z%2BVu8DjmDANLQIgfqrLnXpoXDbRK9IEmFwtJ7%2FX3oeZGZRnxeIvF%2F%2Bt6nsqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDInt25Y37v45WkLGdSrcA%2FbIK5Dn4OTUHwpYefrY3%2FTNmSTFdm4wJYIHgskxveiKzco7OyvCVOUMhl9%2FU9dvxZofsG6YTr52Iy3YIl1xN6dD8bB4AuTrlgnXyzC4r7SMN67QdTOwitkbNdebKtUsCAc28c%2FoTLYsfGStHKqda4iAoeVW49Ha8kp9P35Pokz9pOzHNAMFY5sU%2FEJSuqIQpBeld8JXXm72ZaE3k0pjlwNS%2FouvD65AOicOxfrzT6b0RhbE0McO3MOIq6foX76rYCLQlmC3TToWzmaI7W8al02%2B%2BJrDSA5O%2FcDV7TIjbaDj3sVFGP6SrZV77GgC6TJlIIiwXX1MF6HGjQAznoQyjFJLM7QixLo8IiyTH01OFy4HKWX8Gv2P73NMsj%2BOqenw7eiDaqdP%2BxQzpY0EMBux7Y3o6G7B9noaYj50rHWftqwtkIo0RBpU8zF4wFdnrPaeSvfmizGqQVAjCGw6CuA1Yd5bnVJjdMockZGzkqkUriw8EJbjjPzi609QHsvoOCLRrDVbpyd7CK916bzJWD6mPiA3j9CJpeYoW%2B6%2BU2mKA0i0moMnPu6Lm66KQ%2FosrxXaCC2F6u74RvIk0nsCD5vipZ1GBZi9WrXbVku3Me%2FI3vvXWLZbaYYdY5CpjZGCMN%2Bxmc4GOqUBLpVtQxKRfZO2z03MBqBJ%2BPXWkP91aB4R%2BXK%2FXTSukGotsCUsTKxype%2FNuTbeGGDevY80sSLiY%2Ba%2Bn6KECnXvGoWldbSGE1WeebbNZcNZeOfkJHO5ik%2Bkn6FNKWu%2FeBhfKnYbJVrog4RP%2FfvvAnxfZiYfsJDb0BjDdscRSHiDhX%2BSsoExmZlG7QdXfFhp7ZstgadNfUj0O4qzFg0zj5M9s%2F5Q%2FB2U&X-Amz-Signature=15acf1812d47f74390896ad9b87390a4e152bd1c12819efae9fa198717beb4cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YURD3XTY%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T103435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQD26sVDCEJU0YP6CdXdpl8s%2F%2Fnh4eZ67XIgKWK%2FIhGWVQIgb4IWDcySUtviHxSjEUSgFpcCcgmOu1u%2B43daATiSN58qiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBxwWcU5ywhr%2Fozw1ircAyR1GoVPrbwRM6aJ%2FwNeSL9wMebT2u8p5XygbV3WK3KNh4CMmp3h%2BRIRnW0jnnpkNpf2NzBtugd1MgcL4karfWD%2FD3Zm3mxIfMPZQMVfSCT0qcfmYRhd46EI55nK1H8tK6BBz7VWbfMUhDhEFpQy9QrvMu1ntbuxWMUdQ2E2%2F%2BMfy5qs31rFfHEZ7ppAYyx9%2FO2jkmvcg2ZkTvDrLENg4O%2FRLGikuMNdX5GdLA%2FDlG1KhXPlgV%2BvDsXTYSRgOzz50QreL5ghhLwyQNiR%2BRajIc7lEjLEZedqQev5jy9v%2BKHirQPYzeAt3uhGj8iKryJBi3GTDg%2Fqq9ZbuFTPgl3M558RrVr0sjVFrMwXWxax%2BjKv1aGiZ5%2BG%2FRFy6dMzUBe0v%2Btk1Jl%2B1a7YK7ENqMaF6kaApsQ03brx9s5%2BOAPJjphNvfryFAdpqQoWPgUyLCGrV%2FFrir4IUHQpXcb0oA%2FzySkqlK1%2BxQzS1k2oGEBvNiIqXnUPhKmK3WD9AFVq7bOc9NkZ6nwb3zIdmx21oIGA6EP8wxAzCFhGp1%2F5%2F5IutKuuXeq4xdrUkZi0WabnepQKJs%2FmeZlT2xOlmiIFZxDa%2Fu9nbA6hWpVwvM3H8Fpw49mA2UY6NUzWzngR4UBKMJCymc4GOqUBSE7ge3sby37AA4tTWoIQno1fCAo13tno5rS8iBrThwP2%2F63xeJ4nqjIu%2FPciZKjKgSij3F6FjAfVlwRtNBoVYyRvFG4wv9lmG8H8d2jYys9eiYYewfbIQjeQKQFxWV3m%2Fab1NzOzOZdzke%2FK21%2BsZKiUjzyiQD%2Fj9MSSjdR5Wj1XusxsvyShzX8ERfxb9pLPQnZ9yQvNOyjrLS9pKnQXpbCisUSW&X-Amz-Signature=3c1a24f0445472c9770410aa5421843f8ad97922585563cc1345860300bb4d24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YURD3XTY%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T103435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQD26sVDCEJU0YP6CdXdpl8s%2F%2Fnh4eZ67XIgKWK%2FIhGWVQIgb4IWDcySUtviHxSjEUSgFpcCcgmOu1u%2B43daATiSN58qiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBxwWcU5ywhr%2Fozw1ircAyR1GoVPrbwRM6aJ%2FwNeSL9wMebT2u8p5XygbV3WK3KNh4CMmp3h%2BRIRnW0jnnpkNpf2NzBtugd1MgcL4karfWD%2FD3Zm3mxIfMPZQMVfSCT0qcfmYRhd46EI55nK1H8tK6BBz7VWbfMUhDhEFpQy9QrvMu1ntbuxWMUdQ2E2%2F%2BMfy5qs31rFfHEZ7ppAYyx9%2FO2jkmvcg2ZkTvDrLENg4O%2FRLGikuMNdX5GdLA%2FDlG1KhXPlgV%2BvDsXTYSRgOzz50QreL5ghhLwyQNiR%2BRajIc7lEjLEZedqQev5jy9v%2BKHirQPYzeAt3uhGj8iKryJBi3GTDg%2Fqq9ZbuFTPgl3M558RrVr0sjVFrMwXWxax%2BjKv1aGiZ5%2BG%2FRFy6dMzUBe0v%2Btk1Jl%2B1a7YK7ENqMaF6kaApsQ03brx9s5%2BOAPJjphNvfryFAdpqQoWPgUyLCGrV%2FFrir4IUHQpXcb0oA%2FzySkqlK1%2BxQzS1k2oGEBvNiIqXnUPhKmK3WD9AFVq7bOc9NkZ6nwb3zIdmx21oIGA6EP8wxAzCFhGp1%2F5%2F5IutKuuXeq4xdrUkZi0WabnepQKJs%2FmeZlT2xOlmiIFZxDa%2Fu9nbA6hWpVwvM3H8Fpw49mA2UY6NUzWzngR4UBKMJCymc4GOqUBSE7ge3sby37AA4tTWoIQno1fCAo13tno5rS8iBrThwP2%2F63xeJ4nqjIu%2FPciZKjKgSij3F6FjAfVlwRtNBoVYyRvFG4wv9lmG8H8d2jYys9eiYYewfbIQjeQKQFxWV3m%2Fab1NzOzOZdzke%2FK21%2BsZKiUjzyiQD%2Fj9MSSjdR5Wj1XusxsvyShzX8ERfxb9pLPQnZ9yQvNOyjrLS9pKnQXpbCisUSW&X-Amz-Signature=3c1a24f0445472c9770410aa5421843f8ad97922585563cc1345860300bb4d24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IL5YCOP%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T103438Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJIMEYCIQD%2FfSu8SwGVEw5JWfFhUxonTcEh9xp%2FUqPJNCbJUcMWtQIhAKL8uJDsEylxj6OQoyxEAQW57wZ6w%2FchDVugCQ3HnehMKogECNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwBqvctTYiJkpw3Tfsq3ANsmOsI%2BYM6rQvXnrSzTMIy2YCbDzCnj7cSJzJP31Ne358Ve7S7p3e2aEG77O%2FIyUEL2n0rnC96rJpKbDyfnIsLQ6FQTKzmezw8wzwYR0GR6gNAtNkw3CWj8lp269Iprkzz4U9gSCeE%2FsWAWaO6infWN9C3tvDf5zj80KdNsPCTQz22f%2FMu8U%2B3tLegybrFqhl4M5fVKQvdKH5FIeAEfOBYRvf9b%2FvU%2FMKbHOoii3hx1sS7t9YLb0xJXMRtIdHG32CwafOYO%2FiLLKf9DT0KgVv5ugtK7KSAe3uQ1V3Os9oG2yo0TzRWZH%2BggmFUxMpsI%2Bno4uEShaKXpxyUfYyfnLUgzfShvqsvQ9%2BTAubOk1NKguIPbdcONV0GT0aUUv19TXfXbAwDTQOYaAad7vVWaIPYWyKF7znf5TKNR8BhdnR4g%2BjxMVwK9KvxnGNPmNPBSuBvkRs7jqcKWtqgFxs%2F1FXvbM9q9z0HLJYmsSly8eMoqt7lNaTQmXOXEsODZfTK3yNsrLVZhFrhwzY66PiuQhxeK%2B9E3MgU3AYVxvPI2WHHfrZzjDJPoD7m9TnU9gQs3XIVCsxoWU8czZv%2FvRHso68rK7AARhv8VsBQB39I6%2Ftu7S3xgcn8QWwy9TYdlzCzs5nOBjqkAVq1wNQbIzubV5J%2Bm32fCxExM6dMUsTjAbiX5KVTzwdreqObOneZ%2B%2BdGvputObi8WkplFMVesBiGWkxO1LT8pDx%2FCFxiVRP07jqysbyViFkFWanaECdyWksgmb5ZviV2q67Z6MCo6Gtvn9WjhSJp6njRgPzHWAUAFcuFMI%2BdQPdEm%2FaI2bLIio0I1mMooHDJ0XEvPk36shmVnChW%2FL5dGkcy3xxL&X-Amz-Signature=14ca051bc501848fa75342368abb8bdd00fb0ee644d119006a2935e96d8b1ed6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

