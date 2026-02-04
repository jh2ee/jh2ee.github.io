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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46672AERAUO%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T102612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIA9fo2DLowp8OrwhRcLW25%2FyVws7fKH0nMIoTcUEBQfKAiEAsDqnY2B0sj9mO41Ro9vdNgdmDU%2F00Q4uXh4QE7QiL9Uq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDLR9biVcLT8T503U4ircAx0WFuwQp%2BBv4pjeiE5FcRFukhzwn90xAkl1SwBdLoC9BXM1srlDyJUNAe%2B7TThWGSy1dGCrBCaMDSWZyiqkg%2BcbsyUcIl10xOfm6nBJP7flaKQTLwvvWtE3lvvFIVWOqyeZwuID5CpZnTX2B3pCJPYAEPV9bsYchJxJYC25B1JyfweEZlkDAIJfi90TE8MfVAStnlQ%2BE0QJQ2BYDIWrW2Gl4gvrnoTbA23lS5r5pj2KxMo4QxdUfdWt%2FJMvGix%2BuFmS0KcagEwm3p7ro950ubCyayIQLAFTWrmmd%2B5fLzKq10aoYpFr8u2JDQ3R6trBaQ7dbGHw4BNQvAKWf81vuEXSq5iqGm4vj3UWIXP8sAUhFB%2BynKYxZejFOtKJNDgyTHEKeBwWoqqZ2ocvobyx5FBEVhzJIWyypWd4FP9mETj2H0z4cJIoXuqY2v39owLH6q00DDOAmKEFPI%2BP3lU1FJP0sVep%2FYFa7pG8GP76FEQ0n9jPfPyHDzM8DPjgjrkSZnOwRsle0DTGihS%2BrdnoNWUK4dWziOijtp190bgz7Eo43GzAT0VCyQmAXcsRPsGVn1E8YaWh0FF0%2B92BlC6VqAB3F6dhdvUO1ZyrXztLEqV0yP3Egt6w3P4sGlfgMIy5jMwGOqUB2GF3RHE%2BzZ5zSzgb0by8QTlZDkr2Tep3OSvh787m0x%2BMyP1Ix8h%2B%2FsmtjIavaiwDcE9SbFsxTlNdFW%2BZRgqLLTVoe0gtxfD8%2FMcy2jTYJGm0AcppPj01BOhYUI2DOdnFoyrDCInVqrwVMEu2KmnCPiwq0pajZ76IucqPEb0xXgCdxHp2oCsQdNndw05ytihH%2Blei8S26vCthuUFiyHJ66Zyl5XBH&X-Amz-Signature=be06843f91340970e7f7f44d20ff44b20ab0cbec1bb0f521434cf6def80988e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46672AERAUO%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T102612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIA9fo2DLowp8OrwhRcLW25%2FyVws7fKH0nMIoTcUEBQfKAiEAsDqnY2B0sj9mO41Ro9vdNgdmDU%2F00Q4uXh4QE7QiL9Uq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDLR9biVcLT8T503U4ircAx0WFuwQp%2BBv4pjeiE5FcRFukhzwn90xAkl1SwBdLoC9BXM1srlDyJUNAe%2B7TThWGSy1dGCrBCaMDSWZyiqkg%2BcbsyUcIl10xOfm6nBJP7flaKQTLwvvWtE3lvvFIVWOqyeZwuID5CpZnTX2B3pCJPYAEPV9bsYchJxJYC25B1JyfweEZlkDAIJfi90TE8MfVAStnlQ%2BE0QJQ2BYDIWrW2Gl4gvrnoTbA23lS5r5pj2KxMo4QxdUfdWt%2FJMvGix%2BuFmS0KcagEwm3p7ro950ubCyayIQLAFTWrmmd%2B5fLzKq10aoYpFr8u2JDQ3R6trBaQ7dbGHw4BNQvAKWf81vuEXSq5iqGm4vj3UWIXP8sAUhFB%2BynKYxZejFOtKJNDgyTHEKeBwWoqqZ2ocvobyx5FBEVhzJIWyypWd4FP9mETj2H0z4cJIoXuqY2v39owLH6q00DDOAmKEFPI%2BP3lU1FJP0sVep%2FYFa7pG8GP76FEQ0n9jPfPyHDzM8DPjgjrkSZnOwRsle0DTGihS%2BrdnoNWUK4dWziOijtp190bgz7Eo43GzAT0VCyQmAXcsRPsGVn1E8YaWh0FF0%2B92BlC6VqAB3F6dhdvUO1ZyrXztLEqV0yP3Egt6w3P4sGlfgMIy5jMwGOqUB2GF3RHE%2BzZ5zSzgb0by8QTlZDkr2Tep3OSvh787m0x%2BMyP1Ix8h%2B%2FsmtjIavaiwDcE9SbFsxTlNdFW%2BZRgqLLTVoe0gtxfD8%2FMcy2jTYJGm0AcppPj01BOhYUI2DOdnFoyrDCInVqrwVMEu2KmnCPiwq0pajZ76IucqPEb0xXgCdxHp2oCsQdNndw05ytihH%2Blei8S26vCthuUFiyHJ66Zyl5XBH&X-Amz-Signature=be06843f91340970e7f7f44d20ff44b20ab0cbec1bb0f521434cf6def80988e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6HTZZJU%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T102612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIEKHGbw%2FOs0ydTgbB3VNE9yKPR5W%2B8DeiU661nj5JixzAiEAoQfIPihVhI6BsH%2FHsVmk%2FIUa1lTO4p3HvFycwiRvKSEq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDI0z1Nuu9N0eRHAk3CrcA3IwqSqLfamA94J4kd5T%2Fo%2BgVYi9P6HvgrT9Csb%2FYAE8uf5OiPzvIywkEEWj86USGFZUfMUrSzDq5vRslEFbIZja%2Bv0m%2BaQzEDIHPqBH5zOoFS%2FGFDlpEw4mdDuRAC8Vm17OKRLN6luKGK39JBZwSi83Iyjnz0YtwzQi6KHdy0dc4Q%2F5anhKYgKpU5y%2FXs58W48vjhwFyjXFVqA3Dgw1PyA%2F0Rxo19KxeDTmdclyiFWOJilTuMaZepgU86dxfHwHhCVXxqjCgFVeFi4vnE8XBXxeLk%2B4UYBsKsLOt6V2kSJhKXn1j4JlgpxuJjhZSqruLNelnSjeQkUNB6ItkKjYcxTe2W%2FuGkswVvu2lRUyUSAGqN48U1qrjgIxtKdAjPuQMLw1i5lIjE8eRXV%2FOzGktL1r5uBM82wdjK4k0rwdgVT4VHgDsACyLChnvYy2ZDzasNWmHcYanTpCMoqF2AdOvRVLphixASsmjc0Rd94q%2F9RUiDtNoWt1Yz4lr967DNF9ZRba8aND34rYoTFuQBDQhQvsgUufGPp4Soj9oEMHzENMWVLJ%2B6rBfMrTWdvyFXvinpN5jG2jY%2B1qzKUvZj6uIhp36ShEIY9Cgt2qyg8Zr9prvZ91bxZqn294sLqkMOe3jMwGOqUBBVCfKQQImmfiphfuoqgSj1kdfBju5biEaCtSfmuul8MDx11szuJGHigkHxGeORCOVORD6%2FJgx3TRqXJwVSLEW2pTvhTkKyP3mKC5A%2FZS4%2FH9Zy%2FLaHGTtGobePBCTWRcs7%2BANxiXIRASL56TYNUlLVl6bp%2FMyXlqVAukGZpvpFOr2H9HmoJLrgfjrxByvlCPLkCn%2B1BRnq1MH8N9L%2BaHBKX3G%2BS%2B&X-Amz-Signature=19594044864b17c4c9ecdd6bfe7d3a3cb5fdb8b089f0b1dc1dba72f9854ade73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZW7T6B4N%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T102616Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQD6Hp%2BL3pdi30MC7wuokMgPVsSmcfVR2HEhPwm6XksSMgIhAKjm8BlnO9uvmytQ%2BSyjsvznd9F4bjzVC96PlRCW7%2BK4Kv8DCBMQABoMNjM3NDIzMTgzODA1IgyXIwdfqeqkF33X2Fcq3APYmcczgOSu8SMetR6yKAFunO%2BC54pkh5Qwx7Ub7uFDOyG8Rn8Ntf%2BAxq2VCK6aYIvSDmwJOqe%2BzWzaFu1%2BWgLeIeDmpIqqF%2F7cBeK61d8B0ciGIUoHsuAa7B%2FoH2ZB9bM%2FqRzwOwHFa3PjDculBDCL%2FUUMgxM9AWNIY4GqHKsmxw8UGZk2g%2BGiaCfHGUiwrjUSS5Dr07Ey29GZzQ1VCts2u1u5EBRY2Oan7%2FQaswoOPQvXGt36nZlZyzxwlppnJlyvEsp%2BrbR7qBdoso7gzhiI%2F6U8hv4KyJMPa8DAeXOuNs2nf2B7VU0XmLBVqBo0XsGRSsDdi%2FhRGyeyIHN6zDz5wm6KnOgIdpMg22Olo0Az40QvOF2%2BUinAl3PfumUBcagx6Zub2ZRiO8BNla%2FnDlyiEeY%2B9Ft8S2QexsitPtmlsFSRpQQls6r59F5%2FmizRXPF4Q7rb9ygkp9H9g3xt9CfxJBjLdCNLVtn9rWOBJs1ELtBq%2BWlYdWQxKJF4Mw%2FH9w1CG1K7MsToQVfAWScHUa7KpqNhhmlYQ0JEnRXqBFF0j9BZrIlodveOXId4aqibr%2BXBisRI5M0qQm6ZW2jQCzxi7jdC%2FfHItLBa0rCTe1nTqgDoyTwVyLIxAfQFfDCfuIzMBjqkAfjC1Gtz1p8shbKN3AG1TlViXlBcwRKuD8K482%2Bv%2FEKOaZDIh54iIpDc7RpqKd3E9qhB5V7MvxXdoaJ%2BcW0lVX5tkJyXX3xpRP7f%2BiHgZjhL2sByNIQc26FKsoxhqzmNFfCLLeyu38ezR7gzUW5komblRihsvmxs9sg3E%2FBzQ3jDDzrUpydX7X469CzonNO0CjDie8ZElFbi8%2BLeEN%2BE91dKdalJ&X-Amz-Signature=6a9de484bb32601f30e5e0e2ce1645eb2bf56885fc166d54eb0fdecf6ffa69bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZW7T6B4N%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T102616Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQD6Hp%2BL3pdi30MC7wuokMgPVsSmcfVR2HEhPwm6XksSMgIhAKjm8BlnO9uvmytQ%2BSyjsvznd9F4bjzVC96PlRCW7%2BK4Kv8DCBMQABoMNjM3NDIzMTgzODA1IgyXIwdfqeqkF33X2Fcq3APYmcczgOSu8SMetR6yKAFunO%2BC54pkh5Qwx7Ub7uFDOyG8Rn8Ntf%2BAxq2VCK6aYIvSDmwJOqe%2BzWzaFu1%2BWgLeIeDmpIqqF%2F7cBeK61d8B0ciGIUoHsuAa7B%2FoH2ZB9bM%2FqRzwOwHFa3PjDculBDCL%2FUUMgxM9AWNIY4GqHKsmxw8UGZk2g%2BGiaCfHGUiwrjUSS5Dr07Ey29GZzQ1VCts2u1u5EBRY2Oan7%2FQaswoOPQvXGt36nZlZyzxwlppnJlyvEsp%2BrbR7qBdoso7gzhiI%2F6U8hv4KyJMPa8DAeXOuNs2nf2B7VU0XmLBVqBo0XsGRSsDdi%2FhRGyeyIHN6zDz5wm6KnOgIdpMg22Olo0Az40QvOF2%2BUinAl3PfumUBcagx6Zub2ZRiO8BNla%2FnDlyiEeY%2B9Ft8S2QexsitPtmlsFSRpQQls6r59F5%2FmizRXPF4Q7rb9ygkp9H9g3xt9CfxJBjLdCNLVtn9rWOBJs1ELtBq%2BWlYdWQxKJF4Mw%2FH9w1CG1K7MsToQVfAWScHUa7KpqNhhmlYQ0JEnRXqBFF0j9BZrIlodveOXId4aqibr%2BXBisRI5M0qQm6ZW2jQCzxi7jdC%2FfHItLBa0rCTe1nTqgDoyTwVyLIxAfQFfDCfuIzMBjqkAfjC1Gtz1p8shbKN3AG1TlViXlBcwRKuD8K482%2Bv%2FEKOaZDIh54iIpDc7RpqKd3E9qhB5V7MvxXdoaJ%2BcW0lVX5tkJyXX3xpRP7f%2BiHgZjhL2sByNIQc26FKsoxhqzmNFfCLLeyu38ezR7gzUW5komblRihsvmxs9sg3E%2FBzQ3jDDzrUpydX7X469CzonNO0CjDie8ZElFbi8%2BLeEN%2BE91dKdalJ&X-Amz-Signature=a9e7d9a28b259a82f870092ee80a23b602b98d392280dee960b8049c5a24ccfd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XMYPRHN%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T102616Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQDz%2BV6HEFscb8%2BgFvbcFHgkzFIRM%2BXWDTrvhIQmyMqFGQIgVi3FRYfFVkt9QOQ6u88GD5SgPTdvNMdstmQ%2Fc57EZ7sq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDMcYAcLnQ3btqTthvSrcA89MfxbMzojjH%2FTAIbrfH9YG5e8%2FZvLK0b7PshmJCMhB6Wut%2Fv8xtDvFiIPQhOowGh1GAxhp3qCoSdxTf29EgQv98Jy3ufoHm%2FPWIEdDH0vzwFBSnvh3gg9898p8cn8c75FMTyf7zk5n0EkgFCnGKNHsBPfVHN1Qa8bpg21PcOte1Xc%2BzWbA8MaEHgePBSstNzXeLzPNWmwMviTgeUR72fkaBWsrbSldSLyPEK3VY3H8PGsYbXj2pY72Ey5mjUvxijoLqNIBBAP96nQp0ciPhomo3kk5rmkzZI10asV4hep1m9mj8fEgLDS6xAk3af1yBJZBEji1PDX9Mf%2F2bl0VnGT2GaRv%2BDgh8kgA6vzsLxETyieEmilQnyPjKGwR5gtKGEMWVL6a4wj%2BXqKA7%2FGYYuwVx3bUlijipYRFtCbAO2hK%2FUcOjgt3nFko1LVnu4tm0D%2FrRCDhHskZnbX9FOBz0AoKB5Whpz3XLh1TSlj9rPO6tDH3v%2Bysc34fO5xSRXt%2FCgoddANIITL%2FlpA0VeIp0xkOTPxxmk9VptRFbe8xNxNrTKbzB6yI0kav6Q8wEprlrh3PYzDAMKaSTGn742bFKQ1gnGAWoh7ERUMb768LJLIxbQokUMjwsSkGLitGMOy4jMwGOqUBGM9zUWV%2FtnnNyg2jASwaZyeHVRs5yls5tOJTFQweqGFNShat%2BMGv4ct2qT28bkQ8qMXDETFSV5cx2EQXRiJ45NqD%2Fs5a29xThKlqBaORVD41EiMNf%2BjcqIZbh2AaOCX7SWmG9AYi0Uwo7JOzIiE736VigKXG78hQbHp%2FdfBPmo88HvX5uk1ohYFouBD9X5ruWpd67cjNxSxCUT7423F98hynUa2Y&X-Amz-Signature=fa5e0e7b58384520363821f4ddee7bea2b9f50d9aabd3c9bc4068413e3bbf9f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y5WCOJVL%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T102617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIEHCXjytmr2X9KAwSnE%2BeWz7PPKq9YkYt%2FZHmmjX2zUkAiEAqppV3ffBNWGsC%2BLd5eMmZC6FBjs09gTPMmFHRNrYGgMq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDPn%2FH6TMEEpOx3v1hSrcA%2BCPE4mdQhwiSaSNS4gbHhbTyQwdd2sWjcyQZlH2zF16APiiDl6zeC2GqyAlKQDRuYEE3ESaiotlgc51m7lXvK7vBxbxVzdLhQUKU6KxdIccf4ALGSiiucSbnw%2BSANuR%2BlnZu6lH%2FH%2FXBEOTFqBlV2lFUHK72nPya1WVaK60%2FSxUUVuRSxrogbux8QmWX4sGXNiOI3X8LilmgCyQkVVQtsF7nsfuvhATN5VXL%2B%2FFQClOxGC%2FZrIcYxP0x2fMNIbQ9OlePs%2Fuv6gVwLQ7sxh9uNTwbH2X8IEJaZlj8Ze0JHK2D9freYohR3FvlOGH%2F8mGaKJZT6mAlCe3w4MD%2FqVK9vvMbxW7dPuXFt%2BZV%2B3peAlNYHrBI01C01MLw8dTTTaHT%2BaHUgsOwqK2pgiMfdAGvyHQqhLqq53ew1xOQJ8mLsQoARQ8SowVuh96o0ns7hx%2Buf1ZLWBxHWQ8SLDXnfgIzApvEMHeXAyNYINeN%2B89qeut1s2VwWpeIfeZgFRb%2BANy8%2BMfatvTPm5JntvDxyQZLlU8ItT76kxazYLBmBURuhnshAKp0sA5puQHQCftiSTxY88Jn1UVP9ontNRQaCBhLigy3w1KPFjTSoxz7MKTfMlmDsCmRV%2FBllhaqy%2F%2BMPy4jMwGOqUBehgRDENmVKlf6ZC2Wigi2AGhfX9oBZGPePgaUnCPcsM7tPfJnykKQD%2B99cbIgb4jiQwQBn2LHItkn8jvMea%2BnMSsrX0ARCgzDz4C%2BZbFB%2FnboIMhQpe1aq8uzTmRBIinMgf3tJw%2BWx4CNjdzdVPF9S4PI3KA4V55l44AGmq4g6DCkl4Y%2FeQy7w5TdGwBUHA4H7TnjTKPA8KtHtIPh5BuzlAAYTOv&X-Amz-Signature=17db4d257ffc84b9e1e037673bf27fb1873c0122a4dec0bff36bcd67a63356b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DMM75YQ%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T102618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIDOERAoc%2FnDM3nV9fqSs8p0aPszdqxql%2FiWzWdxq%2FgnSAiEAzLzQZqnUFRElBOXOKeg85eKxY4UN5LpTEFcqWexYtE0q%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDMOEEVRx8rCKnaL%2FUyrcAxunBT4jQkE4JyBX9X4WfE%2BEx3xO33vTheW7nbqqtAaexq53U0qRyQCrQpoovqPRweGTKEhb49Dkh0PHJjcYRjl6fR%2BkOLNk3lZ%2FarlVPQOexJEVmJOuO22ZH5JOK4useuPTy99B5HV20sK6a3zuBZkZdZjatUAc%2BcSOTSXAO755QjPKEPO4sIsbemIua7XkojoGclPN7UJcaUftoP%2FPI3S4pbKeRn6zMeXE3BfFIMBMct1NTHKKup%2B2uvzldC2LKRgk2JG7N2RtVfaxQTSuoZ8WMx7PGmlVfwZPmoSh%2FG87vbsIPNbVhEsg20bbdXvaplRX1kTiN1fuz%2F9ix2Eg732LSLbiZQjztcZ6DXndS6qgomHLKVHvK9LoO8sPlxDBOOOQANfWwnNzINNWnHpD1mKdf1X79wMV6TUQB7UOAMj94Ko4J29w8J0Fh4MeZDaWmh45XZ6bKiNOd7AAfsfQ8uauoQRRlhzzPADCI53X9o820RCdUKjnQqKHMWt4EMqXijCNY%2BSqC%2FtG9NiOrelbvh6oCLI7mR3m4CdmZLsn1I%2FapjUfpLE6cjq%2B%2FPtUDdr0trVoTiOli9rEU7vyg5ure4UFu3f9QzDp7eCF0DJnHJvJyLR4EEqmWJGOQEy4MM24jMwGOqUB%2FPd4SJ1QYy18nqgXp3IMu%2FaVirbfwc%2Fbn3Aiof1tK%2F%2Bm7nSNfkqu1jfjpNh%2BOAS6QqX7SEts3oY3c5sD47xGlJU4Qz1X5w2adBOyIRsOZFnfZc3ITWOldoOlneB26w%2FSoc50vNyfJsMajGwVFuJNyJPF911bg2IJ0B3FjsM5aRyDnK%2BUaQxtMAdWz3Degv9xf3NzLSaksB%2BY%2FLcDmVRlNJ8zgVV1&X-Amz-Signature=50073bfae141542c7f1bdbb097055767d6ed9887fb8fe9a35a225298d117da5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCRUBSI4%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T102621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIAMmu%2F6zCs0GTFY0kkC1kyifVT0BCZ2YDHNDGSalp%2FMOAiEAuLI4eD111vPVju4jg0IvgIkm60JqvBD9ZfG7UQCAXj8q%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDE5B8zVk4fl5ZTK2aCrcAxEdf5eeHqcNNbrI%2FbCfp0FTcyDtiNHMn7ulb7Xn9mbcEJ78Hwhh%2FxvpT62VARHla30wfJoVI8JqSaCDMy5VChpHPCW2x3VslnNkHF%2F5mOXLSkkfzi4%2Bth5J2A6XbOJDiqXOKE%2B7CT28PK3Jt2nW2O96QAVoAnAbwYnzas8bF7D3ni7ATl6UYY38lXxyJfsBGaA2UZKfdre26Ty4KZs9RsGSkCe8YkQLX9Sn%2FFvcHwbOVwZzPhQNqJY9m8ZlbcXDs3Zz5J%2B11lyyx%2FxxbfIYJQh8VoXhD5gi4ivyUXh7%2F7AWf4YIemyHrfMhX6WdNkqTkUypFnSp24DM5H9bhl3EZ%2F7%2FeoixY1Wxfjr0BxhuKv7Tc3mnU1yuGk8ULB%2FUunVUwlpLi5DzBhawAgTHBrHWu7eFmVQWX9PAPNB5YWd45Bxl6DQxPnpWzx2d3o2ULiltcwt1jLW7u%2FLMYxSeQKiIHFpCSZO7AfSiW%2FKzpEl3ROYf6yrreyTxpPxxcJsuFQKyIPVBoX5ZPmz3YMGoh%2BWGV1qZumsdY9ddkA5Gy3sGoY05noeqdPp5cW0OWV7zcNRn%2F6MuaFzkXLslh5UIX6Q49pBdoraKaInUsjTVnc0e%2F38xz%2F2rwsxjJlEHLw%2F7MNK4jMwGOqUBZdaeCYGRxZz8V3Vh5OH5rOcI5L%2B5uobxj5O2Qxx6fhYmvu4eq0zQKy0OqlTIpsTOn79dfOS%2BrO3JvEY1hwVhk6BhXjqET4Fi4ouwFk%2FxCA19cpwWcW62d%2FU3gCBoc5DJfSKMOGLty9QzT7Ut6DTU5S9CIGMs8fZpVBeyH60WpLqc4vSqTWcGIkED0FQOzJoW7Rjk77BGzJtKzE4w4qg3HPgz6%2F0P&X-Amz-Signature=e411aa122b00770693f6c66ac7fcc582587a6556e6e9a1b2156cc74896f51ba4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCRUBSI4%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T102621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIAMmu%2F6zCs0GTFY0kkC1kyifVT0BCZ2YDHNDGSalp%2FMOAiEAuLI4eD111vPVju4jg0IvgIkm60JqvBD9ZfG7UQCAXj8q%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDE5B8zVk4fl5ZTK2aCrcAxEdf5eeHqcNNbrI%2FbCfp0FTcyDtiNHMn7ulb7Xn9mbcEJ78Hwhh%2FxvpT62VARHla30wfJoVI8JqSaCDMy5VChpHPCW2x3VslnNkHF%2F5mOXLSkkfzi4%2Bth5J2A6XbOJDiqXOKE%2B7CT28PK3Jt2nW2O96QAVoAnAbwYnzas8bF7D3ni7ATl6UYY38lXxyJfsBGaA2UZKfdre26Ty4KZs9RsGSkCe8YkQLX9Sn%2FFvcHwbOVwZzPhQNqJY9m8ZlbcXDs3Zz5J%2B11lyyx%2FxxbfIYJQh8VoXhD5gi4ivyUXh7%2F7AWf4YIemyHrfMhX6WdNkqTkUypFnSp24DM5H9bhl3EZ%2F7%2FeoixY1Wxfjr0BxhuKv7Tc3mnU1yuGk8ULB%2FUunVUwlpLi5DzBhawAgTHBrHWu7eFmVQWX9PAPNB5YWd45Bxl6DQxPnpWzx2d3o2ULiltcwt1jLW7u%2FLMYxSeQKiIHFpCSZO7AfSiW%2FKzpEl3ROYf6yrreyTxpPxxcJsuFQKyIPVBoX5ZPmz3YMGoh%2BWGV1qZumsdY9ddkA5Gy3sGoY05noeqdPp5cW0OWV7zcNRn%2F6MuaFzkXLslh5UIX6Q49pBdoraKaInUsjTVnc0e%2F38xz%2F2rwsxjJlEHLw%2F7MNK4jMwGOqUBZdaeCYGRxZz8V3Vh5OH5rOcI5L%2B5uobxj5O2Qxx6fhYmvu4eq0zQKy0OqlTIpsTOn79dfOS%2BrO3JvEY1hwVhk6BhXjqET4Fi4ouwFk%2FxCA19cpwWcW62d%2FU3gCBoc5DJfSKMOGLty9QzT7Ut6DTU5S9CIGMs8fZpVBeyH60WpLqc4vSqTWcGIkED0FQOzJoW7Rjk77BGzJtKzE4w4qg3HPgz6%2F0P&X-Amz-Signature=efd6d43cc426510f2a9f45d525579099f8f6be53cb11421dc9cd44b927dfc4a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666YRUVUOC%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T102608Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQCohGpX%2FsAJs3z70gS%2BDNnTteEnS%2FQbWmTtIdP84oZOpQIgGQzcS0eqU8mIkWjSWtM6Dy45mynCTbydqT%2Bn%2FM2gbOUq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDMipi41aiQjV%2FgbjjCrcA5dV%2BUzKfN2V8nGSfTMtcIGELkDEgVzx7CnId5zc3YFF4aMz6gzRTNns9ZiMFkudWWMYHRHOUjc8y8xlfWrUIX3Fpt06%2F%2BwfjjhDklzWSMd6UHLvzC%2F%2FjY0Btc1JhN8iPWAyXFzkb1lFtCV0Na3w5GDR2OairhAhO7dN8kKe8j4qT49GXDQRNV3TMGG%2BW4fsmvHr9aRlZExBxVBYSPC1bmfUQWyUlxcVZUKvnR8hLX2tgRYkapTddrqz5EDZ9BmQhvtnWxaBgBLzRPZ262%2Fk5iX1WEuH%2BdB9KD%2BVw9JaXGFmEzDEEOhMWGXadKl4aHgirWlwV7MjP7xNT7GFmgVuw%2FCgf3Rx0%2Fd4eUfZg1Pdx2nKNB1efcWDvXTsCmwR8uRAsZkuxekYCKD0mLhAiS158ArhAwUL1IPgN5076dRRMNUQCdG4V87JZMzRJi80IHtJyOFZrZPCplmZO%2FlirdikzirYcv7tVHfbZ7qmmMUh7epsDxHOyTzPZl7Tt6xvpNCn8gl%2FlUPTxA8ZUQ4nY0bkAQcpzTtsRz7%2FBasJG1tm6FCPZKMpVZrjsgElzk2YvTOcOL8dbDLqvhxLrVoBMejXt7PxV%2B0g3n8%2BFuV%2FY7ZLCbHrPaEICfFp1xOj6cDhMNy4jMwGOqUBcaXxUrBhCW%2Fsl2PnW2MwrDh1zt%2BMobOlMdZ8xiZDwsc3wVxChupcwajgMKued0FysZM4KwMo3sDDiI%2BiqNv43Nl%2FXLrdFXDS%2FxuU7z6Ex%2B5lJ10s1rDM21Os5xf6CEDF33I6uXjCHb23qw0qWEBPgwpDP6iF5Cos7Z3PKNzO1EX%2BoLySDO9h1CTZRLiM8%2BZZK9I1qMKqecWIjC16XrzMtov5%2Fcsg&X-Amz-Signature=f5161f061c0a0cb6d7f85054fab4324fcd5e112627150cd906fad63bb2dd5859&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YPB6JLAY%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T102623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIG6AX%2F0rTX5YXRiGFGZIkaRjMQ53CnYpG7Zya0mjUdo8AiEAplhtNZSugbMVJhJJF7P9HJF9LrESFb9DVkWOtmCSCegq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDPgHN09xJxNG%2FTlnByrcA6fGwW24ZYq1WYiS%2BtSC8%2FnSzSBlzC%2FuEwcb1ww4awyO0BDQ031nbMVI3tMURkDxoC1My0BNQB%2FLVRSI6vf9mk02jHyKsPrb9A%2F9heC7oWaFxMjeojd%2BpVeUEF5vgrbS3ybteIYt7JwprHAbRyPhozKV%2BI3GauO0hPY95yaFa2rJClBRW9dHRbv%2BxN4nDJLy4b%2F5hjRMGom0FZ7A0lNMAKtrynwHLFLwKFpYcpA7WtsvqQP1zGRMT64dxia5%2FXJ4j4Jd1l2%2BPS7t9FD808uZI84tfRIYDrVGjSohxzfdoIRIjjdBXfAMV8nELGYwAKEqTRfpTBtaGm2ymwetXcU1cyAVbj9IHTxmd5EeOPey2nvFS%2B7xmJdG%2BW2YQsMvPYGpnU2AV4Z3MO3ATgoW15OSRiDFDqk00u1oRpA2%2FoSJamF41%2F6eFfhy6CZ8lES%2BjF4tG6XgI1HafBSnv%2BOIKZIlXsEjGi18JRiCt4%2FTUfzU7Aicpi1EeKQKLcPK3hVo9GZeYyAv8I0q%2FjlOuGdBFROdOo5QEX2If5xKic3tTEXdebgz5f7lBK%2B07G7OQif6H6wmeTuANrViRs6l83WOz5S9P6McksqihzumoLQPh%2FxMP%2BcGtaOMcPjLU54n4uRZMPK3jMwGOqUBpBh4JOWC5xanYk6zMTQDx2BEiVkFYefhrCghiEW6BJNJBHLwF8VXblfO4TsdSzGdfaJtynrOVMkbOzYiDuz3wGebPALkLxzyZiJgjl9tavwDXGoYZBzm1GcZMvKsRo2xVMOnQxvdDoc6DVd21EFVIsgJHOvBe%2Bw%2Bl9LHFFUNESbv98Iu8m6rbAjNYAWT%2BMlHigr5Wnl3fIyuUdiZpdM6VBeCP7vp&X-Amz-Signature=a7e5f0cd4c7a20564c61c2edf751244e9560bd2d82eb52edbd1559e67a7f9605&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YPB6JLAY%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T102623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIG6AX%2F0rTX5YXRiGFGZIkaRjMQ53CnYpG7Zya0mjUdo8AiEAplhtNZSugbMVJhJJF7P9HJF9LrESFb9DVkWOtmCSCegq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDPgHN09xJxNG%2FTlnByrcA6fGwW24ZYq1WYiS%2BtSC8%2FnSzSBlzC%2FuEwcb1ww4awyO0BDQ031nbMVI3tMURkDxoC1My0BNQB%2FLVRSI6vf9mk02jHyKsPrb9A%2F9heC7oWaFxMjeojd%2BpVeUEF5vgrbS3ybteIYt7JwprHAbRyPhozKV%2BI3GauO0hPY95yaFa2rJClBRW9dHRbv%2BxN4nDJLy4b%2F5hjRMGom0FZ7A0lNMAKtrynwHLFLwKFpYcpA7WtsvqQP1zGRMT64dxia5%2FXJ4j4Jd1l2%2BPS7t9FD808uZI84tfRIYDrVGjSohxzfdoIRIjjdBXfAMV8nELGYwAKEqTRfpTBtaGm2ymwetXcU1cyAVbj9IHTxmd5EeOPey2nvFS%2B7xmJdG%2BW2YQsMvPYGpnU2AV4Z3MO3ATgoW15OSRiDFDqk00u1oRpA2%2FoSJamF41%2F6eFfhy6CZ8lES%2BjF4tG6XgI1HafBSnv%2BOIKZIlXsEjGi18JRiCt4%2FTUfzU7Aicpi1EeKQKLcPK3hVo9GZeYyAv8I0q%2FjlOuGdBFROdOo5QEX2If5xKic3tTEXdebgz5f7lBK%2B07G7OQif6H6wmeTuANrViRs6l83WOz5S9P6McksqihzumoLQPh%2FxMP%2BcGtaOMcPjLU54n4uRZMPK3jMwGOqUBpBh4JOWC5xanYk6zMTQDx2BEiVkFYefhrCghiEW6BJNJBHLwF8VXblfO4TsdSzGdfaJtynrOVMkbOzYiDuz3wGebPALkLxzyZiJgjl9tavwDXGoYZBzm1GcZMvKsRo2xVMOnQxvdDoc6DVd21EFVIsgJHOvBe%2Bw%2Bl9LHFFUNESbv98Iu8m6rbAjNYAWT%2BMlHigr5Wnl3fIyuUdiZpdM6VBeCP7vp&X-Amz-Signature=a7e5f0cd4c7a20564c61c2edf751244e9560bd2d82eb52edbd1559e67a7f9605&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466422FMJ72%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T102624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIAYx6rM6IBXkMPHGzKwq3As1%2Bl7VZvNzLiEFjfynz50QAiBYBXZ5TwHsq4%2BMU32PS3OTT046zlrb9AIH07e5W3Nv4Sr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMqNM0T1sVht5lQuT7KtwDI0HH5givwc2J2aYl5FkJFWHYtbKsplw%2BRbD0YhsdBxXSdn0pEgqwAZoy5vHmRrPaiw0SFIkMIL11ptooc%2Bq82eAHJfNtyr5YQbT9ZPWfVY6dPYsMWlAZC6OJSjIJ096Ji2U7fSjbOvyf1hwcbHJBoSZRgEJzpalRezYeKb8VaJHhapmkRAMWTHRFQ5FAK%2FK3bKYKArCZjfdbQrzbf3b8OGgl3XTT7n8jCubr7F9ZbRQRsfidptKxlxNpYq4YMaH1KiL%2F7yk3MQx8tSkGGByYWYOvmMk2crft6YeonlMMCNtQ9sYfh0wem5nsQUs3GDAJw2MRNAjaZIJb8wF4iOn1uUIAqJO88u5Nhm24UwqxDZv1JaoiodmeVlBPHeLt2A9jkem0XJfVC14R0LQ6p4hyUiFp%2BG8VIhnBi7KK042kUqmEVUe09UOsRuySSE3183egEfnaAxkCFZcG%2Fokbea5U4Ylq3n%2FaXNSkDwI%2BKpfLw%2FhRP56fbE548Ufx7CZuiTV1LbcbCFRwWPiRWlaSqqXkls2lFxfRpIgvT36HIsVzp2nJrzivYFZoPrsb8d8Pt9DktgfUMu7Dg7tPvbxQ6UlfJ2yrNBf3%2BQ1AYggu5IKVdjif3Co%2Fb74vkPS6xuUwkLmMzAY6pgHJ2u3mM%2FdkwvV783hOYHBs56nDRRB62aRJ6X6G3yAvHWQtAL4hyq3u8tGbzoIH5QV4XPTcOcnAp8p8LA0AFIdZGzKJOKupP726Rzoaqxvrdmoi0X19Aq%2FKwnXUvXzuSFuAQUC064GDqAdtnnNXnR9a5AoKkKfYKvdV6WOMYSwei0X7yqE9f%2FJXMY3e24%2BxDaRTCtvhGcPdt54opnN5ijSLPpT8j9NR&X-Amz-Signature=76f7a457e58a9900c430fa0150b0414280a6b581acbcacde6fc7f85b7bc9aea1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

