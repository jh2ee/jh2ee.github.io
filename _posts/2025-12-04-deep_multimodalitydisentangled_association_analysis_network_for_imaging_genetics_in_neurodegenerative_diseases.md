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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRCZHFYJ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T104108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIFQgNMATNZsAp0FGbayE4w6WgeAHQodJJg%2FpHqSlY33SAiADRNiyjC1Olx9A6SOh8m8fpARkPuxNTUc9%2BJoqNrNkqyr%2FAwg6EAAaDDYzNzQyMzE4MzgwNSIMw0842kq1BFbFOaX4KtwDiFGu2PxKK4G10d3v%2ByLNEoHPO2qZceDK%2By6YowCc7sMfOY9e6aEJOUu0lXjzslNv2%2BKQOtku95U%2FDx2g5%2FLiEkrdSufK51WJcyk%2BEmSkSFXmfkhLdu8acwpYKltJ6hORPJdfVG9cRKHHFTJzIsHdNy0eBWKJS5DHSzr5%2F1qNtpVHpKeA5kR28%2BJpJAWJmnJWNF%2FCnLgEJLP6VQZIYd1sOt8t3WSvbPU3VsqNsiAVMx%2BDaKDpmH5GJn61NaeeLuOBxaw47KI5%2BeZt%2FMbCF%2BIiB0Ul6JjXtMO7is2unpRopksNaTR5VC2Ye7C1QYPlOfpoE%2Boytm9lTaQWT609hOmtWdO27H%2F3h83iODFkAakBDDMkfbbsXnfc8LkKVOKEo1av%2F%2BztVfK50ncl%2F%2Bym2Bf7Sy%2FD8jpSGOUeFsjuIqxFlhjfyrXQgpfkPq5IVusoZVtJNgRA0Ck8nZBFMaCWK7gciIbbAW5FMGUjcug1Fz3B%2F3Iroldp5rpkB5HUJ2Hv5tvCd247vUJXi5vPhlEznsO5owY89ksbUm4SdznVLntDycyZNAJiktBSiu0O9%2BMbbsEH2D2606calntmZATT6JvWJiUWTLAueKA8qe3ws2GqEVFJOV1PhAJ16vgxm1swkKauzgY6pgGgdJLssJ%2FrwgZaUXKkyA%2BGvelnp5D%2BkLLasksDoA2LcVmX2cvlOIwaUj3dNtsXTMKJqXZVUhZo0H0vW2SZUjhsy%2BxidL9HFKJC3DTSuXRREgYGu2%2BbpBB4sSwCKgKdoKE6gcbDIn%2F6mVCfnRElPRwe6PiF0cRrkZlW3JelDjbOODCoIYzXSdtXjxOo%2FNW50xPxnTa6JVxsX%2BTgkmIU5OIq8TgtK%2Bnh&X-Amz-Signature=a36b95f6c65416273bc6a45808ecbd7cd1c50935382926313a0d5187855bba86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRCZHFYJ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T104108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIFQgNMATNZsAp0FGbayE4w6WgeAHQodJJg%2FpHqSlY33SAiADRNiyjC1Olx9A6SOh8m8fpARkPuxNTUc9%2BJoqNrNkqyr%2FAwg6EAAaDDYzNzQyMzE4MzgwNSIMw0842kq1BFbFOaX4KtwDiFGu2PxKK4G10d3v%2ByLNEoHPO2qZceDK%2By6YowCc7sMfOY9e6aEJOUu0lXjzslNv2%2BKQOtku95U%2FDx2g5%2FLiEkrdSufK51WJcyk%2BEmSkSFXmfkhLdu8acwpYKltJ6hORPJdfVG9cRKHHFTJzIsHdNy0eBWKJS5DHSzr5%2F1qNtpVHpKeA5kR28%2BJpJAWJmnJWNF%2FCnLgEJLP6VQZIYd1sOt8t3WSvbPU3VsqNsiAVMx%2BDaKDpmH5GJn61NaeeLuOBxaw47KI5%2BeZt%2FMbCF%2BIiB0Ul6JjXtMO7is2unpRopksNaTR5VC2Ye7C1QYPlOfpoE%2Boytm9lTaQWT609hOmtWdO27H%2F3h83iODFkAakBDDMkfbbsXnfc8LkKVOKEo1av%2F%2BztVfK50ncl%2F%2Bym2Bf7Sy%2FD8jpSGOUeFsjuIqxFlhjfyrXQgpfkPq5IVusoZVtJNgRA0Ck8nZBFMaCWK7gciIbbAW5FMGUjcug1Fz3B%2F3Iroldp5rpkB5HUJ2Hv5tvCd247vUJXi5vPhlEznsO5owY89ksbUm4SdznVLntDycyZNAJiktBSiu0O9%2BMbbsEH2D2606calntmZATT6JvWJiUWTLAueKA8qe3ws2GqEVFJOV1PhAJ16vgxm1swkKauzgY6pgGgdJLssJ%2FrwgZaUXKkyA%2BGvelnp5D%2BkLLasksDoA2LcVmX2cvlOIwaUj3dNtsXTMKJqXZVUhZo0H0vW2SZUjhsy%2BxidL9HFKJC3DTSuXRREgYGu2%2BbpBB4sSwCKgKdoKE6gcbDIn%2F6mVCfnRElPRwe6PiF0cRrkZlW3JelDjbOODCoIYzXSdtXjxOo%2FNW50xPxnTa6JVxsX%2BTgkmIU5OIq8TgtK%2Bnh&X-Amz-Signature=a36b95f6c65416273bc6a45808ecbd7cd1c50935382926313a0d5187855bba86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XIROTXZQ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T104108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIDeZAogQWP2IxjKbSSPJJD5%2Flkyzw1sqsi2sKRpQp26NAiEAoFOSooAEZVnf1Lf0kQW5c8Qfs0jAAA5PRU1jLZvC0mQq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDHM1jy6chTUp%2Bdks%2BCrcA7FOacO900UHrGDYYXzZ%2FWTVh%2Fj1T%2BgjjEnCment9hkMB292KBteu1rpaRt8WYLgvtzItlrbLwU7%2F%2FSGiX7LwFFdDtijdBYdx9S0DXyiKFf1HQimjlZW9aPepZ3e7qtQ3%2F3BgpDH6g9bLb2EJs2ndKZ%2BeBufSTU4sG%2BjUgBzSeJ0ljHgsS3Z8FfVq7GGdUMMak2vquALSbnGRPoJpwYx32TiMccGTa45yfqECx7wlmtK%2BPA5oK%2BLpyOTvi4xfRsCfVPHLRQCGmcRsIz1Ueg2Su2CSQHUewLBGrk5SYXJKNfH7JieDUcz8xL1TFA0qxhyLnhtFuuLhRl2QTkwJcSQY3JipUiKHBYDMXLgGyVp2GqhJT5yoAtKZ%2BConI0Vsrx0deQy3C0FNkgbieIgIj28lf%2BFiOewDIhD0rGx2CBTHbNifvB20ukuXZXhJG%2FpHJZ%2Figo1dzND5dsT6RIw%2BK0k3UQX9Zq8Wjz8jozlKq9JN2kONmFnlWHVA8GX7gKLgH9jJsxUx0k5AjOYAsXWdG5H469%2Bo5OlKt4rmbCmHon07xBRe%2F6zo7gEBnADcEinw%2Bmzb0fh5Vb6v4Rsxh2DKgE8%2BNFbbY6NVBJ6iNbXvE4ZQjBsz1NdBuudd2nfsx%2BxMI%2Blrs4GOqUBGi%2Byzsqa17axE3Y%2BBqmtSesM%2FxD9zSdQ1c2kcYA4CXKMf3mIwLdYMrcR3B5zJUJei5E8%2BfzuLLjB0RdoPpZVAfGcOXKH8RXfDmSXNYlxCB%2Bshvw7NOGdzPxYeRVJQ4IDtM1Kv3Thy4XcxFijoDOTI1puVpMD2C7N0LDlUStCBjqqk1TzrkhniYNqZy6O4Hzta8kRBXmLqrG9ChJOh7AZZ5YvNzDi&X-Amz-Signature=c9a0396966f14ebaeee9a34e0448d167b0454f604e80b592468105329548adbd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R3PX7BTZ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T104110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQCSZVEtunWI5FX42ECi1HBj%2BWas82v96ZtIARhl2RkqTwIhAO8bT0SFoKQgD2mE4nifUZh72xs4KjuU4jpZWSNm4x0QKv8DCDoQABoMNjM3NDIzMTgzODA1IgwkPvM%2BwAZxE6%2Bqu2Mq3AMuW2Pr91WMXrU%2FtkOg0Ca1oKg7cTJzAoYyEUePsCvtlcmgVzEJZEGxRCyuEzNnp2V6y9jJdfGCy9w0%2FT9fg7mVK6HaTE6FFPzpWer3WoTAOW9j2AApVZRdmqvgBfu4Etvf%2FxHswd8k03FYyfD%2BCbILFteDBdF9ma2Mrl5nHAHbd6dcRcrxTwohlHmcDAnHnervwfOg76N9WWs%2F0YOGn1kxymKAU0%2FxAsIO%2Fh02NvCRQdDref1zSe%2FKnmIe0yv93EcDOMNiytZBTNYNwdcxtISWYRguuLPMz%2FLp1nACx0Ywwc9efzZHIJrx04jvYS%2BPMxzQ%2FIkNuA3vHhb4veiuOBWRjAEAeDh7a7ngjbZSN6l2TpAohwaNnQM0wZJYi9krGQhf9RnKG2gBLn0sTbUqaw2%2B8XqE3IpzH4m1XDK8DqIlO9%2FwQSsCV8zVvA4R675paf1u5nWK1g4c2D5l1svbBI0NxJEyYgmk1mDlGmJvtaPS3DvGM9zj82agcQ51LYx3RDNEbxGYpvVpKuoDm75GqTMkd7%2FnE6cUmW1VDpVWuMO5XLQlNnfDXE%2BEcZWkdDHyqwiQc7e7AUGQoBJKl3gdbTDIYeISkQIbkJo7Kiz5jC7b8%2BEuRid5hFTvcCoOsjDfpK7OBjqkATbWcJ4czaaqosQmTkQmgt2wbCchTESB46kOc9ZXLzz2oCSQ0%2FxZKGuSfXn9yLn8mvr01FFOWp4%2F03WoKU6HA9R7%2FQuuGiyfVwEEufQW%2Fzb%2F4lzwVBz6LwfoGssG2z5xZYcUUXtCygvyy%2B9UNZ828XmOH65dFfJdNfSXUSHASXhh0y84s5DuylgSqIoUkBoYoXaXOl8pZ6H5H4yrBtq19H3J3zqf&X-Amz-Signature=4eed5ee0e9bb869d4addd09a99de70d648f337d4ca5fb7c0ad7dd8b2d53305b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R3PX7BTZ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T104110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQCSZVEtunWI5FX42ECi1HBj%2BWas82v96ZtIARhl2RkqTwIhAO8bT0SFoKQgD2mE4nifUZh72xs4KjuU4jpZWSNm4x0QKv8DCDoQABoMNjM3NDIzMTgzODA1IgwkPvM%2BwAZxE6%2Bqu2Mq3AMuW2Pr91WMXrU%2FtkOg0Ca1oKg7cTJzAoYyEUePsCvtlcmgVzEJZEGxRCyuEzNnp2V6y9jJdfGCy9w0%2FT9fg7mVK6HaTE6FFPzpWer3WoTAOW9j2AApVZRdmqvgBfu4Etvf%2FxHswd8k03FYyfD%2BCbILFteDBdF9ma2Mrl5nHAHbd6dcRcrxTwohlHmcDAnHnervwfOg76N9WWs%2F0YOGn1kxymKAU0%2FxAsIO%2Fh02NvCRQdDref1zSe%2FKnmIe0yv93EcDOMNiytZBTNYNwdcxtISWYRguuLPMz%2FLp1nACx0Ywwc9efzZHIJrx04jvYS%2BPMxzQ%2FIkNuA3vHhb4veiuOBWRjAEAeDh7a7ngjbZSN6l2TpAohwaNnQM0wZJYi9krGQhf9RnKG2gBLn0sTbUqaw2%2B8XqE3IpzH4m1XDK8DqIlO9%2FwQSsCV8zVvA4R675paf1u5nWK1g4c2D5l1svbBI0NxJEyYgmk1mDlGmJvtaPS3DvGM9zj82agcQ51LYx3RDNEbxGYpvVpKuoDm75GqTMkd7%2FnE6cUmW1VDpVWuMO5XLQlNnfDXE%2BEcZWkdDHyqwiQc7e7AUGQoBJKl3gdbTDIYeISkQIbkJo7Kiz5jC7b8%2BEuRid5hFTvcCoOsjDfpK7OBjqkATbWcJ4czaaqosQmTkQmgt2wbCchTESB46kOc9ZXLzz2oCSQ0%2FxZKGuSfXn9yLn8mvr01FFOWp4%2F03WoKU6HA9R7%2FQuuGiyfVwEEufQW%2Fzb%2F4lzwVBz6LwfoGssG2z5xZYcUUXtCygvyy%2B9UNZ828XmOH65dFfJdNfSXUSHASXhh0y84s5DuylgSqIoUkBoYoXaXOl8pZ6H5H4yrBtq19H3J3zqf&X-Amz-Signature=857b09c92bdb125c3879bcd41a734ea6a59194bdefd32e2c16b3e6aa4fb3919c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7UCDG26%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T104110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIE7xPkgZL2Fz9053vGly9JEIj1xnPJLYDfW2kDbOs5zMAiEA%2BomNIkWR44CeJ8zEIpDQu58g5iMqCy0LS0TIGHxUWTMq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDGJWHg3YZA0a%2BHvQ3SrcA%2B0%2FuK7boTVQG6JwvZgF1aTv4Er2cokFh2AXzLp8UOEqVp6jUzR14Hyq7R8T1qnqFi%2BsYuELfnsD3yhk0MkjJrSgAGYYS%2BmGjAv3e3UDzYjmHhgD87ubN6NcJwhFbOdXByyb%2FSSOJFyQKtwX3EUHFxYwm5l3nr0nJYuH0lUMyznY8xaFC97UfSEIRHnp%2F7Fb3cYjkB725oJMqVlslFFwxtzFIDz8HOTfjuCmf%2BKqnvNdBOwRzk7r7XfHWXzUcXi525mSYGbm3otCLlqXAtSkpflVyP0N38m1KR4oTg%2Fhdq5ZW%2FqQ89VYST1RT3HOy%2BqtnXLG3V%2FifXmRaRv7V3J05eRkNX2l1k6hOi8yLjDlQDMQqchYCSbUMpmcK93nLCOuysCPizDBmWqhZ5Vk4n1F408O7ArIrKGzN5a%2FRuxK3oUYXLM3Nm84hh9ILeD3pDPNOKYzf3KC%2Fat%2FNZoUeDYJ5AxXBYso9PlYZOt%2FRRHyzlIMcRY3IOSp0ZLTX0o5Ph%2FTVNX9HT2ipsel7QQfFQiMjJblfj0ZOUz78F5qmB2AZSRixbepBsvPOo391T2Z0BCcNviuklbbqhSJvBEmeOz1L0W28OvHmAFMYmdBeaBPOaz%2BCRxMPzEwoA9ZG%2F%2FjMOGkrs4GOqUB%2FknfNqd1N1A%2BMA%2F%2B0Eadfpy6bH9Tj%2BJPWIS4BYr7tU2UhksFIPB0VYw%2Bawi3Fja%2Bz%2FP%2FtIjHeK8G1cq85FTa5pOKvPB7oZDvnE7oS72VVL%2B1vxVMB5Bc%2FdBLwg%2Ff0CLZPC819ykketq%2Bj%2BgSAL8YSgMKTHlTAfIBUrC9E5eWPqQy3i8jFs12S7jUm1D7JZtIZdm%2BIiTMESiGXANa%2F6UqjlfSHi6B&X-Amz-Signature=d58014227b5f20895f4f1baf0c47256d273eb4716b40982b0beaba6eb0f4c495&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UROACDHL%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T104110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQDiQQrayGfMF6aoIdGuY7Z6RJxZOyYqdYqHr9%2Fk54aaQgIhAJZSUDpUa%2F9TUJ4u40ySjGvHCfapmcLzf%2B2MydDGtQVcKv8DCDsQABoMNjM3NDIzMTgzODA1IgywL4zSDVLfrwVRWAoq3ANoplsJbOy9wWBrrxtAuH8eIyB2zmZRjiqheqHxGO5HvFcX0BT0aLagPWc99h%2BQE0nNOUBo1eRxGtwB2g899B4dn1V99cR9tUPLv71ItBwuqg2DxbC79enpSZnPxKjdB4Uo7lcihsvfoFx61jTwx6x4qfadXR5zvCSVHAH9YhjarmGOhMAaHTvz1VUU%2FD1ATyMXa0akVcmtXDMTVFp1knjmRSzHO0KL60drWAgx1po2kJl1vPZff5WsL96Cem40dwpUDTRSKraBthudiR%2Fbgz8BU0E88iuFjjEWgHHj6YtHucVP3ypI9R4FcxgecbEzfbkQ%2Ftp%2FTjCDzPz1qXgZ04pyYrJxE1E2DJSxLqK8WppiBRK%2Bffm36NoLSjHrWE8cPN%2BX00ynEjOWdHAw1QK4J2RmJrWVYcC%2FpzC3sRdJ5lv%2BnB6x3xH2IiSSHcywgaH0FDb%2BWWbrY3uvF%2Feyv%2BVqDUdzKMDrJ8U0Z%2FChmXhItXoLq4sKCwZZrjh35a1TwDvwC2IaM%2FolTVo1cE1LHw5jwchJFj4NXlS1NdDNOgUBj94fXAaPO9FTcqyAfl3yjpsiVzK2N2KKtVx6r9zlqD1EvV4yv9X59vYAUv3fJgLuurVxQasRQ%2BjaOyvpQSel2DDepq7OBjqkAeu8CxpJj8xt9W9mpRtpUZtZNtIiI%2FWuIYJGICPS8vW7UqfU4gXbd6fDSSVyfLcHo1V%2By%2BDGj6qQK9Qn8focoVYSNeZPttCkFVJjaO19MQJaAhg4xKnlAqh7hrLkYgAYOvqaE8qZAWFoPwUXCqgBfA55iVUvOdtUFF%2BnVWATmTPPVorXuOI4BJxuZwYbKo%2BeaAMoLms5ieAXjpw3aclzv9fHdDT2&X-Amz-Signature=e836c4cdaf9eabb95903891e03e21087e4debe85edc8d8c2df8b8c4b8982709a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QIEQALJ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T104113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQC66ajnG2VIIcmyw2zNCeABqsmQE6sLnXcEauYq%2FuSTxAIhAPAnLqS77YJjE8yNSw04aWS5gSHpyQfkFdj4OR9bwwASKv8DCDsQABoMNjM3NDIzMTgzODA1IgyU9R90iTtl2S7z8jIq3AO%2FKkQ9zdRyoUlqejQ5M5mDGdEMdFedIRVIN2YfCecKGDYPqOQxitjGvjW45q4iID%2BqIJ4mMr%2FHgsWmuv2F%2BNIGV8FNyX0EDD0YgUR3GGjQ8PlmCBuYuiiAqqUBUbQk9rQ%2FCHaR1%2FpSWN8sYJYtxgcSieRq%2Fd%2FBpb%2B7qEz8x68fpgZXXMA2rNBhyX5VGdgePUt5DfCyL54TTyHOJRk28fHw%2B8G%2F4oqioOxoaaL2%2B3WnZniR4E0taRgp0hXEatnkxsgGgTMTHznNCY2tecO3Vw0YHNlxBR7wsYb69E4je%2FpJT0cs5SOKtjcXo6gm%2F21qRmzabO%2FX0I02ZN2x%2FuXypm24I5S3P4nYcYxpAP%2BYvtqkAWfjii7dCfJrc4brWUJ8G0IZUFITa8N6muJPmAeX%2FK42E%2B11KpVTDQA1gjYHoXqyGPDqWXsmRr9Pvz6wLBytzfqWVQIs6WfnGGHrIEWQUwzUWe3l63tNLGL96DaXkjPTZsCvhT%2FHoIDsOo2jmD6YFXBhlZhollZ%2BLTMmNxo8abIJeETOr2cDJ3sZJ0jk8aVwWo3u0caJ9NKDf0hhdchV3RsrHHZwLFoBPHfFpj23Bvw0Ol4iIvDlzl1vKtcSkBXk1d8r348JUOeDtPmzojCIpq7OBjqkAaQLDuyRmMEUyd8pgdWkCHAuUI38GCviVXWt62gxblw2FQ8W9QE%2BehUpW%2FGAsh%2FRc25%2Be4MPSPERL1smAwSvQmQ6uM%2B1gH%2FkQCZX5QJ9Qd2eTFCNMDKPqurYL29TUT6XFpbYikVBEvy27Erj%2BIxHNvw5WS04qdBrpaLtdqWq1vldMp4bL6Zp%2FfRMPV2%2FvR5uS%2B%2BSPsc%2BLhPa5RA1%2F4lkPoUXU5Zr&X-Amz-Signature=0049b7f13b9b195fa1a638f151aaf1a6fdc6facfccbbf30181f30142b4d53a8a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7DVRZ2R%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T104113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQDwfwayE8LJGHA380gE3b9uRcyNEderbK1Q%2BUupuWBz1AIhAIy%2BrDkU48%2B4dY7QsUrR2eDB2qefau9acUltr5%2FA1eZJKv8DCDoQABoMNjM3NDIzMTgzODA1Igz0xP9b6%2BPMR6BmmI4q3ANi6GVIS%2F3pQ1%2FuK5TK9mw0WOHVCLHhzr5Df1YOSzih%2BYWaHtaqT9IMPqhO68Ufu2wnUbpn6Nazfdj0F%2F33mcHVaHP9kczNLDALJw%2FosOFz8urnZMKTIjKMmuS6MLbDlSAD22kp2fWBWD8ALHrq2lfFLTGEV2NXsspKo004B8hc83NtJ9WQB30Nzmz4JYnuBCs2Ipbj5xy%2FuCnD0ud0YL55EWpZRY8sL%2B%2B1KS4due1gmvqBN26Ky5GxT%2F28TldVN1zVZVJCymmid0JwzPqFwz%2FXYNe3OydepXqm7jR6yCUtX7n9OdjZxBJsaVAjWU4F3w%2FEgIDdB0sos0%2BlpCXwFSmjRc7xnEyJ%2BytzfKOMsqUc3JwI8Q%2BLdEflprZV%2Bx5cEcYIqquvjfCkr%2FDqJrAAPypdXomyPQ0KM92D4JctaoYG8lxleAJ1t%2FnObew2Mm0meV%2B1lWJjavYxWp%2B66EcC3DgNWPUoWHrlXqT9r4ON2DTTE%2FfJcykKLQHJ6T8iCpmGihOmVi6KIAhGv780DFFX3XUD2H86lPnrdCPqA7LYsoXanLogzxVQ54iKKAvE0NcDwaTmNqhtX%2FZBztY2mIE2t1dQJDMVNgi63tLnNHC%2BpKujZRgooaDbjZIjuklx6zDypK7OBjqkAZvUsoIwtL9040Yjz13UgKGgCRK3R5Uc1SsP4T8BlXLJjc3lYGozuJrT%2FMvIhaZuFJe22vOLmA5FEjAy58jYRK4LMA%2FItlekBCU6%2FOlZvXz722ChEHbGA8HKUf9vF12ertwckLOl4QzdM15LS9723LATabbnW3cTpmYgeEbHdlYWjlk8Fhbw2aflsuK77jXdaoVZ2Cb165FzoJhOgMj0ztYRBNp7&X-Amz-Signature=aac7df86b8dca41b621bb29339a35a68f84575ca6e02b1cbfb236d04fdd2eec9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7DVRZ2R%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T104113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQDwfwayE8LJGHA380gE3b9uRcyNEderbK1Q%2BUupuWBz1AIhAIy%2BrDkU48%2B4dY7QsUrR2eDB2qefau9acUltr5%2FA1eZJKv8DCDoQABoMNjM3NDIzMTgzODA1Igz0xP9b6%2BPMR6BmmI4q3ANi6GVIS%2F3pQ1%2FuK5TK9mw0WOHVCLHhzr5Df1YOSzih%2BYWaHtaqT9IMPqhO68Ufu2wnUbpn6Nazfdj0F%2F33mcHVaHP9kczNLDALJw%2FosOFz8urnZMKTIjKMmuS6MLbDlSAD22kp2fWBWD8ALHrq2lfFLTGEV2NXsspKo004B8hc83NtJ9WQB30Nzmz4JYnuBCs2Ipbj5xy%2FuCnD0ud0YL55EWpZRY8sL%2B%2B1KS4due1gmvqBN26Ky5GxT%2F28TldVN1zVZVJCymmid0JwzPqFwz%2FXYNe3OydepXqm7jR6yCUtX7n9OdjZxBJsaVAjWU4F3w%2FEgIDdB0sos0%2BlpCXwFSmjRc7xnEyJ%2BytzfKOMsqUc3JwI8Q%2BLdEflprZV%2Bx5cEcYIqquvjfCkr%2FDqJrAAPypdXomyPQ0KM92D4JctaoYG8lxleAJ1t%2FnObew2Mm0meV%2B1lWJjavYxWp%2B66EcC3DgNWPUoWHrlXqT9r4ON2DTTE%2FfJcykKLQHJ6T8iCpmGihOmVi6KIAhGv780DFFX3XUD2H86lPnrdCPqA7LYsoXanLogzxVQ54iKKAvE0NcDwaTmNqhtX%2FZBztY2mIE2t1dQJDMVNgi63tLnNHC%2BpKujZRgooaDbjZIjuklx6zDypK7OBjqkAZvUsoIwtL9040Yjz13UgKGgCRK3R5Uc1SsP4T8BlXLJjc3lYGozuJrT%2FMvIhaZuFJe22vOLmA5FEjAy58jYRK4LMA%2FItlekBCU6%2FOlZvXz722ChEHbGA8HKUf9vF12ertwckLOl4QzdM15LS9723LATabbnW3cTpmYgeEbHdlYWjlk8Fhbw2aflsuK77jXdaoVZ2Cb165FzoJhOgMj0ztYRBNp7&X-Amz-Signature=dd4eff2193654e970cffa58bfb265cb5623bf37af093ab3a2dd085dd8adcb292&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOJ2IQXC%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T104104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIQCJ0eGUVxJR%2F%2BHmQ7VJKUpd0rTfphcyNlZRMP9A%2FeZTKwIgA3v50Bcd%2FnE9NCD2YVl31HUwfi%2BZob4pkyhSkysKj2Qq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDJ0P8DJyWAev7PCydCrcA3LCUqYhSbifX9HvBBeP9UwDErkYaJKjkKiCVoGsVbkt5SC%2FnaASVlCyviHqXl4jRxxHyw8rFfyaKSO1oUp%2FB%2FfcF%2Bn6rr75wKGGCCtiYAOt0YLPMz677CPdaEUZckd2hldC%2BFzwohTomN3%2BH5JZ9pykswfi3rC3TVr20eBN%2FhgWvUF2zgHZYsBcvCoKw%2FNsn2seW3llJI%2BQn7IJU2%2B6qn7S%2FwbwPxzny54UT3hUts0FnbSFAYTBtvSxOb8tXraBMtOPMWmeeWOG03Kc4ic9IklPinMdW9bUULI79zwQ7T%2FWRqAWU%2Fse5X9fiGJ%2BIq3VemxNrhe2D5KKUB3zju3VvNwyd6aZfTZ4R8PpmbKpDt9UTsjisS1aS%2BFWXDpKQS9uyJLNuUz90UVg6%2BXSGl%2F2Y3i38HtTPRBMpp58ktjVQFP1iKRaL8KbLWRfte78phug%2B2P37MZVkvFBmfVevExi%2B8zyq%2FmiK8l8VwgxHbIQMGCelhHPCicZEDrysEAneoSxeCmUb6gcA%2BE1Wb8%2F%2Be0Va0iaP4ivcDOetVUZGAkicpU%2BTpTTf3Y1ThhpK0yv4O%2F2L3mGVRBDVsJCdITnpMAfoS82PGtstUZChunGgFu9nGhJPU2g8ahVFzinxI2sMIWnrs4GOqUByXDTbIHxjjCJzGYW%2BDfrkUnc%2FJyfbs05cww8bpoenLktOTr01vPDyslulRR%2FmrSWpwE55R1KeBUAIZAAvLF9wIVO3v2bDT82UhKC1n1qR%2FXgmd%2Bi53CDfNkiR0HkQ0BDFO3%2FA33chu0Ba22rEfpgZmpYswawhrimIEGGK6DSToOfA6iNUqZVi0zRrkO7wV9KiS0RKrFB73N2mf2h82cOyzxgUF7h&X-Amz-Signature=ac22491b58cdfc769e0dee7216b0dce51729fba1dd82a368d9ab06efcbe65855&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ROLUGTU%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T104121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCICHBc9SxBoxImCkW4i2mBMhyhxcvSE9cYcnxu%2Fd11roaAiBsv3TI5z1EZXAQ9oi6Dua6MOB6RJ%2Ffp5B0wzL1uXgXcir%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMcGCkKO567gfM%2FasCKtwDUlcUTfL9oViX%2F8mnIZTw3faJrsUoFBnRw%2F0vLRaftcVFElsSoGcq4STml7kZa7Iw0hTqPUk2A50EGxbeTLp4UW6Vy664kbpXYuSd3wTMEUIgU37lEjIXPvlQspBtq6S6Dktu7K7Kf0Rt6gt%2Fb%2BXJML56z5wlKRLCTzgVpxzc8VAjhH7b6VqSJfradeB%2BdjQUl%2Fpy%2BzTIKq49Ve%2FRIZACEypaZMHFZ6EK7ZIASTnm7ggt91RgDhZeucrnB1hdNSytU5VebjYb88RAWqnntDS9E5LUyIqs7A%2B%2BYlHLLIrTRYnR6k1m5REcVHJ3sDB1MDBIm2tsGmmPLQKrhuCKuLrag6PHtfHR07KSoUjOQyf34P7VAXFNx49NkqSE14UH9P98dXoLXLC2e0WXyQRaLVNiNy1jMzk0pNVOFVkH94z4zQ6rQ2%2FrzIK20NPildlZaqk7kX6FysAsihMAq9juctpCGulkHNhFpbDYeHqUeTULgUcwpOpQ0h38BGhwudMsZHPQraz6yBIGMmsk5PanpK%2BKmrXREC7hvxBnJ%2B5zwC5zlLxnUcw%2BfSXL7wBG6EHin5Jx1BQ9xrAzTKvAEaOwuzrehWkCvrHQzLfWM2o2Jqx5N2EU1jCH5uBOOwsdVJUwkqauzgY6pgH%2Bobc268BIJFa4zHGUkqqrA2%2F08KN%2F8bu3YZ87sOUCQawXutb18dwU46mT5gtKzvmO7nj22HU%2B3jrEyQKdfOF32NChHCE3MJuKfHhFTbOx0c1m7g4htg8IY8ozUpyskeC9RCmEg7dlf9zu%2FcxKzPsWx69qi2tFgqxtl4DRxSemPJAiLeX1wYifcecBIjQbwNoO1r528%2FjrlMeR7au15m336DpkZ%2FQ8&X-Amz-Signature=c2194d657c956baec675ec1096dc66c0604a97b1973fcbc5ca5b68dba832d83e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ROLUGTU%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T104121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCICHBc9SxBoxImCkW4i2mBMhyhxcvSE9cYcnxu%2Fd11roaAiBsv3TI5z1EZXAQ9oi6Dua6MOB6RJ%2Ffp5B0wzL1uXgXcir%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMcGCkKO567gfM%2FasCKtwDUlcUTfL9oViX%2F8mnIZTw3faJrsUoFBnRw%2F0vLRaftcVFElsSoGcq4STml7kZa7Iw0hTqPUk2A50EGxbeTLp4UW6Vy664kbpXYuSd3wTMEUIgU37lEjIXPvlQspBtq6S6Dktu7K7Kf0Rt6gt%2Fb%2BXJML56z5wlKRLCTzgVpxzc8VAjhH7b6VqSJfradeB%2BdjQUl%2Fpy%2BzTIKq49Ve%2FRIZACEypaZMHFZ6EK7ZIASTnm7ggt91RgDhZeucrnB1hdNSytU5VebjYb88RAWqnntDS9E5LUyIqs7A%2B%2BYlHLLIrTRYnR6k1m5REcVHJ3sDB1MDBIm2tsGmmPLQKrhuCKuLrag6PHtfHR07KSoUjOQyf34P7VAXFNx49NkqSE14UH9P98dXoLXLC2e0WXyQRaLVNiNy1jMzk0pNVOFVkH94z4zQ6rQ2%2FrzIK20NPildlZaqk7kX6FysAsihMAq9juctpCGulkHNhFpbDYeHqUeTULgUcwpOpQ0h38BGhwudMsZHPQraz6yBIGMmsk5PanpK%2BKmrXREC7hvxBnJ%2B5zwC5zlLxnUcw%2BfSXL7wBG6EHin5Jx1BQ9xrAzTKvAEaOwuzrehWkCvrHQzLfWM2o2Jqx5N2EU1jCH5uBOOwsdVJUwkqauzgY6pgH%2Bobc268BIJFa4zHGUkqqrA2%2F08KN%2F8bu3YZ87sOUCQawXutb18dwU46mT5gtKzvmO7nj22HU%2B3jrEyQKdfOF32NChHCE3MJuKfHhFTbOx0c1m7g4htg8IY8ozUpyskeC9RCmEg7dlf9zu%2FcxKzPsWx69qi2tFgqxtl4DRxSemPJAiLeX1wYifcecBIjQbwNoO1r528%2FjrlMeR7au15m336DpkZ%2FQ8&X-Amz-Signature=c2194d657c956baec675ec1096dc66c0604a97b1973fcbc5ca5b68dba832d83e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X7ATV523%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T104122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIGU6wSl1ZyBdttrLGHMQ7GNUKvCOKt6iQHijctA9oQBQAiEA3SeGgXVG2h%2FhaxLeSp%2BUHqLIB7cFYbbDtNgaZ0plngoq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDFs5BQPPBbLtS42bYircA7PUFVFHdgh4gM4sglxPWxtUWYHnz6S0NPA9kQufe%2Feryr%2Feck9%2BNyDTQJR%2Ffs2csMc8t7NDwg04FLdjfx%2F%2Fsn6okxIK4q9yALFcxaH5TMg4waiMMwIrgX9Ldq%2B0LkBwMy9vdL4khnAiroR%2ByHwOCp4FpEQEywsI8YpNWKqZEQ0UywUvuMR%2BmSZFKrSVr54FjDPOy%2Fp7VB5wIez4PaczlRS%2FHdmC9huPCk6zkvX7t8%2FcSczRtY39cbAAJm41tou5IDuyiGVvDbnxIkxGdWAZiOeomceeY8oSqcYpTFwZ29ue7JMtMMIIcpPLFZ%2Bw%2FiTXn9Fg1dtBF3GIqYD%2BEwtN76SIwFAnyqHs1RXcysM2gG27vLEsu5RQPH47mmoXKMEHXrPw%2Fi3LUHPFYpmRmiTgjKyhpDx9ZvdgasdkOm4VehfOqRJiX0KJKZ%2BSmn4YiKSTcclaJNIRwARvnxEdEaaURSUrYDxfwVZiqtoXGDJzCJpCn2AmTvw2gsH465JhIM8%2BAHVJLcrF18Usumnd7Ya6JNoobjTPEXNimMPJvtUUrvwBhpo3WV41w76j%2BUL7dNkSDRcMTJRWUS5D%2BMYof7Jg5JyBU1KP14feawBhhNqtO15B3GePrw07uemjCNelMPqlrs4GOqUBxuH6xTZHuI64wCPB9JXOzWMy75gy8ZEvGmIubQ3DqAeKlCIKqHBCDAoqRrDeTIoGxSAYIUZhfzXwNnP9FHs4NQhLk%2FetJXSsJdl9hqe43WgMf%2B0X7jE87WUQzD39o%2B9OQadb7R8sDwF%2F71P6dmilR7tU2d8uPxoNSQntCCQlBn1rPZY6aSMokECKERmTHlaJ4OA6WQYR1ZmltvQqEmg%2BZKg97jAv&X-Amz-Signature=caecd6e322ec4be0ea5c782f344cfa208b7ac2c85f0b81524851f4eca51b55eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

