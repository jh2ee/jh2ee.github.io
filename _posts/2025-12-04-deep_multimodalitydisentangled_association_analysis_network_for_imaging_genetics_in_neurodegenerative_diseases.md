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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCVAPRDR%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T191420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIADcX9K9jUg9RP7duIEgGeENKBzEYSxt1OolX%2FmFLKu2AiAbP3LqxuKqpnb4RJmYO5hCvBHLucJDQK3i05z4Ci8fQSr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIM%2Fm62zmiu%2BaUKOTukKtwD8MjFUVbAtWuXfN%2FqmXwhHH4ZMmDd%2BjRGQnxXL8jvzZ7ly9Sm3wnXxqFJrM5IvT1U60910QgGceiRhqTFs0Q5I09Mt3Fm8AD%2FbSCXLQuiFobzEFvXIpADLIsyZXfPwPlu9URCb08i5XFScjIfRWyKL8%2B8Bps7ySPh5M6THBwJDTX8vBNivNrswc%2FKgRiKN%2F4rlN0J4aEG3m9Rls%2BQ57n5V9lHR9fiyX94u4dWS8lhqnI0m778KtybGrL9kRljUU4Ajc5m%2F86yHSAbPzHhW%2FIK9uwIF8IyNOTE8EvNjnVvtxiHnG6eOGMjCSmDbHXItB7k%2FEamr2BeKMVj8syfesmivqZKnNpWXzRrKT2BPiJwHa0COpHxo3BpFgjoDT8axAwCuMKJm9vBL2MtF9PpEa%2FE3Fo%2BNNxnp%2FORY9g%2BKRCGXabTjYn91CsyjSIu5s%2FnYa3IemzeLQrACR%2BMUdgxka%2BNPzviYvijpMSMnDWNCHXS7sTuNW9rFsxdHWJ2Lo2jEZSILepfyXwLlWFe6%2BkwzIGkCeyt7cdrDfkgiqyI3EdmVNhdT3GmCEv4jYtIfl%2FZiw6sjzldTOhgjWxow8hotey4i7Zdkr1NYjc84gu6j6A0ymMzdYVI7BBdf2a1rA0wh%2BLCzAY6pgEhl1X%2BXSRkdnESDv1xqLDIBOHK7hHoxGjbMhpZAZXtuQK1GaMxrpB1oghi9UICIp%2BJom5Lr2en6jREY0%2BRGy4eooVh8IqTXPWCf%2FMabFNW%2BkEXHbi4KhI225S7LkQBLm%2B4hZpXpqYEuRD7vMXZXICibngJK6FT3n8t64JxiYTPKSdFmDaKlW0rBAV3KmiY3zcUM7Ih9d92qxVpXD%2B3k%2BOFC5uv74DO&X-Amz-Signature=695754b100102d21d0a2f6b6789086c6e257e48c14dc237c90b7d8f9b0395dde&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCVAPRDR%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T191420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIADcX9K9jUg9RP7duIEgGeENKBzEYSxt1OolX%2FmFLKu2AiAbP3LqxuKqpnb4RJmYO5hCvBHLucJDQK3i05z4Ci8fQSr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIM%2Fm62zmiu%2BaUKOTukKtwD8MjFUVbAtWuXfN%2FqmXwhHH4ZMmDd%2BjRGQnxXL8jvzZ7ly9Sm3wnXxqFJrM5IvT1U60910QgGceiRhqTFs0Q5I09Mt3Fm8AD%2FbSCXLQuiFobzEFvXIpADLIsyZXfPwPlu9URCb08i5XFScjIfRWyKL8%2B8Bps7ySPh5M6THBwJDTX8vBNivNrswc%2FKgRiKN%2F4rlN0J4aEG3m9Rls%2BQ57n5V9lHR9fiyX94u4dWS8lhqnI0m778KtybGrL9kRljUU4Ajc5m%2F86yHSAbPzHhW%2FIK9uwIF8IyNOTE8EvNjnVvtxiHnG6eOGMjCSmDbHXItB7k%2FEamr2BeKMVj8syfesmivqZKnNpWXzRrKT2BPiJwHa0COpHxo3BpFgjoDT8axAwCuMKJm9vBL2MtF9PpEa%2FE3Fo%2BNNxnp%2FORY9g%2BKRCGXabTjYn91CsyjSIu5s%2FnYa3IemzeLQrACR%2BMUdgxka%2BNPzviYvijpMSMnDWNCHXS7sTuNW9rFsxdHWJ2Lo2jEZSILepfyXwLlWFe6%2BkwzIGkCeyt7cdrDfkgiqyI3EdmVNhdT3GmCEv4jYtIfl%2FZiw6sjzldTOhgjWxow8hotey4i7Zdkr1NYjc84gu6j6A0ymMzdYVI7BBdf2a1rA0wh%2BLCzAY6pgEhl1X%2BXSRkdnESDv1xqLDIBOHK7hHoxGjbMhpZAZXtuQK1GaMxrpB1oghi9UICIp%2BJom5Lr2en6jREY0%2BRGy4eooVh8IqTXPWCf%2FMabFNW%2BkEXHbi4KhI225S7LkQBLm%2B4hZpXpqYEuRD7vMXZXICibngJK6FT3n8t64JxiYTPKSdFmDaKlW0rBAV3KmiY3zcUM7Ih9d92qxVpXD%2B3k%2BOFC5uv74DO&X-Amz-Signature=695754b100102d21d0a2f6b6789086c6e257e48c14dc237c90b7d8f9b0395dde&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VG4Z5N6K%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T191421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQDQ%2F70cv%2FDastDPsOaLc3RmMJq0UXFYQh0EItJUfE8%2BBQIhAPOjA5kcxI%2Bk9Jk7SfrE9%2BCVVzflHdB83YphQ2HJBhgOKv8DCAsQABoMNjM3NDIzMTgzODA1IgxBmzNiD%2FIn43PlemEq3AMaJ%2BCeJDC%2FEByfkAgf4B2Q53SL6ReiiCeQFfdpJ4ZIyH%2FqeWDhmQS%2BNhEECPGKJbRhuGY5jYZfe2RHKzNMQsRJkpS7Iss5xqz0mtIXOhbTOKXt8dQIShjRNnP%2BpURjcVacPM55GDDqxTIIeQFZvk5VizTApYR08YQfl90glu2Xln6w1hmKei6V0HkBRemav04jEzmw%2FhqCsQMaPV%2BqO0s2HgDNy3fa02oKuqOpSmo%2B6p6IFgMUYkWWqojB9KWpn30XUDOWocWTjmbt0CPC0Hw6VkFQqbmBjm7Rif1TpWT2bZhrlSXWaK7iGDuBMvtYjIZHNzJofcymoAclhsnb3mKkMlLMDPumanmYFnECttajcfWg3IWvWQ2vdLeb8rwTB5IpjVHDuxg4ntykGSh5eFzbUy8KuA4EAOsWJ3dkt8RqAXDycuHXiMsFts9Y%2Fpbz1rZz4ikNl4TuJE1icjTSkNjuVlQP%2Bl7l%2BhxINOuvtzHc9ca9htVyR9%2B0PRcoasnm8k9jO06Nk6%2FRKYYDhEzp9Rp1GRw%2BmSWYo59b5iGl0VdwXd52X8LsqV3JhtLNe5ql4zgAFzBVoxVDq%2FOFUwUKDvnE5iLtvpiNDQgHeippG7WGdKoi5BK9IwfH59fkmTCP4sLMBjqkAVAGCqKxr3OMc2pQG%2F8L%2FKJWKwyECaQs%2Bcfg%2FlunDMilb0cfx1SB1DCBRKoqIS%2Fxq%2FKD6KIF%2FxX8TvTxgEqUaWj2v5kXMxDqvtAP8y6K8IT3TwwkzcCdJSrhyvylJDhVQpBnDvAwtHRG0uLTqbC1kYIdyByeueCn9CUPo%2FLju6gwGDrWv7PpxPo%2FuiYjgqaYBAWkf5zYwlOkQvY5dCVJTXQQYHcz&X-Amz-Signature=af8556ce114882f8a8f2ebc08944568da459b606554dbde78c5c988db269e99b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSUZMNTL%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T191423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQDL9I2yVODuum4b9CI79RcL99tQJ2R5HFQOJD3c1wexogIhAIWkeyksGPTAs%2BcWu4jysOc58PH4oWceuCgDETUCJb9yKv8DCAsQABoMNjM3NDIzMTgzODA1Igxm6knbnUinaPr9pNwq3APApG15E4p8T843%2F86m5kD0n0S4gs2t4s9Y6rlEo%2F0HhZS0V8%2FEJRmPNsU2f%2FUbwqxorgPHqJdC8Pc0kPnKhMXgsrvMvN%2BfJa1lWHPJO1L%2BvMWJtP6%2BembxtldnjWCAgNzxsMhCZe3CzERGO9EYTQIokOYhcAqd%2FCcZHFRtE80NE2%2BSbJtkGCwFMT16isgg2OW0gkvsThyMZ2qGe1oNqMt2zTdsKVfL6sWbDnofh9PsTJ%2BJFWISIUnmiFJ4EbfZATYqnP4fYQCBRYuusVjcpp2bgrt14kPBnnY1o%2FABNpGfN7Z322d8wu0fVj1VP88bi207%2Bgar%2FGhMc4%2FUW6ChVls39GKO%2F%2BkkdsV6nW963%2BAMW%2FMvqRHHfZZGk4HZwzvU8fx0jrMvLbkQ5QUCrWDiyrlBtn02P0JJ8SKinCqCTL5sBHoo%2FdVlc8UZSXS3SIQFVfMl5LSKc2lPZyy%2FXlNAuxy%2BpQHdJIjIr9A2aKYH3mplHePpqvmJ5tJveQSuJ5TGzIoWzuivFpCC6%2FS%2Bhcnmr6Ok1l9GZ2cNv1LTFZkHTETE3JLRCKBpuH8Fg99wZ1NSSSv5%2Bx%2FpzxVQvfK%2FjapUazMC8QK0vwQ%2Ft%2BNyNF8IZ6Ci47XIo7uQ1RK%2Brp93ijCH4sLMBjqkATx3fa7OBBGPU3i0E4MO%2F7D5wTKzPM62twI%2BTIkLO11D6jbi2a2Q9FG6gMO6ZmbAhlrD1nQC68NXNGQG5JK2mLnPEigYo6Zz1N2uWSWk4r5iLrhFHyfd0nkJwMDbnMf0bZyCGpx55OQyWYVAvmn2Xw%2BCt5uTHrOgG6MyApBX%2Fo%2Fv68OCzaVnpVFRTfIo6bGHWZXEBkauXkOa5O2sIEM9a6bZc2sv&X-Amz-Signature=8288b38e51cf5c7a3c34255f5522de38ca53e6775e72d452a9e70c4a9d5a2c57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSUZMNTL%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T191423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQDL9I2yVODuum4b9CI79RcL99tQJ2R5HFQOJD3c1wexogIhAIWkeyksGPTAs%2BcWu4jysOc58PH4oWceuCgDETUCJb9yKv8DCAsQABoMNjM3NDIzMTgzODA1Igxm6knbnUinaPr9pNwq3APApG15E4p8T843%2F86m5kD0n0S4gs2t4s9Y6rlEo%2F0HhZS0V8%2FEJRmPNsU2f%2FUbwqxorgPHqJdC8Pc0kPnKhMXgsrvMvN%2BfJa1lWHPJO1L%2BvMWJtP6%2BembxtldnjWCAgNzxsMhCZe3CzERGO9EYTQIokOYhcAqd%2FCcZHFRtE80NE2%2BSbJtkGCwFMT16isgg2OW0gkvsThyMZ2qGe1oNqMt2zTdsKVfL6sWbDnofh9PsTJ%2BJFWISIUnmiFJ4EbfZATYqnP4fYQCBRYuusVjcpp2bgrt14kPBnnY1o%2FABNpGfN7Z322d8wu0fVj1VP88bi207%2Bgar%2FGhMc4%2FUW6ChVls39GKO%2F%2BkkdsV6nW963%2BAMW%2FMvqRHHfZZGk4HZwzvU8fx0jrMvLbkQ5QUCrWDiyrlBtn02P0JJ8SKinCqCTL5sBHoo%2FdVlc8UZSXS3SIQFVfMl5LSKc2lPZyy%2FXlNAuxy%2BpQHdJIjIr9A2aKYH3mplHePpqvmJ5tJveQSuJ5TGzIoWzuivFpCC6%2FS%2Bhcnmr6Ok1l9GZ2cNv1LTFZkHTETE3JLRCKBpuH8Fg99wZ1NSSSv5%2Bx%2FpzxVQvfK%2FjapUazMC8QK0vwQ%2Ft%2BNyNF8IZ6Ci47XIo7uQ1RK%2Brp93ijCH4sLMBjqkATx3fa7OBBGPU3i0E4MO%2F7D5wTKzPM62twI%2BTIkLO11D6jbi2a2Q9FG6gMO6ZmbAhlrD1nQC68NXNGQG5JK2mLnPEigYo6Zz1N2uWSWk4r5iLrhFHyfd0nkJwMDbnMf0bZyCGpx55OQyWYVAvmn2Xw%2BCt5uTHrOgG6MyApBX%2Fo%2Fv68OCzaVnpVFRTfIo6bGHWZXEBkauXkOa5O2sIEM9a6bZc2sv&X-Amz-Signature=2016f6cf34c9bea6ade310b3945f606e14177e23a7fbe939b8dfc6029ca9520d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTP7KQLP%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T191423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIGYVqDvfFoqHQ8i7lkXMahl%2FbQMENGl4c2BAHtKX6Fb7AiArIj4pqdWqFQwnSfLFk1%2BVTN1Yuq%2FUg6UwRQ%2Blqjasfir%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMkaCOS%2F6TeyuaQ3j5KtwD2KHqdtgOZKJIOGTYc3RRUwWkobJGnPAq2j%2FY%2BW0uvDaK4pRl9C2cNU9mtaODljRBxzRBD0bo01oFtQoNW7CQnNZx46cYvra9l2Luc9grMVbyXJc9XpYx0ONw%2Fp%2Fx3UQiLxGqOASpDPxbVw1ZA0UvcUfeUx0A4G1j6ZbdUW0diV9mRkK5V1nVaSn67sgiYCtd0KM68xf21itXBNSD7x8rLNKtvNrD6THi4xxTTlqhyX3ReZI96LZi4iiYlm8zzl7v4lErxHkejMLPjNWzLi9rHUxA8FsEv97tOz66bPyoIHYXcCylAqzz0tNu9sG%2ByzmAEzMvRZKXly%2FQgolyjIVgLaBHWQlBWtPJemDCxm2GSzeeT4g1kTRkv9RBsB1zFN%2Fdix4Dy5ozHAvGxKpLCWA%2F4hgLVHEgH%2F%2BQeDGJD39foKQoYJ8mMpnKBSbc5R%2F31Z%2FkzP50sY59ez9cTEF7SAcIACMvKydj1d9wuIIHvbjCL5Jc%2BNoeCsU5XaDewfeXcZpy51BOdHwTt9YglL9BQbEh6BlrWDTX10FcuYxL68eHg1rPwLXJOSYzCPB3PjFFAkN%2FnorHSwXKoljnvQR1lXjzGRrE%2B%2BEZXGUSSg90FJKdKSYmr5IcX%2BuAutpcplkw3%2BHCzAY6pgFgw1VkVCo%2BHNj91JSdWUNed8lPJuT5VpKvxyyceaOa5eoAEama9w3mlKZEqeCkHIG%2Bk4dm5evMa06s%2FRdMimWxl%2F610kyNDjsg6qY1gz9FDKSqZjIfg9M4pevzs2S0b6RIXAW8HZdDGPc7zQF%2BmFk7sRmUHerXaHt520IWWgFJGii5x5FMgp8RGLXXoJjPtFkzA283BaWOF5p6G9wi1BqtPNL3eXGO&X-Amz-Signature=d2061c03e16403d917f44e08ad3994526a83d858526744de23b8254e1c7e4e6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Z4V6OTI%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T191423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIFP8E3Fv1OgcA99ldsTgPgBCpwJkwm68LHSvgBVhUP1kAiBPEoxE7Oji0dhdisYfFXH7ZgIjofk90zIQtgEl%2FmhHsCr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMX7vRS9F9icMuzxPAKtwDVi0m9gN8MhcJ8yVImQ2Hi448G6NRUSPQapUdMvtlMTEiiYi6iCkks3QlXs%2FRVtwf6VdITsJo5dq4IOv%2BMKU%2F%2FXcmszsu8hwjYeRdTsPX8lbC%2BR%2Fl2OW3IUutXxlZWXweUEIE6VMI%2F1wz%2FjHaEAmskUUYN2GK%2FxYqpeBsWHFCfL65cth4WGvUM4tGyUBOqUFUd0dqi4wYFRQuFQvrz8eNUe2E20BC5IR37CejdFHir2G9qkBQIBHNujaLq48SiP%2FiuwytDpqiO1pPpZljv5CWVpowrpodFbqnl3CP1X47MqQLsH2Hs6t0u%2F239eeKrgWFJY3lNkW6Qd42epZJ6Fg1%2BOhWL92iusam221WokjWXboivSmm4pK3zKfKQQieDISuruMOaQHwFh9%2FnjapJmltFs407TfJUMci0JowJWp0CMHIjzccPWnUcD7jXW%2FW8QKEe250zsU2q9KE91eQKp9MYBr3boSq2lnDnI%2B5PofQJDe4Qn1Iak%2Bg4z8nWHJmMFPJFm1OVW%2FhPDCqQadwLX61p4vcRwTekcR6PysmbzQFwEtuOI%2FXfcxwwnsGKio1HzL6uOGmLLX9yYPUgI%2FV4yhotBRi6c3EZXCX0s4T5FMBoQ0vlrP6Ml9LMER%2FeB0w7OHCzAY6pgEn4bh0gxYALR0StH8Pq4RG1NWJPWAQoDD4yg4y8IMaWjZoAZsi5UJSVFQpXj6ukUE2WHPxCndJPRxZrMVt8R8UmfA3WjqvfMOgZqvZvzGjlIahqvbt3JnzJOnp%2FZNNabJt21qdJeemRESifRUki1a%2F37K5GMK77K%2BzcLBgLSTgjKEevCAUr6KQ6DDxAoGvq6YXS5l6r60wwlnb4Kwijg4eZHglfcEF&X-Amz-Signature=20a9a8b6a089aa420bfe5efd3d3854f1ec8fe1c8df7cd5df390f4f6eddbc4ff6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TOSLAES6%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T191426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIC4J0KMgXYotiQ7PXuSEt4gEGDur80CIkk0EiOWX6wx5AiAI2tkBAeOgjhAagZvu6XrEmseEbXQ%2FjuGEq54OXK3%2F5yr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMiXgiLPbEBKbngkeXKtwDHsgcUwlPqgbCMWyzL5DwEI0%2FELNMeeGMsT6li1anTx7ybW524%2BZ33plz05n%2Fw8mU85ULQW0oTuReqQQ3iRvytQYnqiQf1n9Pp8tGPvMHyWVE8hii1KI%2FvfIeR5f3JtbCDoQI3KmXVSlD7XGKCVc4EAeB%2FtLdAjUrLspTn0OVhMr6Jaby5KhxZGJKlQaQYHPVIozmrmCHIhuUrXlrcr1QFwXe5eEp0zPnUXWfGAkt3phnTKg01Joe5tdfhCx9%2FbxF7QhhFd0EStFdDt92k%2BLNsL16ObT6ffQTGUHP2zW4%2FsQBwwJATS7tdDRP7hpbf875KQA7WyZ0TaFajK0vu8t%2FJE0IYA0vQrlypBnghMscRUB8o%2BqD2adEwco93VsJvRikg3%2BeH7MyplE%2BSy8mnLXt3B6YrUecpPvqjI2VwJ6KCvwsiPWiFJO7%2FKv632Ia0I2B%2Fh8FgRqgLyFHS53BGTPSaidpnSIg7guW4dxrPshstNbyGDUHxZVA1SKsJL3s49mLTvNJd%2B4s2n12hb5BPLdnZhZAiV%2B%2F6cd%2BkplBzpzmYGIX%2BBaHfRN2qvrgfMfXU8jdL9SJ%2Bu8xDt2D7nHUapSERTne6%2F3i6QP3RkkVfTdrU53f8Mi4v0W78HGAQ7owlOLCzAY6pgE3WynMJvu%2BuT3BKc1vOeDXSVTMBvRebnwk8zsu8mMIKauZgy6PdetIEN0yKi4KuJ4iC6L%2B%2BGb83gb1c5FpVgamU4JIX%2BCxBwFJ0njm1t8WOjwANfM%2F1PTpkHqLKNDrcEh%2Fx9DV%2BTDZK%2BCeiwODxHhR8CbQ0DtS0kZeheSaTxexqhMrYLQb9jQbckuzvES8W1YFjjs89EdfxymF1Z%2BEjlixL71WWWMp&X-Amz-Signature=62a2ae22492088aea091aad08b3b7eacb89a6a963e9fe0cba40da38f01574958&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y5F6FH6F%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T191428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIC0Ne1APjhIyRDS1HtoBxqiwPH1NNtdiHD3hIXEeUXAOAiAgEuFY9EUdvR9vPTlhdkVLwxHREJNrVunnvCVpTDzVvCr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMTRhTDQ3TQQ88Y%2B2YKtwDWhaOO3c%2FT1tkIn2LvZ7hW6vgUBtYQRZjMzvqxmL70P%2B96IfcdqjGl1ZgA95Sf%2B11DjQMcEgvm4GzPKaoOcBu9BZjwBhHW59OP6rLy8sokYwsZYcvqPbCiQmfneHMKzLtD9atx%2F1%2BTSquScdHZx3ki8NoM414dXMM7XOKRb1gewr%2BnHwSxKKPbTVK14YaaplLg9zqqafqUxmwBR6cScWH97MQt9lL3kZFwJjxtQleY05%2FV2Mjzyf6n6Wn8tOcBV4c2yOdAONox1JrOudl9l%2FEcRzcJQuCiaAcfAKPIc0rM6ntdlDsbN0c0CEYoWvIiwOmJEn%2BZqL4Vgdwtr4NSwScQXEql%2FDxrWOnvQVAeJO9ViS6n8bC1UfNH%2BOaNKz23Qp7cgm6oEDjShVe6XoMNiXlxcN%2B%2FgpwFm2WVMgVeiVXGcwiW71xD%2Bq17wIBytxjbP4YhC2md00KzGo%2F4NNr%2F%2F70d6yPbxhc0Dp01nD8CnEn017C0S1sdABmJO2dMiekX6dDjKAcuzhF36iOgtu%2BmsTiZ5yd5lllTcUK0oALWj8uRs8kVAUm6QFnt5mzM0c58ipjnd1BtNIyjIUXJgffnNFlkjcK6AJSSKRe%2BICtsLisqXTIiq0h4P058ottTv0wtOLCzAY6pgGQapxELiVr2HbDgoqU214ZBooqRdtcrxvzxEC8UD0UU6aG2ztCwzycYbj4mUrq7FB42D6BQoCxsAwhBiBuNc71zHJvaD5rys6bMVlyNsZWN47iiKlGpEwEJQEHwtEl87zjQYVeFtrXj2Gj6LNCXQcbmPGypZL6Hw79Da0vAnlC3rSr8d6fWbv3aX29uKmcoU0T%2Fc6mVACp6sKboIbQGN1zNQvg37xa&X-Amz-Signature=4734a69a97db12813b9ee9f0a9a75f7817c972a67d1cf951d8568823080c5e63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y5F6FH6F%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T191428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIC0Ne1APjhIyRDS1HtoBxqiwPH1NNtdiHD3hIXEeUXAOAiAgEuFY9EUdvR9vPTlhdkVLwxHREJNrVunnvCVpTDzVvCr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMTRhTDQ3TQQ88Y%2B2YKtwDWhaOO3c%2FT1tkIn2LvZ7hW6vgUBtYQRZjMzvqxmL70P%2B96IfcdqjGl1ZgA95Sf%2B11DjQMcEgvm4GzPKaoOcBu9BZjwBhHW59OP6rLy8sokYwsZYcvqPbCiQmfneHMKzLtD9atx%2F1%2BTSquScdHZx3ki8NoM414dXMM7XOKRb1gewr%2BnHwSxKKPbTVK14YaaplLg9zqqafqUxmwBR6cScWH97MQt9lL3kZFwJjxtQleY05%2FV2Mjzyf6n6Wn8tOcBV4c2yOdAONox1JrOudl9l%2FEcRzcJQuCiaAcfAKPIc0rM6ntdlDsbN0c0CEYoWvIiwOmJEn%2BZqL4Vgdwtr4NSwScQXEql%2FDxrWOnvQVAeJO9ViS6n8bC1UfNH%2BOaNKz23Qp7cgm6oEDjShVe6XoMNiXlxcN%2B%2FgpwFm2WVMgVeiVXGcwiW71xD%2Bq17wIBytxjbP4YhC2md00KzGo%2F4NNr%2F%2F70d6yPbxhc0Dp01nD8CnEn017C0S1sdABmJO2dMiekX6dDjKAcuzhF36iOgtu%2BmsTiZ5yd5lllTcUK0oALWj8uRs8kVAUm6QFnt5mzM0c58ipjnd1BtNIyjIUXJgffnNFlkjcK6AJSSKRe%2BICtsLisqXTIiq0h4P058ottTv0wtOLCzAY6pgGQapxELiVr2HbDgoqU214ZBooqRdtcrxvzxEC8UD0UU6aG2ztCwzycYbj4mUrq7FB42D6BQoCxsAwhBiBuNc71zHJvaD5rys6bMVlyNsZWN47iiKlGpEwEJQEHwtEl87zjQYVeFtrXj2Gj6LNCXQcbmPGypZL6Hw79Da0vAnlC3rSr8d6fWbv3aX29uKmcoU0T%2Fc6mVACp6sKboIbQGN1zNQvg37xa&X-Amz-Signature=6e7e2ce55a22c37468f312f14d59d1d650a56a7900bcf45014310ba02d75095d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466STNO57RM%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T191417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCID1orcFBjh7Vwi50BduARLCd5QaK3UQ9CY9Mbcb%2FQnnZAiBLx7%2BLtJlkoLFej4s6meQe866jg%2FdMXcq8VxxiaKe7Bir%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIM1Vva4iS6dLPTGFsNKtwD2RCOnbNlBj2fWquSZVPfz9sdAgFeTjgPXsKsWgE6KdVTtNCOSUM4VMcZ3usUZhpSacCW8edpvS1eW3usgmDNm2txP4VYNMBALpZzqjY6cRhcevJDm01A%2F0Tcl0QhdBWu2wrZP0Adso%2FfVVgjNPbcS1zEfvCgcYbjv%2F1j%2BgdRcrYR9tpNqRHTNSGVBEM1QiuCx8mg6QaHepyJ64R3OjbH1hbtiK9sfjsCFyoev2XA%2BVTcM%2F4wKJ9dczqoKC49vb0AbkFTI%2BM08zfSMdN4syjz1SXog4uYGzWsQ86JURUU4dc6l6CPi3VnF35tFR63mrR5RRof0Cc4QIZPv7bwQnlaPTjyMNE6Lqp1EFeKjkuh04y29QjsUxOLfsM2HFT9RpAKob6M9UK9%2BY1gjrnaACQGPte1ovSNuV7TThU30BrGuviGxbI%2FuH5ApJC7Jf8PmzCl282tpl34ovoHjlxbhmhyTDha3Hi1zb78%2FKfyGBq7L4VYluC3JceSHf%2FFfLqo4txpZtJKf1%2BQ2dPSbuTkZP5hAGkIS2e%2BmLkL%2B1JuD1JVw0EHV30LGQLCgZhzFrbJ2JJ8ere5lyPBFxrKzTuQmW6TSynNTWgWlTlcpQK%2FFj9dZSGYwPmLGSLxjVSTj1AwzuLCzAY6pgE8LpVrAWx4xN7uf0%2Bx4vGOWSbq6MGGrOF05iTwa%2BDOO9zrEQNtdRZbuplYr8%2BAW0p2d1ZXcx2PTAE2QS9cJgQ0D3Ey1Ar8PxBtMO3mZ78Wdm%2BzHSqGD7uizI92STlFOtQHorQAzQ8Ixt5Sds6FDoGPqeNWbNeKpbr5kR%2BSYyUSkn%2BzX4qS3XCnzts14SL4SXlFpyPPWKEtwTIXa46TBswDGa5no8yb&X-Amz-Signature=c57e166ed3d10a76096357330e1ece1cc7cdeb9bf81f5641d11e3a8114f7c650&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T67NYIGQ%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T191429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQDr5ClVgER9t%2FQzgaGwIzJd%2FuewqB%2Bm%2BcYguzQL%2FFPjUgIhAIL1dTFG4BBB0Tyo7l2DSPsSIvvMbt3DXRXhMkq2UdcEKv8DCAsQABoMNjM3NDIzMTgzODA1Igym8PKl4UdLdrxCiPAq3ANsj7CvmlWB5aUfqvItUzdm8ntXmOp4rCVwbpZ%2B77rti4XBP3XLwbc0wgj6CpW%2FA%2BAZmC93Q0w%2FdSyTjmILX%2Bs%2Fj9yRttm4G3G7o3KCAm4fzOUMSEbYDA4zvUdSi0KAvhJQN5uhl30vHb7AqGtRGFLwnpjr4RtBQrcmMn6WgX5MqMXHHMgrdKKMhzGKD4l8JZaTiKEhubmkIzMot%2Bit6kkpIaaNNRtO%2BBwP75H%2B0E83w5V4bblAdVLyVRappmiXDYNAld9M9lOddo3%2BeSS1TWQk5e85ilaqxBr%2FWVvnRwz85XESmgONlfobxiIyIgahoshQVb6aG27QhIHktdtLEcikrIMoSmiRuBtwuSn00PryhG8nrHyS%2BbTc3YGdR64X7XxwzeIaV59ui8xiPsaKVS22q2T%2BbCEONxRNlVMAqIqMszNsSvi82kzyYhbU6Pnx7Kq1hpsSN1G9YVPKEndLcTNbKRD8%2FfMdKdYx9poVEz8Z%2BuNkHicsckbFyAY3EWrzGe%2F0rr2jAzDvC6nhINT4gfR9Zf2LzAdq5HjkCE6LB2uD2dxc8FANA0dmL47%2Fgf59sEY%2BZomlXIeVxNghCJpYHi9kE7b7HYqrTy5oR0vZXohyVUCLVsjc9BBi1tmF6zDw4cLMBjqkARsGiEErtbn3vCzpB7Iv1I%2Fb5JQ4LrxGKwZ41HsBiIN9EASy5pzDFABhtda1rK6kC93AIpS9zZ7bI6O45fyJss2bWMhRh9sHoQY8fL19Szicsle8vkU%2Fr7kw1piDYo%2BhIM03tEGW3TD%2BJB60YiNGAW8uQpfC8RqLPNlon6gUvY%2FIlhgXZCHBgsmXCBNJZB4%2FQXM7sjJi6VVrbj70kYTJVRhAUvek&X-Amz-Signature=afa92c68af20be413b139f0ee3396085ebe9d718b0d52e3756734388f5b8248a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T67NYIGQ%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T191429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQDr5ClVgER9t%2FQzgaGwIzJd%2FuewqB%2Bm%2BcYguzQL%2FFPjUgIhAIL1dTFG4BBB0Tyo7l2DSPsSIvvMbt3DXRXhMkq2UdcEKv8DCAsQABoMNjM3NDIzMTgzODA1Igym8PKl4UdLdrxCiPAq3ANsj7CvmlWB5aUfqvItUzdm8ntXmOp4rCVwbpZ%2B77rti4XBP3XLwbc0wgj6CpW%2FA%2BAZmC93Q0w%2FdSyTjmILX%2Bs%2Fj9yRttm4G3G7o3KCAm4fzOUMSEbYDA4zvUdSi0KAvhJQN5uhl30vHb7AqGtRGFLwnpjr4RtBQrcmMn6WgX5MqMXHHMgrdKKMhzGKD4l8JZaTiKEhubmkIzMot%2Bit6kkpIaaNNRtO%2BBwP75H%2B0E83w5V4bblAdVLyVRappmiXDYNAld9M9lOddo3%2BeSS1TWQk5e85ilaqxBr%2FWVvnRwz85XESmgONlfobxiIyIgahoshQVb6aG27QhIHktdtLEcikrIMoSmiRuBtwuSn00PryhG8nrHyS%2BbTc3YGdR64X7XxwzeIaV59ui8xiPsaKVS22q2T%2BbCEONxRNlVMAqIqMszNsSvi82kzyYhbU6Pnx7Kq1hpsSN1G9YVPKEndLcTNbKRD8%2FfMdKdYx9poVEz8Z%2BuNkHicsckbFyAY3EWrzGe%2F0rr2jAzDvC6nhINT4gfR9Zf2LzAdq5HjkCE6LB2uD2dxc8FANA0dmL47%2Fgf59sEY%2BZomlXIeVxNghCJpYHi9kE7b7HYqrTy5oR0vZXohyVUCLVsjc9BBi1tmF6zDw4cLMBjqkARsGiEErtbn3vCzpB7Iv1I%2Fb5JQ4LrxGKwZ41HsBiIN9EASy5pzDFABhtda1rK6kC93AIpS9zZ7bI6O45fyJss2bWMhRh9sHoQY8fL19Szicsle8vkU%2Fr7kw1piDYo%2BhIM03tEGW3TD%2BJB60YiNGAW8uQpfC8RqLPNlon6gUvY%2FIlhgXZCHBgsmXCBNJZB4%2FQXM7sjJi6VVrbj70kYTJVRhAUvek&X-Amz-Signature=afa92c68af20be413b139f0ee3396085ebe9d718b0d52e3756734388f5b8248a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDHHIHAY%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T191429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCt79ZfQEPMOu3G080g%2FFulLNKID8CNA5CJ74C9IKOv5wIhAJBH5D0pAD8aTj31jo%2BlbS1v0HoAivSEtL8oijqxFbFYKv8DCAsQABoMNjM3NDIzMTgzODA1Igz5DLKlHU5qHa%2FB2Voq3APyqFQf9kry285c5ev0ryAk%2BJ3TtJK%2BixS46qq%2BD9l40wjgqWevcg3wu0UjQo03ZkDL6miAEnMpUnyGKyPpTl8auziQos4giOCuLkWXPz%2BwNOMkw9ZjmlKi%2FjbPseyLKwbtDRwuwy3T71h429GaYt%2FtvGyY6VD5Uw3R4oqMHaINlsG8tA%2FNjSyNemPfxg9v2PC0f7%2FDAIqVXIL0Er2UtFAD%2FkyqYm491ObDyXZy7sxY1hW7SO0Fb1mqBwumpmJL3n4259VT2SnB505046rrWo%2F1EAHkoBSQ%2FrooTQ5GHyi%2FaeM8Jez2fn6ch3NhmOUURoDOCOgdlfyMn2c5s%2FZvHIJcqPFlD5oLIo%2Fxl84a5rZQzCmm0avrRdZsI7QwUGG41d620JW22pLuubsUL5noW23l2GyASidk%2BM0JTnKMyhaRda8pl2lj4AM9zINPDsFGdMQUmRK%2Fw2Ud5u680iBWdq6i6Pbxc%2Fr64SS67UJKsSic9SyoZ9Y6ajVoZZ2KCPumJH5PIjU8YAje7%2Bt%2FLStzmZ6MK%2B52Am0jfuw0nPFt%2FUOAJrbYhW3W7GkltnV2N0bhx82YTffGSZ1RcnvcRwEImZRIVw6SkOyFBaVOMzH9fcz5YFD8C6wYdfJQtLu1CjD54cLMBjqkARiSWefVbUw1fqSpLYIHsGIibCYK7%2FKORt7PZ6PIyNpR1XvYH7iIaTg%2B5Rr3qyQAMuHT%2BGkRbC7BHFU4rhbQRQYtxfU5GyFhaZo3by6AeKQKuLLS199GqOw5x%2FfLkI4vxw3EVG5%2F1pekYrxSnebcdPmkyhk4ki5lRL60tIe01iPa6uBcIkGIH%2FfQiz50aARUZF%2BQ2NgNKethdFHAnR3k4Nzm%2F6z8&X-Amz-Signature=dcab7024cd432eed6161dc21fdf73ade95ff450fefbb0feba0816400458645e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

