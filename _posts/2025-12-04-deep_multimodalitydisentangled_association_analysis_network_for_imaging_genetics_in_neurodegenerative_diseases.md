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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XH3U7QV3%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T110038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICrrbdma0aGioADsSspCZxY5SQd0OFiyUNuxQMFzW2QWAiEApfleV8%2Fp%2BJYTUK67DaK1oEEUGQhmio34dsaDjQvgw5cq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDBgb6ZIGhXhSdsCXmyrcAwFQy3I707Kw70cfDQUzkAy1hMacpbMK9bVGuxrjCYb9FcVIuVtrl2DnMFJBvgGpyoiTGkS3T%2Bh7dX5JqtmgswofU84x81ckVkD8qvYi1J0kDH1M6495KOiCYmqkilOuplcyoK1ZvCx3NT8whcYsxHD%2FC7PFMBaAlvixmW%2BdsyCwxuy5%2BCdiS4ufwawYbcxUDhBBaIXhiThnTkjz7rWjPmOB3JOPGPJbVN1yv80r%2BC%2Bixw%2Bnafwhe4IbESB2U8u5L95qRZpR1%2F5mJ4orsOX%2Bc4mDeXTKJ4NzDR4cCgLVdiLoNPKZSjRie1aw5rGsV89JvtRm8dW9CGlq%2FTmWztUhdEKASJFxpjEe%2BD5TtCWJcgKj0NdJZm2QSQovGNMUAYDzIECF3nEIrANEyqrtV3lBK9JQ17OnxbpSGp6ES1sx8RpZOnqyqdezLKmCilIKrKtyNgSST0fvZpoDgv%2BJaXUxED46B0X0UrelX5RREoiYEo7ApUI9Or0JF62h8MWioNPJGsow6TbTADlwwZZpJpJ4Qk%2FGvtrZdN0s2Wn1ETJr078lkRJ1I6vh%2BlJ0GNC21UuAMGXnlP2NYtKRoUjG7MPiDw5ElCVETDdUpeXkcETdBfA78pEXriQOz6h4JCqLMOqrqMsGOqUB8XaSFlRENqemPn71JfhOEp%2BAf6BlkG3siEkj5OHf5b3%2B7Wtn7YY0T3txHDDha3jXLYIlQyyrNnJWfQBZOovc5IQyKV%2B6rjDeRHTVQpWJh2SdVzBIGNVyF2x84DcJIco3zIliNsVnxNpvr80SbpLG03nFEtLb12F7xsKoNHqtMAD15ptx0mLAVpGxIT9x85h1t589VjcjBJFQVMmUcLR4%2BcdcnjRi&X-Amz-Signature=56d8bd1e8cf9702a7a68385b0fd8cfd078d48e03edc1e583e7cc73e038c77a3b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XH3U7QV3%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T110038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICrrbdma0aGioADsSspCZxY5SQd0OFiyUNuxQMFzW2QWAiEApfleV8%2Fp%2BJYTUK67DaK1oEEUGQhmio34dsaDjQvgw5cq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDBgb6ZIGhXhSdsCXmyrcAwFQy3I707Kw70cfDQUzkAy1hMacpbMK9bVGuxrjCYb9FcVIuVtrl2DnMFJBvgGpyoiTGkS3T%2Bh7dX5JqtmgswofU84x81ckVkD8qvYi1J0kDH1M6495KOiCYmqkilOuplcyoK1ZvCx3NT8whcYsxHD%2FC7PFMBaAlvixmW%2BdsyCwxuy5%2BCdiS4ufwawYbcxUDhBBaIXhiThnTkjz7rWjPmOB3JOPGPJbVN1yv80r%2BC%2Bixw%2Bnafwhe4IbESB2U8u5L95qRZpR1%2F5mJ4orsOX%2Bc4mDeXTKJ4NzDR4cCgLVdiLoNPKZSjRie1aw5rGsV89JvtRm8dW9CGlq%2FTmWztUhdEKASJFxpjEe%2BD5TtCWJcgKj0NdJZm2QSQovGNMUAYDzIECF3nEIrANEyqrtV3lBK9JQ17OnxbpSGp6ES1sx8RpZOnqyqdezLKmCilIKrKtyNgSST0fvZpoDgv%2BJaXUxED46B0X0UrelX5RREoiYEo7ApUI9Or0JF62h8MWioNPJGsow6TbTADlwwZZpJpJ4Qk%2FGvtrZdN0s2Wn1ETJr078lkRJ1I6vh%2BlJ0GNC21UuAMGXnlP2NYtKRoUjG7MPiDw5ElCVETDdUpeXkcETdBfA78pEXriQOz6h4JCqLMOqrqMsGOqUB8XaSFlRENqemPn71JfhOEp%2BAf6BlkG3siEkj5OHf5b3%2B7Wtn7YY0T3txHDDha3jXLYIlQyyrNnJWfQBZOovc5IQyKV%2B6rjDeRHTVQpWJh2SdVzBIGNVyF2x84DcJIco3zIliNsVnxNpvr80SbpLG03nFEtLb12F7xsKoNHqtMAD15ptx0mLAVpGxIT9x85h1t589VjcjBJFQVMmUcLR4%2BcdcnjRi&X-Amz-Signature=56d8bd1e8cf9702a7a68385b0fd8cfd078d48e03edc1e583e7cc73e038c77a3b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYFQFAAO%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T110038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAlfiw5HMuVJsji7HoKEpmh%2BkygOXuiUFccawuaiafLcAiB5lZGi0jkqeiLqMjEBMhgNVJEUDFn2rQF0yhFRIKoPGSr%2FAwhMEAAaDDYzNzQyMzE4MzgwNSIMI9UbLqAjr0jWTIbjKtwDExxyDEvbOoXnlKMEc%2BG5svWZNDMJNJcojyVTw5FIBf%2FwstXAPsj%2FWnnufnxqZ9nvp5UuNuso6DBALgXiiI1ADh%2BJ7fMIz2028oK2wX5eUhmjsLeC6qENRT84ELZe%2BEASOi8515exW8UuTD6UpXLtXNB7L71EB8AfC3aZaeNGxZNid5Ei9fN1bw6DAMFA%2BeOeOkT9%2BG800KqCs%2BC1IxIhVD3UKzzvX%2FTinUNhyc5p0fVWa6lLOVqmoGB6B%2Fh4xVXvZj9gQIFquwnwm1bznC1JFfIRMy9FKKEabVSJQWQcD2UcMRiayOuyDtPHgs98f9VPIkSCekr8Addl5%2F7%2BJPp3DeY8jWbsGtIKCKLnTptVQC%2FVnlX82ZmbqSmb7rgDK02gKnWracjkLenYF7WOjlFqxi2Ds7818egddQ2bCcpI0mSSv6LYfjCknpVeXXo2vlzrCT8sj9zajcGYc1QMdPdu9RNAxmK3lGj7VvToTwgtZCkQV6Z0DCPGl8LEKRZDCU5%2FdSFUE6IH63OJ099byRuLdhkp7yY6iv73e7rPQ9xb0u0IjymEHUzrMhRt3g5QJBX2VriaaGzsAzND8nA%2FdQ3sLCCq34HWMtuZsXUM%2Bfwz1V5C8Na3umjsK5f8XE4w2KuoywY6pgGmIUYdFuvbz3JMsJRO4gzmzjr9fGB4YsgF9yVqag57xgqOe423u1RBplmfFPSdEDW1eme5WH7%2BDh2YT%2Bxcbf1LldpJN7hlFiqMNXbThF%2BEhNoAXUDmqqasZWw3I94YWxwrT2oNUH%2F9kspjvMHjJphqzhj3PFLVEnusPIDnkHmO%2BXFNd9UeCFdsWGmHs%2Ft%2BT5p8S7WnkZ1vAOdiDReprOG5Ge8Iq9kV&X-Amz-Signature=84df52a192d65b219a16d74d6c1259c6df3ad6b8522d12c53904dbab16311a51&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662E2XRT3M%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T110042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGEIDuSpJSsxZ1bEbma6iRCQSlfRIsZRH6KBP2qqqywkAiEAjRNF4rGb%2F77sc2%2Fsr189Dc0XfnE9qNNyYHgqFPqd%2Bkwq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDJHyQW1XEXJOmFfEAircA7fMoUBIaib%2FgXietZB%2BUaUwuC9DVPxfTlQqSk2OyCk1wW9RKRzTB7deZrepnHu3OmOHWyUssSiBvI9kpA%2F5%2FymxplGpRsWxJueE8zxhCSQdx0Bu9PIS8KWBoOpCyHaDKkr2kZZt8zGRnvO%2FkBVur6E%2BnIingPnEyegn7Dd8XQf4isOTkr07LXPm5B4R9s2dJNNWLAhNw0MyDB4ziSHPBcd4%2F38R8mwiZaTDLmGE8Y26O68r61XMKze8V9vNUVdQZnlNA1183Du%2FyW1pBMzRmbaEsVJgJHAsdLmy3NfD3PlMoJo5Fa2wNPzf8xobGcNTm6TSCr%2FMiFTbCLuj2rGHvG5IJOfyRuHunwF96p7CbWyizGLuYIWOXqgt8DkzdhiRZ9qK1R3HA9aX3D44mkLAO%2B25zOspQ9%2FuG6ZYUS4GSCgZnaVVuUNX%2FeJUywLU7hLVuDUiU7TE49de2ajKPqsOYYtmdIojuYx7BrqxxC%2FSl2xkQPWzQIVXoHkrLdx7dhxIqecZR1xDFzc3KwTX8rRtd%2BFKl2Fl28A%2FepZbLQtA1F2tjnZeNTBJWmTwCwvpQ5bh2U3Kh6LvG9gbyKyzwhGW7ygZbUu7cALvK6ENmLO3Lhxoxoojvzy%2F3CJadds%2FMNSrqMsGOqUBNYZZRPyoVlZBAg9Wb%2F3ZZzpkzQSUHhOl56JyWKb4pe%2B%2FhWnMuuFXchuUQd3cCGi6k%2BNfGHLIizwVmRX5wjArEqT0ixX9FaTQZ6UrcWJPrWIBpG1IXIT9OyjJZHfPsuRDKIhlKGmF5iTueC%2Fe3wXXxNQfgvojwvPCamTy1vS1JrxockmNoMBzcgdpIYhfwmRUzlJL5N41GZLvl4raGeYP4wdDVa7V&X-Amz-Signature=61cc2f96e42696fc03981cecf986304f478d154add6b382a1c8e8da568e4fbe1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662E2XRT3M%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T110042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGEIDuSpJSsxZ1bEbma6iRCQSlfRIsZRH6KBP2qqqywkAiEAjRNF4rGb%2F77sc2%2Fsr189Dc0XfnE9qNNyYHgqFPqd%2Bkwq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDJHyQW1XEXJOmFfEAircA7fMoUBIaib%2FgXietZB%2BUaUwuC9DVPxfTlQqSk2OyCk1wW9RKRzTB7deZrepnHu3OmOHWyUssSiBvI9kpA%2F5%2FymxplGpRsWxJueE8zxhCSQdx0Bu9PIS8KWBoOpCyHaDKkr2kZZt8zGRnvO%2FkBVur6E%2BnIingPnEyegn7Dd8XQf4isOTkr07LXPm5B4R9s2dJNNWLAhNw0MyDB4ziSHPBcd4%2F38R8mwiZaTDLmGE8Y26O68r61XMKze8V9vNUVdQZnlNA1183Du%2FyW1pBMzRmbaEsVJgJHAsdLmy3NfD3PlMoJo5Fa2wNPzf8xobGcNTm6TSCr%2FMiFTbCLuj2rGHvG5IJOfyRuHunwF96p7CbWyizGLuYIWOXqgt8DkzdhiRZ9qK1R3HA9aX3D44mkLAO%2B25zOspQ9%2FuG6ZYUS4GSCgZnaVVuUNX%2FeJUywLU7hLVuDUiU7TE49de2ajKPqsOYYtmdIojuYx7BrqxxC%2FSl2xkQPWzQIVXoHkrLdx7dhxIqecZR1xDFzc3KwTX8rRtd%2BFKl2Fl28A%2FepZbLQtA1F2tjnZeNTBJWmTwCwvpQ5bh2U3Kh6LvG9gbyKyzwhGW7ygZbUu7cALvK6ENmLO3Lhxoxoojvzy%2F3CJadds%2FMNSrqMsGOqUBNYZZRPyoVlZBAg9Wb%2F3ZZzpkzQSUHhOl56JyWKb4pe%2B%2FhWnMuuFXchuUQd3cCGi6k%2BNfGHLIizwVmRX5wjArEqT0ixX9FaTQZ6UrcWJPrWIBpG1IXIT9OyjJZHfPsuRDKIhlKGmF5iTueC%2Fe3wXXxNQfgvojwvPCamTy1vS1JrxockmNoMBzcgdpIYhfwmRUzlJL5N41GZLvl4raGeYP4wdDVa7V&X-Amz-Signature=f1ca1e1eb7cece95828b3d73255c55d038c40316a853440ddf30f1ee195394e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NOIIGOK%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T110043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDC33ySY8tGNm6MQtq%2Bqiy%2FfDzfFlI3DcXmrdcdwuJSSQIhAKUYKi%2BMPyBqMW%2B%2BkldOf8liybnQ%2BNEb5magubfFNl0YKv8DCEwQABoMNjM3NDIzMTgzODA1Igz%2BiPHv3LiwM3s1XYMq3ANrPlwz1UAyfv2gLrU7qcH9TrlDIGqz%2FrR93Z4sC6%2FPTx3FcOqfs7HN54ioA%2B16HjkWFQCJVHfUSl2hoDHe11LTWcaNIB8B5cwAy6ZSY4%2FyMdLOrwDP%2FVhNBMuWBSJCATYxaQEYY6Xk1urDeID%2B2Sg8ffoGmgGO8yQnzr8ah0p8RaVsSVM%2BgjdKWXv0k7AhsS6pBpdBdbYM%2B0445YsqiHj%2FtfdEYBh8t1xgfy%2FXkX2S114q1Utna1feR%2FnHCewVL5dk0nSvX2JGz1aKqLra5EsYTkUVMlQ4oJ232JiKucMU7Te%2FocLAvM1xZFfz%2BqnDq8A%2B%2FMw9RGlbkc1jx6YVojlPsU8MEGWU98Qqhnhk60qFGZFE7awEa9woHuAWxwA1OfjMI74Ty0xL19sFlipUQ19T5oszxdCsGE8FbTYRsjuI%2FiuLZ91xK9ymy53f4O4fmDpNkFwioLGaM6Kv4i7M%2Bnpg877W83pteX991w066aBuaXGF7GRA6NLQlPFFdWolgZ7yh1geUtg3KC9us%2B09YibNoiwpKOaCWkJl2eo0nSCMFNuIopn8eWJY9TaWLIFomvWMVVXZL2uY1slR3nMjnPkNhPKknMssmimrxyksSbUGl9ExhB207fQMeJXHtTDpq6jLBjqkAY4A6wS8zpa6kIE9gc2rhVmkfJYTIh6%2FPDDE0E87PK7REtiUMpFC0f3IBP3Mv0XGgj7sx92e5lmikpxt1uFgWmPuwAC3V9NPTBxofzc%2Bp%2F7p2xVNr2DIDL95ZAta79yoaC%2BZHB1yeccuP51wvQdssbf%2FUYmut0rmW3RfIiZMICXBkTCBPe0%2BHnpUb22UknIICR1ZRBtS54cptYcuk%2FowqE5XQVOJ&X-Amz-Signature=d468130815c1a93edf125db234f9ac5993438dc75f7ce3346238e896ccda0d45&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667GKVKWRG%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T110043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDhYt9c2QaBt2IaIGXoqUohIf6g1h6Uf6%2F7VGdR5JZc7wIgIS%2FeU6nbzhHEPbxcj6PQd6IxdCVCZpQ%2BySCVL1R5Ijsq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDGvLynU%2BQMIdtY2woCrcAyCeLt%2BZbU0WeFObl81ax1uF9KYmcoYR%2BoqIB0gOtmUnJr9bpFpnBe2rlHTx1CxXhm287M9FtN4%2FXVuhk2tqqDauSF3VIf%2B28OQX1gy9%2BdJDJ%2FHQSM97plA5vwkIM16L8sZzCcaHrqnB6Goh2FVKU5OCBmca6w6CZ14ejlAaIssiBaSfaqjve3Y3d61PjRx4jpJyQu33LKHvBwHzjK3tUpz0Y0skffDSokUxkVS1CMrPYTKOeNbmgEGzCvKHKxP%2FTaPFrHCb5ttVMZVqGjsH1V8F5SCj0AvJxb2jMTl%2Fxnf3btoV9DDxto%2F8k%2F13Zq0RDmDf1F%2BBgzjeecj%2FSqNkepn0hJ7ggjse4lBByj9olZuvoIS5cvGOgj3fsDp4zdN%2B24SlOoVgVo%2BbDj8sH7Jq%2BZLljWwdnOphyqTlKOQfQAc6UNdV6mX78QQAnC9v7LMhxlqYuXfuD%2F68TEQjTKZ9uA7aRMu1fqKnH2MugMVAj4zhT%2F44VOu2zXH1liNOmABy%2BX2LbpBBbKU2dly1uvVCUq4LWlnex0Zo%2FLhL2U0WQt8NXL95Ahd6EhansMscxbzuUaogiESgiuVxs1GEaAvXhL%2FCrs%2FrKMtXBjf69ApudMhCO6mFGZNJZ2tjOkB%2FMN%2BsqMsGOqUBv160N36mK1Rvbf86TlCPfvJyK13pbDgy0zgQMXHtkVmOusqPoWDCCRSwn1hRshDosyn0gml33FnO%2BKZNNHaXwbJ4WOTxJ%2FEP1lIImf9aLiMlxUTaxJq9dz5143PIOhfW6i2vD3vYb1VjIH9WMpHBu%2B6pauZLVSxOeNDmWlqUV6aN9W0miknAVGNzwo%2FZPB%2BAxM%2F2vtTZsOTu0h6F%2B4qZlVx4qZvT&X-Amz-Signature=04653f95b56150fa2ad72448675e694a2d0c549e155807ed3f65b83851441383&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXZKNL42%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T110044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFR7uWAhZZ%2Bsr5bpo2mLeGghGZVbV4FaJV%2BbPVUeiIrNAiEAqIyhNnCSRCBcD4PdjxYgU3XXdHeCpCKUXvCAPsWtKs0q%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDA5%2BcH%2FKbMhNAUSQryrcA80FRWxe2QwlYO076v06yPzYByzUIRKxAmKFrEy5tSqIdvBAMxWCHuxEG0fTLFtp8kiAYmd6J%2BkzseV2MXAwuBwsJe8Qy0sRE7NCzKmfhZveNoSO4T0m49y%2BVqBbHD%2FujRLWp3MYvx%2BXMzikT8N%2B9U4sJ1Tk9I9OeMLI%2FF65Xiwg9mXqTqDt93NXsaBlB%2Bp9Xvivu24zRhcXOOL%2B6J9ostlV4wXpkNX%2BYIX7sQ%2BvdiEVWcWyMRBNlyOU9v92kpf7kmTFzQ6IceV3Pd6YFenjjGzgoiSFTjpqRY4n4VsYABSUEegy3YfPzA1%2F2hQqkwTRCtR3CudsQHgaIuQ0V%2FQi5A6iJaE57Pj%2B85xejjaxBT%2B%2BvSEdeX4yU7JQ2X1LOAezqpN7SSpJBftnc0i0gpWUUKDlZ7BJFl1o178ony5gvWJUgGQXXcO104Jj39v6rq5zUjUUdtcYDw%2BJYZgjT6EDmnxFrq13DNjkxqtwOzpJrbVaugz8ndzDpNTg4BjNcbY39mlBJI0f4KXKaE63zMAQrUTXF4JOHY%2FBJ0yfYsfouqZNbSNOPGV9S5OyoA1Eu7VNOTwwCot90vNFxKJuyIMOewMKbZskYSVIEZqDSS%2BNhpSfC1pjkrAX3cSOCYiaMP6rqMsGOqUBE6smsnOOhdpD%2FDbU4FRXn7wHI%2FuvVkwKhJu2VRLbDMVNwePVu%2Bj46wYo%2FCdhydg%2F3xLE7IhEUEcEXwQ5xrTWoOHmQZIlpPRFgDKZXKRqv6i0iCXLhIPJQeSeECSA7Ib335RXRwQp5PIJFKxnjYqHRCggh6sqsUCqsf%2BqzjMtAejr3XrScSPU4pM5OpuXWkjBPrDUm%2FSs5Ps8s2nArBwyvPhQeQZ3&X-Amz-Signature=ec87fc6805f01d79d73aa5c260d8b40cbf2a793e90f7cb84e1359ac7c5b11d6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VERCYKRP%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T110052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDgDYbavGnR0WR%2BpbjB50Gh0gv8JON8H56t4%2Ft1djLhWAiAoyzeknhG6oKcG1wl42z37yXUYLFiuK3fbVuicjRYJHir%2FAwhMEAAaDDYzNzQyMzE4MzgwNSIMQ8XY8svgGjVjbyJmKtwDT2ureBduiiYqrzPAxi8XJbfE1UHQw72Dd%2BzmY91m3D6eG2HjZnbhZGYtMB0U5fROzi0dsRh1u1O7nONwiconOImU9CRTUejrNHaYluSFxfsY633NKBRCL1iarkbizeF8YL1inYm3HSeeflhh8BjJk4QDu%2BGXJYgOgj1x8lSUd%2F%2BBBGJ532i%2BaHO1BGcn8hkg3RHYbxGMiVrhIIPcxeSd1ctF8ugyzBkYqjYjA85lalyER3gqpDISMJPWDySH9HFMjgzl6Xq7G1xP6U%2B2vb6VVaWUkSGZD9prFBabcpTf1NhlxSOXD3imoonTmmSNL9aFAhw4SDUVj4QcwY0lAooWvOxSNku8WWheQPNkScKu8hCSNUF5bTLmDk0h9wkI2h5ow5iHStMRuoGq1SVDOByo80VHprIMNObBnSskbjQ1gM7YDi%2FH9LjjIeJIt41PHxaTDwxIV3RU6I9WRoeP6Tv22EF%2Bd%2BZcpCDIB84hcRKQKcpnwtN57vA00iXJk%2B2nHqx8nLsL0VpT%2FBAvSdffdpMhPW6lcDspEWKRZqPRN9VnhpoQhhvTbG3akj20fY99OFgr4q2Yk24DJfWkUkFZaPgAc4jpbYV7nAK0Ki6BKKQ%2F1pQ4V%2BQhNWeikTDjN9Iw7auoywY6pgH8fVSo%2Br1MD5YqH7ykAwJ5WX0V3ESj0G0O3g6Nnby8QXdz8xVjfAZejWvc8KgaebBB4TCtBg3c7n1MPdlGn%2FFZwzArNvhpg5amAuaaOXn95NvTbkvdQiBPYTz6Md7Yffs%2FepvlIo57pt4YOori%2BXw5z%2BMPCqVkTw9l62Cc26Uhl4Y8%2BNmkicJi2czRNSsndpkN8C9usOnEDxDtv8ngRdkErenvsNTD&X-Amz-Signature=fd5c25d2a34cc0f50cfd6ce937b4695dead7a3500452d20172e37159da6ac981&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VERCYKRP%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T110052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDgDYbavGnR0WR%2BpbjB50Gh0gv8JON8H56t4%2Ft1djLhWAiAoyzeknhG6oKcG1wl42z37yXUYLFiuK3fbVuicjRYJHir%2FAwhMEAAaDDYzNzQyMzE4MzgwNSIMQ8XY8svgGjVjbyJmKtwDT2ureBduiiYqrzPAxi8XJbfE1UHQw72Dd%2BzmY91m3D6eG2HjZnbhZGYtMB0U5fROzi0dsRh1u1O7nONwiconOImU9CRTUejrNHaYluSFxfsY633NKBRCL1iarkbizeF8YL1inYm3HSeeflhh8BjJk4QDu%2BGXJYgOgj1x8lSUd%2F%2BBBGJ532i%2BaHO1BGcn8hkg3RHYbxGMiVrhIIPcxeSd1ctF8ugyzBkYqjYjA85lalyER3gqpDISMJPWDySH9HFMjgzl6Xq7G1xP6U%2B2vb6VVaWUkSGZD9prFBabcpTf1NhlxSOXD3imoonTmmSNL9aFAhw4SDUVj4QcwY0lAooWvOxSNku8WWheQPNkScKu8hCSNUF5bTLmDk0h9wkI2h5ow5iHStMRuoGq1SVDOByo80VHprIMNObBnSskbjQ1gM7YDi%2FH9LjjIeJIt41PHxaTDwxIV3RU6I9WRoeP6Tv22EF%2Bd%2BZcpCDIB84hcRKQKcpnwtN57vA00iXJk%2B2nHqx8nLsL0VpT%2FBAvSdffdpMhPW6lcDspEWKRZqPRN9VnhpoQhhvTbG3akj20fY99OFgr4q2Yk24DJfWkUkFZaPgAc4jpbYV7nAK0Ki6BKKQ%2F1pQ4V%2BQhNWeikTDjN9Iw7auoywY6pgH8fVSo%2Br1MD5YqH7ykAwJ5WX0V3ESj0G0O3g6Nnby8QXdz8xVjfAZejWvc8KgaebBB4TCtBg3c7n1MPdlGn%2FFZwzArNvhpg5amAuaaOXn95NvTbkvdQiBPYTz6Md7Yffs%2FepvlIo57pt4YOori%2BXw5z%2BMPCqVkTw9l62Cc26Uhl4Y8%2BNmkicJi2czRNSsndpkN8C9usOnEDxDtv8ngRdkErenvsNTD&X-Amz-Signature=0287512d14382db66c670e40ad774d3174bd6c03bfba260834454ff716275d40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TEE6XI4C%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T110035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCbTf1U%2F5Et3pAVs%2FdzjT2m2Bhz6QGHZmgQ3aAV%2BdJ5FwIhAKlK2E4lecXZiahdo9Yyb6qcIsa9Co3dySXQl2qvb8tGKv8DCEwQABoMNjM3NDIzMTgzODA1IgyooXoC8u7VPNj2Z0wq3AMbIz72Zw7UNZa2o%2Fr9MSrMjnE0wfpSL%2BZAWDLbt4%2BeNketa%2BVj%2BhNmhIunJoIfua0YksArXGOAhq8qeBbNFJnZWRQ4mjMugrhtGjoxHVkHnjRPAWwUEX1g0Ns5mdMNfFqZR8ymGYeGTw0YZ1XXH8o7P9URO8eHxSfcy8cgYTmSsrSmm4uiqtz1N8I1EtKWsICrjf6p4bQB4Tv6AEu2ySYSzobRyI56eNRUwb08kfTWgXLaGFmNJWh5Hvo4sQwg6SAKWa37KD%2FfoIh%2F8yrXkkyPkRtCtpFDK66OS5WekRUmKKkezWx7PkCKB2MmAhdljKJY4cPGfdq4HTO%2BGgdjmydRnKOJgwvrqUotnlhes4U3RZGSh4JFPdvo6%2BZMitROaMVM7ic2gbpEbjXoStkeEZqQ2DiTFHjziY51P1AhO6R%2F0tG%2Bkl%2FUfmv20zlgMIpjADM5QW3GjzFDktgWN%2FxHB8OxS3oLS9b2LH9FwkjX8GxxYaGkskHo09igXP27%2BUKUpMTF4gnF3rBawdzkyMPzflTuxHWksFCmDOI1ot%2BhDElgIhUy%2B3AgbZ51fNKFpbX3jrFNXmO0bF3fn87TCXbaNSbBIMZv0m8YxTuqd%2FwLJQq0jAxF9d0YbNJ8o4bhtjDqq6jLBjqkAZodbRV%2FFNn1Zh8PMhmg2wLvEjtR77hUN5M7laBoZnrXqJ%2BIME8ux5F1cTPrlZnAN7yQmbyVlsBlHaeaqo92G%2FpErEtA08tOpEMiHZeTFDhNRsN4520Fb%2F6tXTc6m9V44u07cNAzrRIHVpDnFyxyU%2F40%2FeAkfqTD%2FIfrSXanwfmKLhOBZ9lQgy1J7UOmG9acqXG73nEKm0jCXThqryLSi5Oke78I&X-Amz-Signature=d7c430be016643dcd5d18a408cc2b43b657a30d33f734f7c32be42cc0548e7e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665CXS6IDD%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T110056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEa2vcpoX8gTBkDEUrAGJt1Eznm8EUE8VZsaX0qSdM7kAiAshPATfS0%2BEFXR6eXbwEYz8U2XvwkMhpVqCK2MFIOVfSr%2FAwhMEAAaDDYzNzQyMzE4MzgwNSIM2ZQd8ZtS2Ugg%2B1ULKtwDrkmoeoI3VFuw0gaXM1f6sW10eZFX64WB0Mg6zExUB9U7M29pMdGJ93nIAJlt4O5OnlujL4svcR2hOiY4ECFSzTVHUAY5gfMeYvg9YbFWWApdCT1rDcIl8%2FK6kkKxrIEbpkXpFebaiJ69taSCurj7I%2BHFijj%2F3hdNnFO8556qg52pZc%2FdM%2F2v2Nhu0TBTe6nm5jBcm5A%2B7dgMZ0PAvMawcRzzvUMAZTFFi1dzWlUO4c3EuozNrZL1p4KblLe1ywX3xz5iimbbjNwMqlssjzQWDUi4Hm7CvxEQcfmAgZ%2BCkmAYDCv8YmSR7ulvwCk9CSj0Wp99hsS4njipxyJo2FPoyMldeLkDWxv%2B1%2BRhhVMARHzK58Ur5ACepuxx%2FNBxL8yJKaQoyeevVtgvHbcVu1nr%2F0GXHQM60BEHfD4NsC4cXLZndtysG6%2BkNE3nCrd5rJKtOmHp8k5h83SiAWXZzN%2B36crpbnilXXZV9BhqaP18bW%2BB38o%2BBQc4QhFHpuuWdGTRownad1RcwTd4M%2FXr2KOlUx3QyXv3W58iF97KQyiss81rnrGaWBmqT%2BCaCTXFcYig1SptWOoi%2FbeupQHquyTr8QiqoGqj5TRaiK74TH4MOt2Tzuwu7gGj5S3aM7Yw26uoywY6pgF%2B5813x%2Bt%2FVhJ%2FIJsDSB1UDK8VTLeYAens8CmmG%2FEep8y0zWXBxcQNhsnDWd6VW9ce0r3x1w%2FvCfY%2BVIg%2B2d9gm%2FHaxjufHYl9jT5xhoO6quLAxmDjHLomvwYyLCRwcx%2FrEzwXIi%2FE8u8mpkgkGnAUf%2F3sKhgqC2r04Hy6EeV%2BV64Sqqd60JTQIxwGZf1dJP8GOLI3Vp1ccHAvkLG%2B%2Fv8Ux76M4Uuq&X-Amz-Signature=ccabc4b9303d51c2edbb5e2f81166d71a7d0c7eca9acf518e535ab4b438ed243&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665CXS6IDD%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T110056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEa2vcpoX8gTBkDEUrAGJt1Eznm8EUE8VZsaX0qSdM7kAiAshPATfS0%2BEFXR6eXbwEYz8U2XvwkMhpVqCK2MFIOVfSr%2FAwhMEAAaDDYzNzQyMzE4MzgwNSIM2ZQd8ZtS2Ugg%2B1ULKtwDrkmoeoI3VFuw0gaXM1f6sW10eZFX64WB0Mg6zExUB9U7M29pMdGJ93nIAJlt4O5OnlujL4svcR2hOiY4ECFSzTVHUAY5gfMeYvg9YbFWWApdCT1rDcIl8%2FK6kkKxrIEbpkXpFebaiJ69taSCurj7I%2BHFijj%2F3hdNnFO8556qg52pZc%2FdM%2F2v2Nhu0TBTe6nm5jBcm5A%2B7dgMZ0PAvMawcRzzvUMAZTFFi1dzWlUO4c3EuozNrZL1p4KblLe1ywX3xz5iimbbjNwMqlssjzQWDUi4Hm7CvxEQcfmAgZ%2BCkmAYDCv8YmSR7ulvwCk9CSj0Wp99hsS4njipxyJo2FPoyMldeLkDWxv%2B1%2BRhhVMARHzK58Ur5ACepuxx%2FNBxL8yJKaQoyeevVtgvHbcVu1nr%2F0GXHQM60BEHfD4NsC4cXLZndtysG6%2BkNE3nCrd5rJKtOmHp8k5h83SiAWXZzN%2B36crpbnilXXZV9BhqaP18bW%2BB38o%2BBQc4QhFHpuuWdGTRownad1RcwTd4M%2FXr2KOlUx3QyXv3W58iF97KQyiss81rnrGaWBmqT%2BCaCTXFcYig1SptWOoi%2FbeupQHquyTr8QiqoGqj5TRaiK74TH4MOt2Tzuwu7gGj5S3aM7Yw26uoywY6pgF%2B5813x%2Bt%2FVhJ%2FIJsDSB1UDK8VTLeYAens8CmmG%2FEep8y0zWXBxcQNhsnDWd6VW9ce0r3x1w%2FvCfY%2BVIg%2B2d9gm%2FHaxjufHYl9jT5xhoO6quLAxmDjHLomvwYyLCRwcx%2FrEzwXIi%2FE8u8mpkgkGnAUf%2F3sKhgqC2r04Hy6EeV%2BV64Sqqd60JTQIxwGZf1dJP8GOLI3Vp1ccHAvkLG%2B%2Fv8Ux76M4Uuq&X-Amz-Signature=ccabc4b9303d51c2edbb5e2f81166d71a7d0c7eca9acf518e535ab4b438ed243&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665K374RMY%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T110056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEH1dQISpmWQFF4G%2BzVMis%2Figagey3lanrDTvB56ZuJSAiAh1k42%2F6FLrnG%2BdKfriT7UxzCvMkoi1cnnRr%2BVrlq9GSr%2FAwhMEAAaDDYzNzQyMzE4MzgwNSIMRGGepY5M9ek98QRJKtwDqQ3uZ7iFlc2uzbXBx9oTm1hm4hjVSFdp4xHw01UWWOdXibkfJ%2FVrBVTtUnryoVpZHstGd1ar4sy5%2FFBRIcQMqavCJcGl6ZX5yjKFnpEcZDcN1dRPDFY%2FWTVd4nN3%2FditwUDvnxfW94FY8MAGUR1u%2Fr%2BUXPKdvB%2Fo4Y39gVduHjnOUEXTYHP%2BlYQT7wounTU4u9vpVAC0k7MwgRjhuTjYTmhAzaUGc0KPXAAOoy6GzEpf752HvcmIf72LCd0aZHDXmuzQMPqW11bii%2FS%2Bne0AXEWD4bTczG6YCrrUTuWvHgoeE3h8jnHDz6C8OkCEn7XnUqWKSHzTKkcpiOEM2fCGJuyQIFvQhVxkC7KqW7eQTqEwbquq2AKL%2FyOFvZakFQp%2BduaDg8%2FLXe4KJW5IDYsueA8zZfy55bAEAuczCCg%2BiKtZYKOtYcBck36anCY8YTd64svVii%2FhC%2FBCj%2BnLxTg6rVqawEmvZRGFhwYx4cNg2AeTvFRRAFsHhOnpdBC0FMo2h6nKTE2TemzZI%2B%2B8Q4zQFv6qI9vjh1SF%2BU82hY%2Fsb5zYYnDfU8e7%2BEsn6KI6aTr7bjLk8j%2Fqx3OSRlWDI5YiwnNahSCQ%2FeeFdn3t6DJvA61Dz58tzsL6nn7rG1Yw6auoywY6pgFzrpr5YV9DBNSTzkJZtWZydag2jXzGk9uMyZ7LXskMgLAMihhTQf30lvA%2BAMKetzgWQE9b4zJ51T6YR9tRCPv6LE%2BuTzjD4pOYiKud9LbPYyNAIx0ZpVc%2FkcBEGYMTRU3E2oS9ZZa%2B03hP2%2FtBlpiO9p4l17%2FW7muv79MOq6uoYvRSkeYKwpWrRM6wYyQgNY3PBUev6cGYeASJUb1f%2BPkD%2BsRYbzTU&X-Amz-Signature=68438595f04d7a6aaf93634817c0e18317afe3ab7a1da45b83fce36ad3ecda67&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

