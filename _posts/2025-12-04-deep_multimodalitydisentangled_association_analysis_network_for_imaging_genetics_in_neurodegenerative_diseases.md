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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666II3MVYW%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T035642Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQDz4SCrDKTTRo76MSEv6Wq%2Fx2rwFL6jBc7bt7j8EXGkmAIgN9ZKhN5nEucibAd1dG1OmcWd%2F3FRh9QZmLDOUxgu5GIqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNgye2vKtAIbIDANWSrcAxLBIJ5ngcA7WYV0ciSDOKXHf9zvFTX3vgxFBEVXy72XfjL93d0g8%2BzdnygNKCC3lJLWvv4ofKvA%2B6svXCodjtkBR4b4sw%2FAH1EuC5HVX90Yq1fLlmprj%2BW%2BQRliGMimFYRYneUoyBiNnLt4NV%2BEnHmm3d6WvH3ziuJuZPRuIETENw6LjFmbDdHrcTgfkvIlwJFIoVXcVG3%2FIx8arcqPlkVmDNeqQaR1gXOIT5xLq6HJz2yAVBT2euLXgmso2vLdHF%2BuuVdWdpinpyoORSlq%2BRHd9WJiVmofNzzehsPllHOlTInCOJe2w0egoOhn5CdYgVGdQjZs%2Fx47IQ66MEXdeiQWW8a9jMZ5qZEiVlD22jI%2FsCSC7cEcsOYlJessDc1KXSBq3JkVJWhKAHpLYOt3vbvbbvS4OZXvfYNvADzhUHd0fnI0JiK74VOJbocPM9HDJ72JQWRaCBqeeNP50Zh87hxqvb0aiSTaPwLGclVAy8PPIYyuMPA1UsthoyZ73VQGM00PfSJW3%2B9W6LfcAWs6sycjUCwK2ioxiAt2POmPlVG68iaSAD5pBzHk3U2eYkl6MckeLrOJv%2BF6HY8zBJgp6D52G%2BA%2BkAFa%2BmEm68Ej3yFHgp0RQBXszo4H3HNGMLLjqM0GOqUBTRgn2Nyvjm%2Fu2ig1M2WdnJxbvwzTmzL7jQlX4DtFpCRB7sW9Ww8m%2F6H9O7uXtuYFW7xNgNneYvJu3I9IFtrtwTv7P5v70c4oFoeZEPHbfBpcZUY19tMA%2FaZkfx0ktBy0mCmW%2B35dGYeIAaMX%2ByF%2BWPcMIY%2BFllglA%2BT3bQp2aI9shrhnuq%2BS8wketyCGgldSbKZNXYhA%2FjBbdp3bHpUIghEVLzeT&X-Amz-Signature=81d3877fa9278e7b01d1f3e5859b7f36bfbc347180e486a56f5ee2268c1a6465&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666II3MVYW%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T035642Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQDz4SCrDKTTRo76MSEv6Wq%2Fx2rwFL6jBc7bt7j8EXGkmAIgN9ZKhN5nEucibAd1dG1OmcWd%2F3FRh9QZmLDOUxgu5GIqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNgye2vKtAIbIDANWSrcAxLBIJ5ngcA7WYV0ciSDOKXHf9zvFTX3vgxFBEVXy72XfjL93d0g8%2BzdnygNKCC3lJLWvv4ofKvA%2B6svXCodjtkBR4b4sw%2FAH1EuC5HVX90Yq1fLlmprj%2BW%2BQRliGMimFYRYneUoyBiNnLt4NV%2BEnHmm3d6WvH3ziuJuZPRuIETENw6LjFmbDdHrcTgfkvIlwJFIoVXcVG3%2FIx8arcqPlkVmDNeqQaR1gXOIT5xLq6HJz2yAVBT2euLXgmso2vLdHF%2BuuVdWdpinpyoORSlq%2BRHd9WJiVmofNzzehsPllHOlTInCOJe2w0egoOhn5CdYgVGdQjZs%2Fx47IQ66MEXdeiQWW8a9jMZ5qZEiVlD22jI%2FsCSC7cEcsOYlJessDc1KXSBq3JkVJWhKAHpLYOt3vbvbbvS4OZXvfYNvADzhUHd0fnI0JiK74VOJbocPM9HDJ72JQWRaCBqeeNP50Zh87hxqvb0aiSTaPwLGclVAy8PPIYyuMPA1UsthoyZ73VQGM00PfSJW3%2B9W6LfcAWs6sycjUCwK2ioxiAt2POmPlVG68iaSAD5pBzHk3U2eYkl6MckeLrOJv%2BF6HY8zBJgp6D52G%2BA%2BkAFa%2BmEm68Ej3yFHgp0RQBXszo4H3HNGMLLjqM0GOqUBTRgn2Nyvjm%2Fu2ig1M2WdnJxbvwzTmzL7jQlX4DtFpCRB7sW9Ww8m%2F6H9O7uXtuYFW7xNgNneYvJu3I9IFtrtwTv7P5v70c4oFoeZEPHbfBpcZUY19tMA%2FaZkfx0ktBy0mCmW%2B35dGYeIAaMX%2ByF%2BWPcMIY%2BFllglA%2BT3bQp2aI9shrhnuq%2BS8wketyCGgldSbKZNXYhA%2FjBbdp3bHpUIghEVLzeT&X-Amz-Signature=81d3877fa9278e7b01d1f3e5859b7f36bfbc347180e486a56f5ee2268c1a6465&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666POPCRNQ%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T035642Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCID9XcKH6PKjFee4IVym7vVAYY95jzag%2B0pAncZnWnJm9AiEA%2Fk%2BiXeW31XAWMK71YeD0esSKILO5zN1JO2ZO2iISdqUqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDkOGSl4xJPb24%2B7qyrcA1v0howZjCfLEkfHpGULxecnjN3nO17Y1hSe8eGFhX%2BMv51VIrsTvANKaBZJWdQmm1NANpVl7FEfKbvDxr%2F1IKFKqMgji5hSX4%2BVZnax7TzcNCUU7G2yKz%2FVipn5gzWM7gTFstgqX7%2FeW%2Bb8yJgCiQWastm7WPaFDH7tOa9iAZ9lBekwOrXTO7tHh4FJO2OGRbS%2FnOg2Ls74G6wpOFIKxouCfnAZtLku4FFkg5OBBjbitB%2B1UGaBWNDuEaiuX7JE%2FdaivRddWcqLeGhS%2BxvldcV5sC8axtJTFmKaLOUcjXSsaVdjmCzud976jXYryn7KinsB3c3wWx5jbCXd1wUDNSnlD8PLDzxJGsWgmctiJ8WhbOaZSTz5vBi9GGNy90C2bTDTBCSEWeCH68Vy29lRZpq4kkiXZIw57TvwRfE3K9V1nzMi8ZnABQgDFb6xKoM9tBLp%2Btl%2B5DJYxpC7vFOvui91L0O8wEmUq6vaDzR05fma0R0YejrLIVWTb2whv3Eir9tujJjSBTFix2VGGXqkERr4vi9PxIZ%2FhSkigi7uaAlP9488JzHH%2B4%2Bqh9zVBrVFoemiZRc61Rq84LnFzrziFavaDxs1pvnFp%2BvHh1q7vBJeE7XjfDpW9%2Fgry5H2MIjiqM0GOqUBdeQsC2eSrdlvuJyh4dgXflnB5fcFRjfnzLsW6RDxZFwUrslvVdfObTy23D4ErPpRSMSCkCPFsJbzRSfXJkSUjBT%2BzwOHqZxN9s1qoq5JuSWpEgsDANIf1ZWA7VO3VC8ydatSR00Ffe0IfyjYrFkTs23KzqB0BdcF7Q37UBS%2FS%2FIpbiubdrx5ZlPtZV1n4s4MNObUKwxssgyd5aAJEXslJWrl7Nbn&X-Amz-Signature=38a80cee7fb4403947b8c8190c6ea8916e4caf1488edc6418f5920d372d1de8c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XH7RWM3V%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T035646Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQCtkMuGwMsVIPNgGfqkvfzcn21L2WxA4qoVwkX59RUd8gIgPtBX35Jcr7%2BF1ohayYORy8fRTcq3600ikDIQsmIFmvcqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF85X0qCPoXa98cUdSrcA%2FpBsmFD3diis92gp3WtofJ8vN7xT2y4nv5imzAbR4Rya%2F91ihDEiaiK3VHXXjsrb6Er7Z64sFW%2BdAhpR%2FhX2q%2FDaiuOd8LWB9dA7WvM4JUH1utO3lm5%2BCT9IpgSr7i%2BJnre2VKgPUgLK1wdCJrtgd0oFVoTfI6gZFl9yaFx83Rcz33aNRMwN6RkpwDdFsT%2B6m1KG12uUvPcrKcwCKHRbVEkPgdAXxX%2FtyQsgIYE%2BvPBuM3IBR4bFdfdolBkolVH7onhRoxM6lvE8a22NIx8JbKsOUXUu%2F3uQFj81ggWsohqTdBO9ensA6iyOIsuXIMnbMY2oDs5%2F9JFw1iDA1ksBvDkRyBUZsBld8pxWEyNmmO93tFgPw0sD2jz38iD8TClHurZoHp9jximlcGYlIkOPPH3JZIQLtUkLLade9Z%2Fyzcwf1xGow6SxQzlncKSDspT9YSii%2FHOAAVBhF1SQnK1bS5MlerUHv4cFImoDs%2BwiMEPEBPL0HmGpMKHS1flae4H0JJH6jH%2FoDJnO9K%2BvtLVDC2OnOmWvITYIr3dDaRgWS5bGjUqPpHpO2PMoizzv7agsq19ijC0z2g%2FdsqdrO%2Fphy%2FAywFh8AIy%2FqquUwKYRkbXlu6hUxpxgx0FBBBJMLDiqM0GOqUB5UsTls4tysEvWpFyyzN4zZExvVzzrd7%2F3IiN8bvK88DOFXu2IB3RHuqD52xExIYc3OtEyP%2FCIqM3bn%2F%2FSRaaaHZRpidtj8P9Ts9ALdl%2F5mQJtHfG7tGjk%2B2YJuSK8CcZV1GKCJo85dvt6fJ578sBY4W7nHvRV5UptnnfxbC9lPhNru1TVRjkxGBeH9VRMBerflpDxdTbDx%2FJQUr%2BTYMBLoFj00ky&X-Amz-Signature=f12a00d9de5ae3ffef0bbcc45f2e3692d9a6fec601d256a851dbae9f4a15b922&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XH7RWM3V%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T035646Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQCtkMuGwMsVIPNgGfqkvfzcn21L2WxA4qoVwkX59RUd8gIgPtBX35Jcr7%2BF1ohayYORy8fRTcq3600ikDIQsmIFmvcqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF85X0qCPoXa98cUdSrcA%2FpBsmFD3diis92gp3WtofJ8vN7xT2y4nv5imzAbR4Rya%2F91ihDEiaiK3VHXXjsrb6Er7Z64sFW%2BdAhpR%2FhX2q%2FDaiuOd8LWB9dA7WvM4JUH1utO3lm5%2BCT9IpgSr7i%2BJnre2VKgPUgLK1wdCJrtgd0oFVoTfI6gZFl9yaFx83Rcz33aNRMwN6RkpwDdFsT%2B6m1KG12uUvPcrKcwCKHRbVEkPgdAXxX%2FtyQsgIYE%2BvPBuM3IBR4bFdfdolBkolVH7onhRoxM6lvE8a22NIx8JbKsOUXUu%2F3uQFj81ggWsohqTdBO9ensA6iyOIsuXIMnbMY2oDs5%2F9JFw1iDA1ksBvDkRyBUZsBld8pxWEyNmmO93tFgPw0sD2jz38iD8TClHurZoHp9jximlcGYlIkOPPH3JZIQLtUkLLade9Z%2Fyzcwf1xGow6SxQzlncKSDspT9YSii%2FHOAAVBhF1SQnK1bS5MlerUHv4cFImoDs%2BwiMEPEBPL0HmGpMKHS1flae4H0JJH6jH%2FoDJnO9K%2BvtLVDC2OnOmWvITYIr3dDaRgWS5bGjUqPpHpO2PMoizzv7agsq19ijC0z2g%2FdsqdrO%2Fphy%2FAywFh8AIy%2FqquUwKYRkbXlu6hUxpxgx0FBBBJMLDiqM0GOqUB5UsTls4tysEvWpFyyzN4zZExvVzzrd7%2F3IiN8bvK88DOFXu2IB3RHuqD52xExIYc3OtEyP%2FCIqM3bn%2F%2FSRaaaHZRpidtj8P9Ts9ALdl%2F5mQJtHfG7tGjk%2B2YJuSK8CcZV1GKCJo85dvt6fJ578sBY4W7nHvRV5UptnnfxbC9lPhNru1TVRjkxGBeH9VRMBerflpDxdTbDx%2FJQUr%2BTYMBLoFj00ky&X-Amz-Signature=fd33e38fa470bde8f0563c1886dea0ad46407686857541c619aaf2793a0eeff1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666W3KX3NI%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T035648Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIF%2FQ5WVoaBSorjljUkveXptyIBYlD6eLVfRCGcBXvKhMAiEAyquPX1aiBq2VuyvheKT%2F1ijiUZmpFewqrSmBLuo6xQMqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO3tLN3HBa0tztxmvircA2nw03kaDcW9Iq9I0D18EfgfAokaLcPfn6dLo4dp8oxWap0sZAgh4uBP1N1dw0SNX6A41rKTTy3Td9bat2q13FF1H%2BQdgdCuk3xZiX1rXZt%2B%2FYRcUfkXfzuTiRUkanpRxR1g79i8%2BMCgFYNfiuwL4UoWng7KC4W7x%2FvHmfvctwOkk7g6jg9USJlUXrqE4IsaezQvkr9u%2FP0mMi2DJ395cAyIP0%2F3DVFdA7H3PEmyFeZhAeRdsslX0t37Gn0W1%2F7b3zXBTgL4F7HruPcfjUaX3Owv4xtbUPKKY1mkwfREe%2BoU7pZ2udSzWbe1KRcvj%2F6IhsDy71zqY8FMjrmghRutTSww2yZFbOVLMAazQZeuHCTp9y0JWYq0AB%2BgZZ6NuhMDpXjIiy%2BEYBGsGfK6Qar05fY4hkjvzKeyrHjOTJE4jKJkER5Ytn8GQs9Gwf4BVnNH2XRQOI9LKC0LiazrEsindKhA%2BrB3wD1TJBb7Q%2FAtsX8V%2B%2FJzL%2Bq7qQ2zgOxxarxS3JiJ%2BkaYcFS%2FGKEs5JuwjW1YpViQ4UPJ9oGC4Wu8plciFS2E7YnEEE4QTmpuIcjd98Z5TpH41CKfMqWNasDpfav1rJeIPF9%2FmEOsB%2Fv%2FvGwACyRcgjl7CN6Znp2HMKziqM0GOqUB4T24gOFPxM2cSkzBMG11j%2Fd564xLvTG9T%2FFlz1dzf5xvLgDby%2FgKnuyQng5jXMmUwVQrlFQvxdImgDvooizUkAtJv%2BP29PbFfj4riolOhftoScKKoThHyD%2F4KGBG3%2BZ56nIFSrYK3puXYVGmJKzhlTUVdOsi9XHZxmIGXab96dLw63AAOQgzFuP%2BwTMuXqwGPbhrSX9WH%2B%2ByU2VWe01RZAC%2BPPJ4&X-Amz-Signature=2ec900422ec6b758f4484ee15a64bc002cbf9a4fde9184319c4ffa7e15b8d9a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYNVISWO%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T035648Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCIAJdz2pNOJX5HGHk3HKB3qFdkGDYKGpdqVmP5IBePXAlAiByg17ef%2F8jY%2F0Qxkl1UfvAeGfoMfKAybKJPlGxHcgR7CqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMzPFHBKOULOpsiMhSKtwDVmyxmK8cTQSzj7XwHIszspRSOkdWwUZCHDbVFz5hBt8aOFa8L7dLov3%2FoLU9KtBmhl8p1984WtHSyi7gmka0rIMg1K8sqZcW%2FeRo0%2FzmwX1KJfcsCbpevSRV5rcpvhE%2Fn4WQv9aaq2I5wGiqEub56WAdtqcIdZfqk8tOnWC855RMZeWTkAHajSwTl2H7SggxbJm6SQz8skMmvftTPVBDfSt1Fclp5fGgGyfhdh0zOwlxXBtueJtVGMa9ox%2Bo2eih2kjY8b8%2BTZFnQfBWkLfTBC0U5lT73K869s%2FNVKU1w%2BEDPGzAi5lIgMgxERP2pOFEvPwUIyRuG3wus%2F%2BUaGh2xTkQ281BOpmKMdb7G2gOIldxCNFn3inMu5CauYJoGKJ7aVdL7PH71GryB7OO%2FVgsD0y3S9qZL%2FRalFNH%2F6ys2xIM0U%2BtzIQh2nIp2r0cvz%2BcszuOKZlhdB5fbegZSb2mLiprHCulv7KF%2FLn64%2B6ilNVRzuZra6Fh5sklR%2BO8Du4xj0JI45hNt%2Br4YKB7AdEIOpSW0ENxNRfs%2BWoGxO6vnKNMk%2F%2BjZkvkxxGuFDhvYveJI8kr49gX5DHWBTaJQQmDKw0S14Bf1Njv8eT1gyQbZlwIuLtZw87u0k3OskkwreKozQY6pgGgvo5Oxj0OdalMs4iMReUFPRFLZ7NmshMX2fkD4YteMb3g6nhu6E%2BcOGHQQaLTcylu4kW4394CWBTwm1gSd%2Bmfnb12My3nxZg7auQSznwafXzvZ1no9FqdWVMNN8kJIURW7gpfAkoZI9qH%2FlgeTOR43UNrTyR%2Byq87ut15Qj9ob9kzx0KoakZKaYlkpoXywYebvpwaWaKqIJ79AfnWRK0rO0OSShkz&X-Amz-Signature=30b0d48bbcc65bb7530679a22f9158ea0ea5eb97b0c905eebb7d1039085dbab0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TTRWUEG5%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T035649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQDQmiNaE3kyA7CNg6G58seVUTR4Hx1k7tPFaWXfVFj5lgIgcqSnGmoThuJI2Zxx2mBggQUUiFbZGkvlFko%2FI%2FOAWH8qiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPYYmuPBcQ683%2BMl1CrcA0toUdXhWL1T9Zt0Q09LmnKohagojhCpr6tauUgoVv1okYmhPXap5HI%2BPfn5WERLm1%2B52NZiiWY0hk87cX123kvwfr40XaFuER04uxVo4PgSbvo9cDepmb%2FF5sshBBHNyGnQPGrudNmFb1g7q%2BEc8v4DiOeHJi3Kc5XpVj3iUhNp3XGYowSJmEgdhekCV1FaefOS6ZSBWQOEGFK6zDqWAVk%2BhY44rZNuwI3IzLxqCtUeBWXxEaKwboK145UUCWrCsKmkqYq%2FjmNo3m6hNUBthAFM40TsLlpkYKQAbvhbC%2Fijl0DrIfakBofm8aMMzjOYvI%2BL0AZOk05tySuNUoB6TLYfV6o0QeysEv1g29ZBioKYHqlfizpq%2FuJVYojqlXavnRETZkqlf1Lw2SpirUajH7jq5XE09wEsqYgvRb7%2F%2FEhJ9aHduLIOuz4BYlEy4%2BPDXcnsfWBEygt3f%2F8FRcWGLZe%2Fb2pEB1pFxqEiz8bm9Vaw47GPJmWpSzgGcJLQxl5XRmS7AjSZlVzkYWOdK2sACgBEL2iYfEO%2B0bvTpE%2BOaoNuHQCYcXnpnwxgiopCOllwMZOyJpwEnxTo40NPmeD%2B4erdwFMRmAeSQbLVCz5mFUh%2BnNjSZ9w6X07oNS7IMJjjqM0GOqUBgP45aqa7w9MTeVGERLI4BuXKpPO7NcDLnSXKsaiYdv75WEMONO6qD55knpzf15CpYi8uTvXuYRBLL4fP26%2BfQLSHF6EG9%2BCk2dkB3bo%2FcyT%2FMOmqF%2FG4CL6w4nsmkukjC1tbSexnYLN4loKxQhblwUtBGuSGPGH0xPN%2B4WM%2FuS8EJXl0%2BfttzxpxpK%2FPZJkYJ46gwOEqM3%2FUBNmMAz%2BodV4ftano&X-Amz-Signature=51914a2c2dc3642cbd6dc99ec0695bf54739af37254c5d307b58a2d8fc37b4c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ENJF52R%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T035649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCIB0PJaZW5nMjDPl2VySG0ARLrh0LyKoz%2F%2Fri7VOYyB4wAiAmFmZLYGnUM2m3PAA8OY541xpVwmaXeyg4QQlydNy%2FPSqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMegw1Qy%2BdRvD%2FbKwzKtwDZwhZeYGOXK6g0fSpX80XX5za9DL%2BNduw4WZN0IUk6Fwpcjt6r9WIp4vGIjqE7HJ7USHhE3Ih5Yo0eDEo4aokZppfyH5dbtf4yCbsi%2F8PyWFVAXaSiNc5xje6a2qiBB0H4Y7tEH71tM0bDrE%2Ft59FvYOwGqbYWq3g005HLb3HtiJ2ZDq5b0%2B7%2B3lOA8tWAuUIp4zcCUOEvRVVX2wAc6%2Fj87RcNHZh5aweXePQPx0ULaknwITDMPj5IlX%2FK4bD0VgFlBhifu5g1oUb5oeoDMjCjPEA4FQpXJ1p5Dw6mq%2Fi%2BDBMEpZFZ101H%2FUOqFk3tHO%2BtEHENjeLT39jS26cMFZrL1FJ4u%2FvdtdFFdZZe21%2FbeSgviDHooFxm4BXM%2FywAz1fqhTjnmjMhKO8aWP4736xRD7myFmUEuqRnm7h9cnuvtctcFQhyFauKYICfMdGPdF2RFrZQCHTOMbcYiTNYhh6xdCQdOCYU0Rh%2FDbiw6cj38w00DNxW%2Ba4lEf8ubnVZ0FNyLRktfJ6D%2FV87IcANVeKM4SWWx%2FuP23LE9Sd3ebaH6BQ1u07jIC%2BfznxiU%2B2MVVBBx1eOOuvM83sU%2BhV8mXQV87d%2FJMotntat60aOtzyOp4m7HtMr5n0ixrAOqUw4OKozQY6pgEZBprzjb9fb25yxOXQJvT%2BHaWAv1gY%2Bh%2BnrVIKzf7l8s7%2BE7swdLN%2BSSthH%2BMHctl7PyxiMWL1mGdX15%2BjvQbM9vYJ3cqsuL%2FCIwDHK4OyFa%2FMfnkO6P9MB5m2oTE%2FeRj4I9wRPTBJOx%2FzLWZ85p87mXnnUmWvfSJomsqBu89BB%2BEobSKOSzKVZPP28FjvBTdlDIiiICRxIkFqdJcKwJIWFE3%2BA9UK&X-Amz-Signature=1771fc25a96732de164026d8cc6e368fc6ef6bbd2aea7570c96593b99c203068&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ENJF52R%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T035649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCIB0PJaZW5nMjDPl2VySG0ARLrh0LyKoz%2F%2Fri7VOYyB4wAiAmFmZLYGnUM2m3PAA8OY541xpVwmaXeyg4QQlydNy%2FPSqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMegw1Qy%2BdRvD%2FbKwzKtwDZwhZeYGOXK6g0fSpX80XX5za9DL%2BNduw4WZN0IUk6Fwpcjt6r9WIp4vGIjqE7HJ7USHhE3Ih5Yo0eDEo4aokZppfyH5dbtf4yCbsi%2F8PyWFVAXaSiNc5xje6a2qiBB0H4Y7tEH71tM0bDrE%2Ft59FvYOwGqbYWq3g005HLb3HtiJ2ZDq5b0%2B7%2B3lOA8tWAuUIp4zcCUOEvRVVX2wAc6%2Fj87RcNHZh5aweXePQPx0ULaknwITDMPj5IlX%2FK4bD0VgFlBhifu5g1oUb5oeoDMjCjPEA4FQpXJ1p5Dw6mq%2Fi%2BDBMEpZFZ101H%2FUOqFk3tHO%2BtEHENjeLT39jS26cMFZrL1FJ4u%2FvdtdFFdZZe21%2FbeSgviDHooFxm4BXM%2FywAz1fqhTjnmjMhKO8aWP4736xRD7myFmUEuqRnm7h9cnuvtctcFQhyFauKYICfMdGPdF2RFrZQCHTOMbcYiTNYhh6xdCQdOCYU0Rh%2FDbiw6cj38w00DNxW%2Ba4lEf8ubnVZ0FNyLRktfJ6D%2FV87IcANVeKM4SWWx%2FuP23LE9Sd3ebaH6BQ1u07jIC%2BfznxiU%2B2MVVBBx1eOOuvM83sU%2BhV8mXQV87d%2FJMotntat60aOtzyOp4m7HtMr5n0ixrAOqUw4OKozQY6pgEZBprzjb9fb25yxOXQJvT%2BHaWAv1gY%2Bh%2BnrVIKzf7l8s7%2BE7swdLN%2BSSthH%2BMHctl7PyxiMWL1mGdX15%2BjvQbM9vYJ3cqsuL%2FCIwDHK4OyFa%2FMfnkO6P9MB5m2oTE%2FeRj4I9wRPTBJOx%2FzLWZ85p87mXnnUmWvfSJomsqBu89BB%2BEobSKOSzKVZPP28FjvBTdlDIiiICRxIkFqdJcKwJIWFE3%2BA9UK&X-Amz-Signature=851ab31dd52f674d55978d84b7c4357d8d6c3b8cb0e967cab92cc80389a334af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WA42TKIA%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T035640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJIMEYCIQDH43in2uxzPAkTyL7j7rZuc4ll0cXuKJinMyduAo8h7QIhAJTuLYfu%2F6%2B2f89mDWDq1rKun4eGf%2BlFABabj5X5%2BdYzKogECNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyqXPqVH%2BjRErBIg3kq3AMEd2XCyDj0izog%2BEAXWml1b7MyH3KcNOIrEWcSo1HS9cSGMIQYq3kbe0mJRbqv%2FeSVdsScO2Y8UGldxKJCLmpgTZTIGMw7hdZTa9jdHQDkh8U6DaBqMHZ2FtY1wvWijt3Xsq8LQhwiyZ3EQX5w4IZp1aYh76tBzB6JqXumSlD7nAsmOUthShAMqOmroY7GLx32JpBE5pN%2BnZNm4BKJIxo3cns1xcV4FK46%2BKK3vSDvoJGecCnqlWNMSCzgQU%2FNiKcSFvIt2GFAX9rfJDH8WzWd4%2BUZGSaLIjk2vwORSBU5%2Bkr4cP4sQ8pYYIDyRVQOO%2FnBnel91gcbubVrzDkzWxER5DxPCCZ%2BGu4m0vuj%2FKtH9dSBZm2cRjVZ9rC3p3ERTu6IZ4hJyfCcNoV4QqLiJtbR7fyj4lllG3wslB6%2BU%2BrsYpkxuoS2%2Byd77%2FmJ2fvJN6lXNJRGKmZtR5LPWVq1tMMZ0k2mIyenOxlaSMFvIi4STx%2FrAH%2Bfxza6jZcdfQ%2BhLJe6erHzhiEBf5TzX%2F9ymlP%2Bw%2FlateUvbyrmam%2FusgDmLLrmjWLbRbWvDanpWuJfLtHq%2BwADoQe3xSItsVqWQQR8AK7DeHdgNCmQ8hzfcoxZ%2B%2BFVE1gub2PD%2Fk7gzDCs4qjNBjqkAWaMCXdP4Jd3QkTLe7AkVTo3vlz39ZcGjn0PEej2eqaFnbHXL67%2Bu4dmnS9dmvqvABkVsEmuuE9HVVgmA5uy0bPObfu2n7hk0ANcxgs0UEBCMfN3JrpRT%2FNhMY76V85gUguz3evFm6fqicReeJn9cNP51BgNnAA%2Ba626feZZc60XMwXxlknHTAXo8mX2ovMl5a55fPjCN5uh5LIbXFUWmnnc50oG&X-Amz-Signature=a66be6a980dd75cea0d11b1c33e333a81b85bd9952d2495bbacb3fafd3d74330&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIX4UMT7%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T035653Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCIEyxFWLJJsNF1U3N4PN2MfrNQMlDeo%2FEbLH%2F0c8X2eRYAiBSIQVfnUW%2BgkpavfFOf5JZ9%2FZcPoMs9SVME4LFScwbZiqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMV4bfj%2FdDXS9AheK3KtwD3MWni%2F1gyGqZjNLLVNPJLh0EymB2X6Jbt4iunsJCKxcbbaMWTegm9FKlsdUTBcKtEjv51TaFT4UOxSHH6ABwTdWc3WM7UYSqAXM52eMVhE5bK29JG9UoWwHNkgNMuaOoi08QdoPm9dX3PfmVpvSLtidv2YN%2FnVmSOK6CV%2BwiNp8AEgZBAnQ1IY2H5RTturmKatPZ6riTwj%2B9n9AD%2BFCdCJtZi%2BCr66OkD6RuHy97x7v3MdI6OCThA7%2Fv7UkFA%2FDwE7KQOu3K7au4WC3kbGNxNC5mBLXIAz4n8cykiMqCwgReLmyLHMQFwXUIpGTPVzoQVT6uqC8L8o%2BnHTh8zB9HN7jfVGI3jyb%2FtJzth2QTc6pLnMCW%2Bsl2wK11%2FlZcD4L%2FIMu5ICZSERcMWHZmuEasP360%2FB60kWzZpt1B99sJmtp%2BSxr6rQg3PAYtdezP04f2RcDN2MEjVfxRXwklkCq3ZROrVhYfmbZ5Tc3052nuqxuqYiRIcxBE01M0kZhFMp7ftEdl3EvJlRi3Sc%2BpbN9vXGmQIq7vOyjS5veEtnReVL7bb7tcisCMRL8LfLgbtaodySjOW%2FVgFHqglMEAtl6iHhY%2FxsvxnmsLyMVx2Fl2m2KH7F%2Bczv6yXJrP%2BpEwqOOozQY6pgHh%2Bi2MBWxSaEB0GHu1BI%2FjVwA93DFUhiLhPLzkcj1xFGjJ0vEby4SSXgaMYT7cMNMXkVOOyHxgH4aCIKFnoIIwbhi%2BsJmdO44ySY1lFvDzBXU8sHFP5AbFHM37dkdEa6WzSeL22T3vPO47KYggu2TelN4wHfmS%2F0mQkvO9gbXLJPZUv8fKYlQhW0ooQJveOPqQpFBIPo75ZNnl9RyngMsbRiBL36dN&X-Amz-Signature=76b003eae8c058b38d7351984b9608b4754b4ea39dec2128f9b924913cf825d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIX4UMT7%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T035653Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCIEyxFWLJJsNF1U3N4PN2MfrNQMlDeo%2FEbLH%2F0c8X2eRYAiBSIQVfnUW%2BgkpavfFOf5JZ9%2FZcPoMs9SVME4LFScwbZiqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMV4bfj%2FdDXS9AheK3KtwD3MWni%2F1gyGqZjNLLVNPJLh0EymB2X6Jbt4iunsJCKxcbbaMWTegm9FKlsdUTBcKtEjv51TaFT4UOxSHH6ABwTdWc3WM7UYSqAXM52eMVhE5bK29JG9UoWwHNkgNMuaOoi08QdoPm9dX3PfmVpvSLtidv2YN%2FnVmSOK6CV%2BwiNp8AEgZBAnQ1IY2H5RTturmKatPZ6riTwj%2B9n9AD%2BFCdCJtZi%2BCr66OkD6RuHy97x7v3MdI6OCThA7%2Fv7UkFA%2FDwE7KQOu3K7au4WC3kbGNxNC5mBLXIAz4n8cykiMqCwgReLmyLHMQFwXUIpGTPVzoQVT6uqC8L8o%2BnHTh8zB9HN7jfVGI3jyb%2FtJzth2QTc6pLnMCW%2Bsl2wK11%2FlZcD4L%2FIMu5ICZSERcMWHZmuEasP360%2FB60kWzZpt1B99sJmtp%2BSxr6rQg3PAYtdezP04f2RcDN2MEjVfxRXwklkCq3ZROrVhYfmbZ5Tc3052nuqxuqYiRIcxBE01M0kZhFMp7ftEdl3EvJlRi3Sc%2BpbN9vXGmQIq7vOyjS5veEtnReVL7bb7tcisCMRL8LfLgbtaodySjOW%2FVgFHqglMEAtl6iHhY%2FxsvxnmsLyMVx2Fl2m2KH7F%2Bczv6yXJrP%2BpEwqOOozQY6pgHh%2Bi2MBWxSaEB0GHu1BI%2FjVwA93DFUhiLhPLzkcj1xFGjJ0vEby4SSXgaMYT7cMNMXkVOOyHxgH4aCIKFnoIIwbhi%2BsJmdO44ySY1lFvDzBXU8sHFP5AbFHM37dkdEa6WzSeL22T3vPO47KYggu2TelN4wHfmS%2F0mQkvO9gbXLJPZUv8fKYlQhW0ooQJveOPqQpFBIPo75ZNnl9RyngMsbRiBL36dN&X-Amz-Signature=76b003eae8c058b38d7351984b9608b4754b4ea39dec2128f9b924913cf825d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQNHKZZX%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T035653Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJIMEYCIQC3r%2BWdFESJrmJz26kFnwScVe4V6sCFA1EYVdOrA3Z4NgIhANB8zR7%2BplmYMg9hbmw1kka%2BEcQ7CXuUGTuFHk8JavzpKogECNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwiZGvVTrxqK%2BOQETQq3ANUx04rD3blDh0BsBZsoVFVgle7S23pBbi7shuERdsdhdDeAbbu7W6ZnW4lCZmCY6dtLYpnwLJGwOQkosd%2F7eXGUAEqvu%2F3vc38Zz1qikIIL8LzjBJHYpjp7U0VFQk8o74TaK64%2F5uYIhKiPAwzZw5cCrAYrgYNiSGSgPETns0VL0c%2B8VQExc5HXtnKQ13mTfyUpoJPVONyTiHJGifLHfmvrdZcVV1Ny91VW2WMeoJKVeg8u2OQtZpeWFn83ggwbf8pOgofwwb8TVdY76GQa8hUcHyBBaC%2B2dBRs2R73PP6kY1EKTGm%2Fi3T5Vz7VjjKNvL%2BJ6DYpV%2Fq%2Fohi%2Bgg1oEO05oDS00WiMpXyTAI0FId5buznkYxtU51nkGWWL%2Bn37Xt%2FSV1I8TxK9tn1If0Q6LhcrChN4M0OJEq2cmzLbeQq6CUuw0zk3hz7%2FHGJJkq2K3tRCVaXy1jaGUL%2Fa7iX4SI7Os27qWVJaRjAJrUK66cUeCpJa7lnghF24U%2BdEzZ%2F%2BenBi4dK9RkUkVED5YkEJH70%2FUSEELlAWQBBtQlGXkQ6bGpTUvWHjtuHtaMbMtA05jP8AhhPn27pRscD1ECfshxGAgpkjpBSRMPjIXbmGoKXaBIQUZva1SD%2FYwXfbzCa4qjNBjqkASGcwjriPx7frMGdLA8IIboZvX73nq7JY9i%2BZr9DJIdnPbyuGhX0pLujGhPp%2FU3p0MADqtRqPzNJGLjY0YrxZ0r3XaUePuQr1sYqJGPbQy70FSDAL%2FjKDmGgKmhT6C5uMids4ryMIeHajsaZXlzA7MLSCXvaLgJGdXEQCoeMVPVKNlEumCfHzJu75SGbbDmQVtJoeSNNs6tZmQsgjLvVGmiV4SA1&X-Amz-Signature=c9625320cd74cbc5d0899f84446d1894c972add17f7442ed89a1495f3689f935&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

