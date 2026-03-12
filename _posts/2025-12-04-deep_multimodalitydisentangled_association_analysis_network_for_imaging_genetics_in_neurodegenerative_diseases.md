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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663RJNE7RU%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T154306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDH45k6Uf5Ko%2FglR%2BSFbunlFDpE7hG7oDGvON2y%2Bzc%2BpAiEAtyUhez2je27ENJyBs%2BzL6K21jnunCuDsy3kq4pwQqm8q%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDGlvJHD%2B%2FJ2y1gVyCCrcA4YhoV%2BCIK9RUwUED5QVrn5iVjdfAZZn%2Bzwp1rllORxE8ipY4BV40StVUiNN4uge%2FemCLOlmOLkpsOGOiQ%2FklEP6IFDIv3UOTDMi6QwjeeXrltV6F7JFDeQU3gdiuZV4ZSZ%2Ft7estae9oRib2evLw1OWSHcuTPvgNH5cVeDJXd0Nqh5vCwq3WEA4S%2FFs0nkBC3tJ7TQPW3FeKsKXtI3GSaXeTZP9Nljb9IIEvz5pw3XVe8YNLdm5zaGlHx9nxS30yPGkHpIHeGWFnKHGMVSC9KHQq3kbHn4brf5Er14E5T%2BJGoob2x878kqWx4Mv1pbI1qNgnrSgnT2OCjylsROqRAaDWiyJTnt24ZIXETKlskvTTE6aR5CzBVsixNuf5%2BDoZXiugTUn1obJexP3%2FU9WHrlktVHwDyO4wG7nGiDRnaRr8EFliIjZ5n9hKTd99eCCPptoQD%2Bk6DJqH%2FYryCqB4NKNyliOQYgUf5gi4%2BZoHFIGS5L9itLbeaJoRtN9gSLgpQfyixfCH2I2XTNZKL%2FRbsLhOzVdiBE9Cc%2BiR1u0MwwXnUxBtZECTQF1ZQKPJcZxlwn25cDE0CmsrMT3HJ1xKajvaAYNKK3NCU9b89lIXMhNRDgwdoUYsntIJqj0MI28y80GOqUBa0fA6qSBSdOTyVYv3zVUJ3KoMub02t4QeulC3IrrIai3NyNtbaKFyWoo%2B0v6VwKU5G8ME9QkoPkq0W3ipvPiMVN3nLeeu9MyQCeI2AEMBNpzETXb4Glvf%2Bl30KcLUaszpJCSgxE4ZAwf%2Fhbs%2BTu2q4aCt%2Bpj14CvrSsrBCbcpkEPbvFO%2F%2FLgbCJ4tYvqW0CDO8KiITFkr4%2FA0MTGX8BOyl8GQVct&X-Amz-Signature=1c342c3aa64f6ddf2ee4f60f9fa2cf8a8a715f8c6d97c4092a94a28f7d95c32a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663RJNE7RU%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T154306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDH45k6Uf5Ko%2FglR%2BSFbunlFDpE7hG7oDGvON2y%2Bzc%2BpAiEAtyUhez2je27ENJyBs%2BzL6K21jnunCuDsy3kq4pwQqm8q%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDGlvJHD%2B%2FJ2y1gVyCCrcA4YhoV%2BCIK9RUwUED5QVrn5iVjdfAZZn%2Bzwp1rllORxE8ipY4BV40StVUiNN4uge%2FemCLOlmOLkpsOGOiQ%2FklEP6IFDIv3UOTDMi6QwjeeXrltV6F7JFDeQU3gdiuZV4ZSZ%2Ft7estae9oRib2evLw1OWSHcuTPvgNH5cVeDJXd0Nqh5vCwq3WEA4S%2FFs0nkBC3tJ7TQPW3FeKsKXtI3GSaXeTZP9Nljb9IIEvz5pw3XVe8YNLdm5zaGlHx9nxS30yPGkHpIHeGWFnKHGMVSC9KHQq3kbHn4brf5Er14E5T%2BJGoob2x878kqWx4Mv1pbI1qNgnrSgnT2OCjylsROqRAaDWiyJTnt24ZIXETKlskvTTE6aR5CzBVsixNuf5%2BDoZXiugTUn1obJexP3%2FU9WHrlktVHwDyO4wG7nGiDRnaRr8EFliIjZ5n9hKTd99eCCPptoQD%2Bk6DJqH%2FYryCqB4NKNyliOQYgUf5gi4%2BZoHFIGS5L9itLbeaJoRtN9gSLgpQfyixfCH2I2XTNZKL%2FRbsLhOzVdiBE9Cc%2BiR1u0MwwXnUxBtZECTQF1ZQKPJcZxlwn25cDE0CmsrMT3HJ1xKajvaAYNKK3NCU9b89lIXMhNRDgwdoUYsntIJqj0MI28y80GOqUBa0fA6qSBSdOTyVYv3zVUJ3KoMub02t4QeulC3IrrIai3NyNtbaKFyWoo%2B0v6VwKU5G8ME9QkoPkq0W3ipvPiMVN3nLeeu9MyQCeI2AEMBNpzETXb4Glvf%2Bl30KcLUaszpJCSgxE4ZAwf%2Fhbs%2BTu2q4aCt%2Bpj14CvrSsrBCbcpkEPbvFO%2F%2FLgbCJ4tYvqW0CDO8KiITFkr4%2FA0MTGX8BOyl8GQVct&X-Amz-Signature=1c342c3aa64f6ddf2ee4f60f9fa2cf8a8a715f8c6d97c4092a94a28f7d95c32a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNJOIES6%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T154307Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCMm%2Bq5jpxyDZrTcltj%2F%2Fx0CNaA7ujivaKq5BFQTFcPmgIhAIb3YAYqvuPivrMCXNWSvQ%2F1h2wS6l4HBSuSlZDmxpILKv8DCHkQABoMNjM3NDIzMTgzODA1Igw98a49%2F1pSkxnJAHYq3ANxBSoqNlCOlTJOv3S7GSfOS5E9quSwGt1YJN0%2BrYz8JGog29SA2FmcKcCrceePc1CI89SZNe6Yt9U0O2sS5WRO6Kq%2Bt%2BBIpwkiJbKdXO4DTp8AaI5lbf0%2FoNImu%2FeEmj%2BRsyyZUgc1HtwLacEHmoQzTUPZr1orQ146Mc9WGLK17beQc7UZ4wUEqooqyHOZyTUdWg6ZRETrMBB%2F%2F%2BY5zFPCBeHdDs4KkZWG4rF0hRJlq4DJch98L%2FtTAgDHJOzTUfnDwjBkeIwUum8%2BVqnEMzKQnCH6qrapiQ4zD2MjLjMvdH26eTptzQafEh%2Fw9F6kRa4F85PDp4f8oSsPtn2W9xzIu0fl%2BxNjSBWEHcIQxNfUC2LITiyRhF87SLphAp9oE2aN4Qa3bPbIkvejjxr0NU7F1V3fN0f3G%2B8Azjj6%2BvEZggzv66ni1kZj5OUZQWaBXjWrjNQWGBgi0CPxQ2C4T3haP%2B82n%2B3tSRQjAlAdHCd1BjAVSptmFwsiI%2B4wrmNdHKmvZ%2BAPjxnBxVIkA6M82BCbCT6aNKFsDBbrdMyX17Ck67vXuKpB%2BO0%2FRBpjiSrUV1IohvDgRZgkSetNA6RvK9yig7nnCvRj%2Bo9dCJiIKfRh3NjWbWtabBxtsquMmDD2vMvNBjqkAQIJJNGxvq5nyMRN9UBKHO9oQ4sAAFz0d%2BMAoyzkuRP3bPfY2Xyl5wAVaOKJ%2FF1o%2B0E01a6irHRi8hQc9N2RHUQ0uozj45ifevOqAci8Bu7idvvkUA1yMrraVsV2uAjhGZBBAB1lrHLfN%2FsDbZnSWNdMVOhSeIVpjAnQps7HsWw2MUsl41GLMJOtjhTtgVhM1rIyMXosxGQRxRf2tPDgV9p98PDc&X-Amz-Signature=9d54dc5cf6f05b31c7067601303f1941d8580da47220fb0b6655693df1e7e4e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664TGFBWJK%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T154312Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICFGvacJwM%2Fp0je3qT516CmO%2B9lqlVLeq3vdrqPoQ5g0AiBYJIwTuj7FvsemrWYwIRc1tqtfxwnxnl4%2FYdxwBhWuKSr%2FAwh3EAAaDDYzNzQyMzE4MzgwNSIMiOnuQS8tmU7eRxaIKtwDfISAJ2zBryYjb98aoKGy8yEOkgJrWK3l6CGofAxLLcKubN5epelLMqpuuD1TsgY72DGepgR5vK%2BKTxy3ZqeBCFTUkL2n7Al40Cnt9JWLoDsxjUTWvb1qh8l66vaPB3GpVaqS9PRy%2FuHmm%2FbADfn46azzJvz%2F2nuhPy8rf%2FKay1M79C48ufq5ifpUqOu0BGYsaMbMEo9xUkUMQ1tHE3iiZJ4Ub5vE8UHHRS2gi2bZSENgcA1QagvUL2Q%2Ba24n%2B5LMG9kYYB8W%2BWL%2FPKV91TUab%2FCNqPjVXzP3XM3LaJPfvfbDVwEj6SFIvunOb8HpbHQhRvTiSRmzwEZlz%2FxeWMu3QLkqx%2BZqgcW9%2B50kWUfznCb%2FH2O1vfLbKZ7T6ufPRXa31dIRZLqebtF%2BZAKKF%2BSll4WWKOYY1fJo2R0LFT8RgnqkIy2a8zX4P3vnuJc4s6u6CN5vPMP76rjImMb%2B%2BeQqVUmn8q0rU7w0bsp0KofwB%2F5kr5tuCaNNyyudtEKsomHgdLrfH81QTd4BtYYLUybyakIV2NOC2ff5jDe98I84SRHPNM3gDzb9mec8Ti3JhsV%2BhiICSFyYeRllX%2FdwKFnWaUBPi1mI3SFYr%2Bv2QRTqVwNfTVten2pPlZFUdb0wyJHLzQY6pgENn56g5MOl%2FnjB%2BI%2FGf1AGLkU7gxQtL2nN8ihZ7Si8y78E%2FHr6OWNDJoOnxFmpmaaLq3VSkEhf8m9Ie%2FIfFoVZCpsu4e44%2FMZYpwT55s5pv9YwEsIbA5MTE253C5v0dwJhsrpdF6Hf8Nc4DIdlywhuaN%2BtNgcI2zszYz9xL%2BHWICZjDXjI4Mq%2FztnJuNbNdfmXAOGKa4dtPkeCMgxH%2F3aKy0MSjm%2BQ&X-Amz-Signature=f763e8ffce3aa76ca768017d941c739039ad34c9ff524f7fc7248b6221b88832&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664TGFBWJK%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T154312Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICFGvacJwM%2Fp0je3qT516CmO%2B9lqlVLeq3vdrqPoQ5g0AiBYJIwTuj7FvsemrWYwIRc1tqtfxwnxnl4%2FYdxwBhWuKSr%2FAwh3EAAaDDYzNzQyMzE4MzgwNSIMiOnuQS8tmU7eRxaIKtwDfISAJ2zBryYjb98aoKGy8yEOkgJrWK3l6CGofAxLLcKubN5epelLMqpuuD1TsgY72DGepgR5vK%2BKTxy3ZqeBCFTUkL2n7Al40Cnt9JWLoDsxjUTWvb1qh8l66vaPB3GpVaqS9PRy%2FuHmm%2FbADfn46azzJvz%2F2nuhPy8rf%2FKay1M79C48ufq5ifpUqOu0BGYsaMbMEo9xUkUMQ1tHE3iiZJ4Ub5vE8UHHRS2gi2bZSENgcA1QagvUL2Q%2Ba24n%2B5LMG9kYYB8W%2BWL%2FPKV91TUab%2FCNqPjVXzP3XM3LaJPfvfbDVwEj6SFIvunOb8HpbHQhRvTiSRmzwEZlz%2FxeWMu3QLkqx%2BZqgcW9%2B50kWUfznCb%2FH2O1vfLbKZ7T6ufPRXa31dIRZLqebtF%2BZAKKF%2BSll4WWKOYY1fJo2R0LFT8RgnqkIy2a8zX4P3vnuJc4s6u6CN5vPMP76rjImMb%2B%2BeQqVUmn8q0rU7w0bsp0KofwB%2F5kr5tuCaNNyyudtEKsomHgdLrfH81QTd4BtYYLUybyakIV2NOC2ff5jDe98I84SRHPNM3gDzb9mec8Ti3JhsV%2BhiICSFyYeRllX%2FdwKFnWaUBPi1mI3SFYr%2Bv2QRTqVwNfTVten2pPlZFUdb0wyJHLzQY6pgENn56g5MOl%2FnjB%2BI%2FGf1AGLkU7gxQtL2nN8ihZ7Si8y78E%2FHr6OWNDJoOnxFmpmaaLq3VSkEhf8m9Ie%2FIfFoVZCpsu4e44%2FMZYpwT55s5pv9YwEsIbA5MTE253C5v0dwJhsrpdF6Hf8Nc4DIdlywhuaN%2BtNgcI2zszYz9xL%2BHWICZjDXjI4Mq%2FztnJuNbNdfmXAOGKa4dtPkeCMgxH%2F3aKy0MSjm%2BQ&X-Amz-Signature=529a5392f4ef83ac5b8d33036d1763f36fbe75e2acfabf18ced28dc8120c7333&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUCJ6STN%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T154312Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFa%2BOUmEIkot%2Bj%2F8f2sUqWZUSILFCEgXvB1SoGCPSxoOAiEA9PNfRJQVg2IlGC0OgBXJ9H%2FqiuQOng2zbgLXUW0ceaUq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDDm39mWA7xdRy5XdbCrcA1qwUkeH1dKfFqwet6CWCpr%2F2H1xbdhR4rCJVqswGYMAaAx5L4ZqDO7%2FI3Apoh5WT5PMtovBglyrTEFg%2BvCf%2BUGGrt1XZUT1HDuX%2FtiKsDvCHTTORCYtm4k6avtdQrBP%2BX6BkfxnwSir3XmT%2B4Uk57g%2BrIPTBgQWAB8hV05MciiPuoJAtGRpn0jXBYAZTXIhjGMLD59UoeF9QbsgT7rn30Kqdg3Z6iZ7Yn5cUIaD%2BWgze6FlCc2GrQDWbhtMS3sVE72C1c072zTJlBxuzksKimPwnX6PpZhfYqveU6FwjelLd5cq26oyuPixwzBtj63aj2MnmxqM50crXKEo1o5QsSP8FpMiansu8wr2xP99juW3Wj%2F6X%2BlCW%2FcyK3W2BL%2FWlniv9f0NDEllly%2Brr5HFPdXcLPj0LLumPLXB9JAMGCAbEYxwTTYDYuQn9Du4dHiOypc6kNcR8cltLsip6JaVjKMkVF26ZEnMdOQ6DNVh8SAswUXpnRUUrbL9qm4zd%2FYR9Jl0W5A%2FJ7IbS7YY%2F%2Ftisjx8HP50gtb1DSqma5ZKCTOJg0vtYKkPkSbOGlOoYhpwtn%2BlWYNnZ34m7S4byJcZ%2BobX%2F7GWSvJdBaP1VX0mHlpXJXlhwMniyKHjkDumMOa7y80GOqUBTQEznK0rXO2z1OkDIdeZ6S4OBty0xxyZM8vcHnaNgvGmhQ8kLSHGgIK%2FQudkFuAg7SRShgYvSSnnCqdqtkJejdUBjUyLQ6iW%2Brt%2Bt4HQUMuz89RhMG4HBuzL%2FFOw%2FZynJ4leQf2djmKLoIYKpEwehgRSxT0eP4hMhoDpk7Xr1w9yqvGgIOJO4bSnrui%2BlozivW4S7ejSHsER%2FLYDX2bS82UyPmWS&X-Amz-Signature=48848262d0f0817bac39e9e1cef3a7a8cbcfe48b336583b8d849b9155056ec7a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626PUIFSP%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T154313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDU571zc9Qjh06%2BS1g9heu280qZnVtLQGKqdL6K36regQIhALX3CuMxBNIezRIUtnUfJmUwhRrZvvhUf27claVJMZIxKv8DCHkQABoMNjM3NDIzMTgzODA1IgzX47Sb%2FrPuQalqmwYq3APrPOCtaAPe2LjDD4cRqXu%2BlDI%2BpXSBF9E6Ti3rBJFIqF73yUnpOb%2FX7obv6WBvLOswZqs90Z%2FRf%2FmES6DN7DVDuAfDijdSsQSpEycLbJ4DpBddzMUd2tMzJ5kQiQl6rMsPvO%2BQ42ttZE0mBZRIIyrDN7KNgJYSDa5jMBWMwD0QcrUduQ%2BuKMWSEQNPswuwz3ieQ4YTyOD3Ox1e1m55Zi%2F%2FeFzI0JI1kE%2BIfLUdwi6xQzsYdCMowD1jSWZXNrw8WTVHEwPa6QcshC5%2Fi9mjItN5cnBF9nsK90SsndQ7igV7GL9RYslRn57Y%2FO0hi30qy3HbDBOOt1j1uFUJq7pv84gkDkkloLmIL505R2yVdeXAMNGeY2WTOzRjLDuYxmh4YwCAWJXTGcF9cEzSUmTy60vvt1SqE4ar6AFf0G1XCACy1aKOIA%2BRwReb7wlUvNwCrMMAwJvhtikS0fjuJf%2BINo23GfhhZZzVr2%2B9zMOT5ga4IwWx0nJG%2FrTLspbJeSK9252Si5VPOXQWArOWMRV6%2FyLDQoxIAd6rYo3tbmZqcrqzMQxDsuQvxbIfqWvuikW8yKdxWWn5tBgyI0P537w3IyGuLAGd67vV2HQ0hrqgp6M8zFebOLhZCfYr57RM5zD4u8vNBjqkAQGvuwmGIp0kt%2BR270TZvPuNWTqRZqU8JZF34bHGVJKc0u89xMlR7IsIcW5jpYqxR%2FnetGMmBw90oCj%2Bxdl%2BKOD40BedyvCtSSipNk8kFhKsU%2FNhR8Tjm87jhqxMD4IU4i%2FJ%2BqQxfVIsa%2Fxeuo7iAcjdBD1%2BD2Zbu2HntSXhkDtwD9nya50YTL7day6c7kkr%2BBw24Iax2%2FbnQ1WUBn43dI5dl8wh&X-Amz-Signature=0e64f2532431411fc6c5c67bc4507ef64f656335912b0dc608465fb896972833&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VHTX7M6%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T154315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHyYs8JyFIC45MXAWYLgZJGtHFDpdiVsMWy3KGiQaUH6AiEA9ajYPo85YdCJsEdHm6GlXKnWCDaymYT%2B91Eg7RCdB%2Foq%2FwMIdxAAGgw2Mzc0MjMxODM4MDUiDOuTIDrSZsj%2B5fGwKSrcA7thVExTEiZJggmF2bKCPrSZ9qVHjCpEZhF1rezRb1QGmj7PP61LdLwTCdtZecOiI4plahgn%2BDSzDyDXeWUupvVmqxg%2FNcjZB8aN092qr%2BTInT2zg2R2t9MNuDby16hUSYL%2F3YgBFH6pSjKekTYca4MDZMy%2F1%2FxvdUeY50Z4zXl4myEJDNx6M9QV8w6dtgpeIVdhA77evKnWBVlAXmuFi9SApLoR23igc736T3Wyl139ME3YOQ2oZuG8yVJMVVHYXIjDvV5PhIQF4DY8bFnMPvczCKrNRvrXwmib4C%2FBI%2BLwTuyqIp3OdEtId%2BfFEsi8MktPnWqXzpUfWwp769M8BMhlTzzuOl32KHDY7qhCH%2BC7MYfbpUyYROfeavIyhjL7NYwFWh%2BIi9%2FZ%2F92ap8fWmj7ow3R1n%2BGuW%2B8fYWDknDg63Bu7Gx59lOoZA6Fgpj6GbH%2BgIxbWRzvX4VhgAD5OrInaSoGe6qDIsdLiv1AXiilPfUgVA4h%2BmR8N49uZZqb0EwA59cscCcB4JfKJowUJkuxrp2gxfg2s0%2BAkjHF3wrNW2UhMt1l7l%2BxBaUVPG52foAFAl7DA%2FlKMQM2lbDHTi5FUPbgkDxdRpQAkV%2BFwfdGCpKhQZNUj7T9vahGUMNCRy80GOqUBXX8rM3Ng6tSgQOUvWlCAFzXGpMIdiFcVlgTkjgOeNjT4zpOa5t5KcPiDIzOLzg4M0CZJlHoow19XM%2FaOFuxuOJuzmefH13rRAU8%2F85iLz%2FU25Yqr9NYOFW1KDzLAczj7g4H3gjXD0%2BJutmKNjVz3KiBg4TrmpeTgSGpTnF2Xkg3fFNAAVl%2BSLxEq9OQc51SFov8q2bmPlXxTW5twnGBrt1%2BhgbmO&X-Amz-Signature=3ae37e608a27a21b3ee5464eaa37eb2340d7cc37451bdd0dcb94f9556210a143&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMUKQHKL%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T154321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDOduP5bzeKbmQALMFRkgVus2f0d1AX3bs7arSynPQDYAIgWvYikxjVgZRXgoyFIhBOyAxOZsHLQrNynHRJR6w2Flgq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDD%2BTRNxtrjrDnXPQpSrcA8J4PuGG45OfxOIrs1shoqxuMxeJxNtW5j4KtET7fjMX1NReAKvcx2r68rIuteBZRA5YVpx5Hfe5i5uVaf%2FcSy38wWF1UTtM45P2q5DXgUDKwswTDoJgT9T8WDfFDEp2EOwdlBrJLIHdSEZiqSfpMb0r02uqJkRb3v9sY6%2FnI8HAyvLdb4LT7tAu6Zs%2FeCTgh57U%2FKDykqcKt8ikJPhuYhFaNzlpTiypEYhCaB0ok8eK73r1deQcU2OIf6z%2BHxb%2BI6NQRCkJVmKNpyTZ93KXuLltcp5Z9%2Bi1Ek0cWk9Yq0B1TDDRG9NlNn%2BcW8nzre8plMjnmVPgCxOhJ%2FGwT6EPaXlq8zhczO4htj6KuGk5Bk0oE%2BoqAzGld8DRlznP0L5W5IJMiskNzVgDmPS2RETAYQ2HrIsj3OokKNC4NJh7bO8JIhIrVjPARH8emJ92ZE15cj9tygVGnhiyefdoAKhkqRTMwobF2hidzVjLXRKs1%2BxO4jHdD35%2FQ%2B4BzbJNPLRuFldFOfKVpDOgxw6YeIzEaeqPUnJv68nWrslv2VILePelCM1IlWe8wH7degioBHrPq5LCti9ok1JeisIkhNll0o%2FwM7%2FiZ0AlmO7h1GF%2FdfMSGUIZMycDZF9J5941MLK8y80GOqUBV%2FgdiW7G83nnNQG8NwnV41AVMIENJ95lbKH451foRAuc8ZlYjF8C0GmMQMlovEIbkrGaXkC1%2FCR7BGLMCx9bRlBG%2B3m7R%2BaXPh3FRTFPpRuomiJxMxWV3OVj%2BBawYAUm6%2B4yYowWi3zuVRqqii90JNJgIwCFB2WdTOR%2FakjXDu4V4%2BVTKOcRUEefJJ5Bg2Rw%2BdsPqrfj8Us83vZysHYkNXfAwgGX&X-Amz-Signature=994354ddec0f24f6d2b0f0fda53990981853808eb266635679dbbcd4419def9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMUKQHKL%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T154321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDOduP5bzeKbmQALMFRkgVus2f0d1AX3bs7arSynPQDYAIgWvYikxjVgZRXgoyFIhBOyAxOZsHLQrNynHRJR6w2Flgq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDD%2BTRNxtrjrDnXPQpSrcA8J4PuGG45OfxOIrs1shoqxuMxeJxNtW5j4KtET7fjMX1NReAKvcx2r68rIuteBZRA5YVpx5Hfe5i5uVaf%2FcSy38wWF1UTtM45P2q5DXgUDKwswTDoJgT9T8WDfFDEp2EOwdlBrJLIHdSEZiqSfpMb0r02uqJkRb3v9sY6%2FnI8HAyvLdb4LT7tAu6Zs%2FeCTgh57U%2FKDykqcKt8ikJPhuYhFaNzlpTiypEYhCaB0ok8eK73r1deQcU2OIf6z%2BHxb%2BI6NQRCkJVmKNpyTZ93KXuLltcp5Z9%2Bi1Ek0cWk9Yq0B1TDDRG9NlNn%2BcW8nzre8plMjnmVPgCxOhJ%2FGwT6EPaXlq8zhczO4htj6KuGk5Bk0oE%2BoqAzGld8DRlznP0L5W5IJMiskNzVgDmPS2RETAYQ2HrIsj3OokKNC4NJh7bO8JIhIrVjPARH8emJ92ZE15cj9tygVGnhiyefdoAKhkqRTMwobF2hidzVjLXRKs1%2BxO4jHdD35%2FQ%2B4BzbJNPLRuFldFOfKVpDOgxw6YeIzEaeqPUnJv68nWrslv2VILePelCM1IlWe8wH7degioBHrPq5LCti9ok1JeisIkhNll0o%2FwM7%2FiZ0AlmO7h1GF%2FdfMSGUIZMycDZF9J5941MLK8y80GOqUBV%2FgdiW7G83nnNQG8NwnV41AVMIENJ95lbKH451foRAuc8ZlYjF8C0GmMQMlovEIbkrGaXkC1%2FCR7BGLMCx9bRlBG%2B3m7R%2BaXPh3FRTFPpRuomiJxMxWV3OVj%2BBawYAUm6%2B4yYowWi3zuVRqqii90JNJgIwCFB2WdTOR%2FakjXDu4V4%2BVTKOcRUEefJJ5Bg2Rw%2BdsPqrfj8Us83vZysHYkNXfAwgGX&X-Amz-Signature=1006cf4762df20ad7885ed6765d5ca2867a0e0ac934d4b634dd136a4a6580230&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TA4A4CQ7%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T154246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDSJp7pFi2KyDgIX1oLdkOAgxVwl%2B4FQPeQNENHvUdcTQIgNHUD1%2FnEDhJUQSua%2BWuv%2F3JqsaIE22tPgJHO%2BsZriWUq%2FwMIdxAAGgw2Mzc0MjMxODM4MDUiDKb3Gyq9ddVZ7DQDTircA1Fd2AFuSWm6VvZY0oI9lsLzsni%2B6X6tcbJtF%2Bewz7miekxP33I5tMOQJ54Dt3epzIoj9b1bGyRj6N0ycNw2YZicE6rsTW6JiexbpcMKsLu7ZzLAgt%2BP9xfe6qZJN2kPXFDjFFjsHdXVkHLK4YGqzf0CZInbIDOXC7qkEDOyR7PGD52ef%2BDxFC9QYds7FqXtqC10MpsjYaq%2FIO%2Ff3g1sEPEA9Kn0p%2BcKqccd3qelSxU7jeFto3CD9RKChk90VqwZNImdV%2BxhcLjwncugOX%2FouDgfk4bY%2B%2FbG0W0pH8ZZZtTLrGh2qD1z5D8zF%2FENfxACwS6jPnmhF7ZmcYdJZvdWJyFu%2B1dZtWdjgjDOsGmLK4iW%2BAhE3n5k2gN0QtGXcFhM9iSIGXlpgjGwIagtmIcKqsxfI%2FBU9vRpA95ZoVSyO5n2VPuMX860xqi5AQsIWTOGOadJRSOHUzIok5vHvq4Gxe3BJ2AOEDVNaGYSrekBogs9YxYOletpWb6tkXImnKYTapy%2FqFaynukdl5VR0%2Bm3xBlCeFDswGrafHOJgYADpCWG5Z59us0MZ2ehEtwO%2B3MBBRHhm2XK6R2HBSuM3U3ou3icCkmmqLAuzUWqcrI67P%2FJTb%2Ffkfzlvh1f6fkgMPqSy80GOqUBUpWXAqTwcK8guAFcBKenIu7LVx1jwrnF1BImXRa0DnY%2BlE%2BnrDiCBp1pTKw1RSiUxfddZMaTKhMJjGzsBPkkHoE79iRkZFacH1eqMljKvP50lX3q5rhTBfUByfsODHBsUXspuwOZ4deUX7NUCvCd1%2FhKlZ5oDpwqbqi5ly75jjgyILR3o7zncDUlup9ST6YfNJT87uoh2UW6w2xZzA2pUVW%2FM9W6&X-Amz-Signature=174383923453a66725ce3c25b23141b54bdc580256a26c61658f6b46bf318474&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663BPE55AN%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T154325Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCC29Zrj7TmGHceCZgeoJx54t6afLfpG2pHQyF9ZttwhgIhAIJ78OdbgYnYqmYtpVEpX3R2JLqH1aQU5YgYm%2B3hjq3TKv8DCHkQABoMNjM3NDIzMTgzODA1Igy1oKbuWAs0VsEx8KIq3ANb4map7%2FoZNcAgJpsymwo1X4CPf17DbCGzNPGafzNy2ric%2FpnwgU41x4hgCER2VpNwSTePubaf3eZGmvURuMVDPIQU3D46Iy%2BMn0uEtZN9lYP3fBYPNa6va8S1UiaYS34iXlPCvo8GG3HvGbLB9UCTbOGDwzsKuCMhreMvD1I5a3YGnDQoDKN%2Bgxrof4d4kqPOxvlNG4ZD98bpYI1xNO7pIcDH9M7ihhA52CB2lbj%2BnoRz7SMF%2FlCvzvlpLQF1mrG%2BgxXUc4H2AUF2e4t94tHHk0Dt%2B3CsTmpg366NA7sfqbjQyX7L6c0bsfdQAFCVJ5O8qB0eBdqnURwuL5pDkKv4%2Bzkm3hFPW%2B5JyCxN4AawSz3dEs1tR4AdUJMd2wdkjj5fEpXwECiHADQn1SL%2FQYCVvM8t%2FPsHw8K3OtEVtUsUflNvCJTfguTQF1Bg8Ll6Sn5sizC%2FDUhTqv9kqYBeS6W4p9XpqJW3degL4dAZecad6oVchB4tXAvmZEU20uW3fK4S74dhUfc4CpNu%2BapdyNtmrB5VnME7bauvo3DBRyET4JCMeZ553uzzm2lNgNdxrD6FFQsRNWOOf78X3wh1G%2BAvrRitKZnYDgRM9penBuUWgMZaBTNVJ1x87ylOBTCkvcvNBjqkAeymQNpKoVA5gwDvudV%2FaO9p73klJKPI6IjNJ9ob0P%2BrdbbQrw6Z1rVI75SNSuLeQhgMkTuDTjJgdvLHTSKSj0faG1E9Bb5AOyGRbjjbtzhU6C5gZBv7fEi1vCaHGazQa4ifgwcMPYE8fHcBhV4dO3J1su%2BHOMGV2vJBCSHh4Xl2bbVZLloTIRON0%2Bn0YLtPGB3jWVS95sOPu8m0EWEi2rvuTRtZ&X-Amz-Signature=1ef59e588744c35bdbebcc7100163fee6ad249fe3c69ae62ab953a420f1c3251&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663BPE55AN%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T154325Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCC29Zrj7TmGHceCZgeoJx54t6afLfpG2pHQyF9ZttwhgIhAIJ78OdbgYnYqmYtpVEpX3R2JLqH1aQU5YgYm%2B3hjq3TKv8DCHkQABoMNjM3NDIzMTgzODA1Igy1oKbuWAs0VsEx8KIq3ANb4map7%2FoZNcAgJpsymwo1X4CPf17DbCGzNPGafzNy2ric%2FpnwgU41x4hgCER2VpNwSTePubaf3eZGmvURuMVDPIQU3D46Iy%2BMn0uEtZN9lYP3fBYPNa6va8S1UiaYS34iXlPCvo8GG3HvGbLB9UCTbOGDwzsKuCMhreMvD1I5a3YGnDQoDKN%2Bgxrof4d4kqPOxvlNG4ZD98bpYI1xNO7pIcDH9M7ihhA52CB2lbj%2BnoRz7SMF%2FlCvzvlpLQF1mrG%2BgxXUc4H2AUF2e4t94tHHk0Dt%2B3CsTmpg366NA7sfqbjQyX7L6c0bsfdQAFCVJ5O8qB0eBdqnURwuL5pDkKv4%2Bzkm3hFPW%2B5JyCxN4AawSz3dEs1tR4AdUJMd2wdkjj5fEpXwECiHADQn1SL%2FQYCVvM8t%2FPsHw8K3OtEVtUsUflNvCJTfguTQF1Bg8Ll6Sn5sizC%2FDUhTqv9kqYBeS6W4p9XpqJW3degL4dAZecad6oVchB4tXAvmZEU20uW3fK4S74dhUfc4CpNu%2BapdyNtmrB5VnME7bauvo3DBRyET4JCMeZ553uzzm2lNgNdxrD6FFQsRNWOOf78X3wh1G%2BAvrRitKZnYDgRM9penBuUWgMZaBTNVJ1x87ylOBTCkvcvNBjqkAeymQNpKoVA5gwDvudV%2FaO9p73klJKPI6IjNJ9ob0P%2BrdbbQrw6Z1rVI75SNSuLeQhgMkTuDTjJgdvLHTSKSj0faG1E9Bb5AOyGRbjjbtzhU6C5gZBv7fEi1vCaHGazQa4ifgwcMPYE8fHcBhV4dO3J1su%2BHOMGV2vJBCSHh4Xl2bbVZLloTIRON0%2Bn0YLtPGB3jWVS95sOPu8m0EWEi2rvuTRtZ&X-Amz-Signature=1ef59e588744c35bdbebcc7100163fee6ad249fe3c69ae62ab953a420f1c3251&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662E3Z47WM%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T154325Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCufuPSlz0Xg8AjmziwRalzIyqWzya1OL1mIYF3dZPrWwIgQzoph5Fq9DSWHpJwgLSfLDVfkFKhDdncwkJ7SSWllq0q%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDGDOvq2HQOm8X8vgKircAwp%2FemzQhGRy5wFL%2B0mWfqcd2YoGrBDilK%2FegxfnOv6kNpt1CRCWOtWGGdqgsdI4JvmS3k92fMPM3jTrNEq4oC0TiiX3WvrPGFwcx1KdG9LzvnOeJNL6NU%2ByY68OWHSAzvwu7%2BYmjfQlZtWw45iVmERD0Xql4zSpH9Y0AToYtab93fOY2MmQWpILU%2Fe7pn4xTd8EMGxppTEqG%2FKQuFA8G8QlqJM94PvAWetPs5eN7P11cdYvQlA9GAmlQHl%2BW9E1cy8C0aQ4VtgLcwvTJ9bPDs4DZ%2FuLL8FSrB6A1jueeFqZZaDWmmTNfxvMVwLltxRBTD5RTKRrlB9tMetp3%2BiaVX0k8GMm50PzAhHyP9J9ERFS%2FzgZinCglqsapK8o0HSMFbh43aG19cwRaHlPKHaIBPYOUD5eKnfcJRIIqO0rYXFcfyARiy8P1Ty%2FSQwy4Vfj7B0y4yfqTSX2fftamw8kBwSeFvwGY8C4cWu6fYHlHgtpx0Jpc7ny4nBc7UyEV6NOgENWLMepdc4TpcHq9MO0Y64I%2FqvBmCc5CrDD%2BdIRWy2AqlxqjoB%2BCrbJfQWZyQFScufOnisqkPp0tokYJs36NwYOUsLOh6eVnimVASHoZk7nzanKh0McwPFSUX4QMN68y80GOqUBW9xZW3AhGDzbMGHBz3SSCfmuIpYPNlbDMT1HQXysufr0QR3I2INxOM3dzx%2B3HkjBJnyy2KZQDP9XrpdOUP3LbhJhd0OI82eMkuCEefDOFsHPn6GywDLQzB0vipTdTje6haun5U32kDD2d%2FsFc21HOG3e4f4m03Ng1NL4C%2F1vXJxsEWwTKTNv%2BReyojzXops77r0J2gedtMYeOS7Hz6rEBlJL7fUz&X-Amz-Signature=3f284f875e64e3d38b8775ad4121327409ef3629ce5dde281dd39b8dde108196&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

