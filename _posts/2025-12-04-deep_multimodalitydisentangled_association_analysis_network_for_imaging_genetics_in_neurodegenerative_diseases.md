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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DM4GGWU%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T171621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQC7ksTHYdBlrTQjIKIFnUMG9tdXFJHaIbovKdUPjbkLpAIgHvtQLE09LqQaxsPQg02uJIX3U59bGArdgOwx0HDfhqQq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDId0Wa%2Fkgm9k6N1z9CrcA0ggiTJ5o%2FDWsEyKfPPCpPg4SD5jTBoErQjv7uYBxaff3qtOjW4oXFIyKDK4OEe2rVtEtEiEPhprUU0ejC9yBTwasZkmR%2BmgjWyHwsmQkxIpeIaNRPnA3%2BzbCxIK%2FtvXaet1Vv1AciS3ycrw4Eka2MeNHbONtdUCP4SU5NE5nBMGKF0Fxb4kqHQmkkFxDmtvNzX4%2Ft%2BEVMjCtTU6lBn4c0t%2ByS6s4GMMU6i30lkAeo3alN8PbFd%2Fvfus19hMS4BXlSyuwWgGSbChYAxGyeintOWQfwfA4NxT6G1%2F3CLUMqLV%2BSGNGuERhLubZPM1c8NBw2F3mneLcBkdnMSgNAhRjeM4SsBPH4HYp3HlBlGHti5xMznrTSdGH9Jyh2ZdLMdBr5Kdzf6C7U7bQM63e%2FSgbEX5MhfFLFJjM00%2BAQ94m3X%2FlH5cs6RxYTiiXL%2FLvWb3VxKvhkSg80QNUr09TFI9vkEpiZZxYOnm%2BhG%2FGXPeuj1R4FPNgJW55rA5dZq2EagoVjOxexIxb3IdyzQ01i6cqGVxW24kVeCis5uk%2FBFkgUBgaEPkYUM7X8%2F7y0W4ec5TXE2Y75mAigalsSO3ZzWTNQigY7ZlGi%2BfbgNBJbG90aj1z9b%2Flk63Anwc74A6MMDomcsGOqUBP7WWnurqlW8%2BmjTx1yK9AyFQk7WQ5AwA6DZN9GB90aEZoouFuOa%2FSJQsduUmeYBrgVtGLcIWuW8bFOJYGVLc6aE%2Fz3aRDQWadxceOporokyXwc4jdXzBb2NZ%2F%2Bbsa7VSq%2BnDXwKZgdawAekxh490m%2BDXmy78X4Wz1dG419v9mFoU8gwhQE4r5KFYv0JRBAYXNI2pSCkCzep7yZEc0kAOFYbTyw2e&X-Amz-Signature=bda3b4df8d1015dd6b457bec6be42ebbff5451f2f65759526ecffd37c6ede684&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DM4GGWU%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T171621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQC7ksTHYdBlrTQjIKIFnUMG9tdXFJHaIbovKdUPjbkLpAIgHvtQLE09LqQaxsPQg02uJIX3U59bGArdgOwx0HDfhqQq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDId0Wa%2Fkgm9k6N1z9CrcA0ggiTJ5o%2FDWsEyKfPPCpPg4SD5jTBoErQjv7uYBxaff3qtOjW4oXFIyKDK4OEe2rVtEtEiEPhprUU0ejC9yBTwasZkmR%2BmgjWyHwsmQkxIpeIaNRPnA3%2BzbCxIK%2FtvXaet1Vv1AciS3ycrw4Eka2MeNHbONtdUCP4SU5NE5nBMGKF0Fxb4kqHQmkkFxDmtvNzX4%2Ft%2BEVMjCtTU6lBn4c0t%2ByS6s4GMMU6i30lkAeo3alN8PbFd%2Fvfus19hMS4BXlSyuwWgGSbChYAxGyeintOWQfwfA4NxT6G1%2F3CLUMqLV%2BSGNGuERhLubZPM1c8NBw2F3mneLcBkdnMSgNAhRjeM4SsBPH4HYp3HlBlGHti5xMznrTSdGH9Jyh2ZdLMdBr5Kdzf6C7U7bQM63e%2FSgbEX5MhfFLFJjM00%2BAQ94m3X%2FlH5cs6RxYTiiXL%2FLvWb3VxKvhkSg80QNUr09TFI9vkEpiZZxYOnm%2BhG%2FGXPeuj1R4FPNgJW55rA5dZq2EagoVjOxexIxb3IdyzQ01i6cqGVxW24kVeCis5uk%2FBFkgUBgaEPkYUM7X8%2F7y0W4ec5TXE2Y75mAigalsSO3ZzWTNQigY7ZlGi%2BfbgNBJbG90aj1z9b%2Flk63Anwc74A6MMDomcsGOqUBP7WWnurqlW8%2BmjTx1yK9AyFQk7WQ5AwA6DZN9GB90aEZoouFuOa%2FSJQsduUmeYBrgVtGLcIWuW8bFOJYGVLc6aE%2Fz3aRDQWadxceOporokyXwc4jdXzBb2NZ%2F%2Bbsa7VSq%2BnDXwKZgdawAekxh490m%2BDXmy78X4Wz1dG419v9mFoU8gwhQE4r5KFYv0JRBAYXNI2pSCkCzep7yZEc0kAOFYbTyw2e&X-Amz-Signature=bda3b4df8d1015dd6b457bec6be42ebbff5451f2f65759526ecffd37c6ede684&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKBRD2CO%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T171621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQDPdTLSJH6GpELrRbWcbbMKQ7ARC2N7ltnnGoUNUGyp4gIhAMw9vwa4zq7RTU7nf3R2FcBxECGQRPmlSUQnO%2FkcUh6OKv8DCAoQABoMNjM3NDIzMTgzODA1Igyh5i174uvO0P37Casq3AP12cKRYAvIBQd8IXTI2gUp1KEWMqaw0s%2BF6lfuwO2HQL0vblQ%2BtY3drxpvIztx%2Bf%2BGhcr1g%2B%2Bo2AF0rXJcs5e8QJkf8AVDGCRveq2iMnDq63RmXnvOPYF7EaMuFJwIgzhH27pppUEzdJoO%2FiJ%2BPv1Hllgumlv%2Ffxi6M7jVgbmh8KVr8nljp7lyPbnam6Ak%2FaLuL4YfZZjVxbj3S339cpDeeJvgGALvgtonpu%2FWFTuYgo2yqOgAVah6UQd%2BArGVitS5HeUT4W%2FRbXnpcDGckJK5GZgeZPs1YjpuCjMb1ByZeom6E2akqhTMsHwG3P8R9ZF4ZRCP%2BEXyx193sgcwcNaJjOikgSmwQ0bgT3RuKS0ABOtXKYftZLCXwU6K80E7%2FuL0%2BMdMdrMliZC%2F%2BP3%2Fi2BC1DRJe0mur6WI4Pd0tA15weUJngzKV%2BrCGuMg2IEO9rEUA0y6c3HDeuyyt1sukWRniRbQIsQlA1sei%2BXg5dMM0TFa7dQnS6GUuOwKSFz%2FI%2FtAFQi3MiExB%2B4we%2BdO4dLku8LZZYAw%2F7QLtR4PMlHp4q8IVMSOFmRLPypjtFb9TM6flJIRJoOpiGV8lu6ygqy%2BJebkiMXcpqGfYFkglQF0xqY%2BKVTL8nDQm%2BCm9DDR6JnLBjqkAex2GZWmG%2Bha2tVEkJNLH%2Fc1KNr%2FLzt5puPJkvBJJl8DilYHRj79U%2BNeMSiO1YAcNlWl5An50QNY4gdPUfA9PxqCW%2BxH4pGlm%2FGXZAZXyFZfv9RbFcLIDuRu5yNXutmXf8UshT%2BrlACIek1tF5GOrraUPbAgh1JXk1Hk1T0GaeYg1BvD51yYMh%2FDsYDbd8A9mTmA%2F7RGKR%2FVThUQhaeeLlhR%2FHj2&X-Amz-Signature=90c0a41835e41ac2f81c7b834f85b2dde773df3327f70caad6e20b3f7f12f079&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQBOXMCF%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T171622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIFa9EbeoAA6%2Bev3ObGxRZko8QgzAJf2b8KwcpFMl55tIAiEA7SvKa65IwJ3GQz5UWr%2BC6ItdP%2F7e8%2BeriEyraeZo5a4q%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDC4xHu%2FEilVDVREAeSrcA3oEQNktnK1BAMhpQsZu306AIWQpbTSzZh6iTCojkfneo1MNv80jCA4MICk7dipz7lsAxTdfJVhdRIsO%2FglIozYUPaHacoZLoC%2BteiNTBSi2MrSi%2BZ8bMh5eus7qeQksIFuMvNUULORl%2Fiiqibenz8ea6Gl%2BDDS9CR1zuWAQjLSi0t2SRxK1iv9Nar0vGVuQ9WuFqdbFvUJoBmVoLkZ8r2xHjcxrHyUvsLJppkaPkJRuCMXo82wzhm34T1Dm0IzrtwGaIBlJXxhkb1MSDOxACfZ%2FhAj48z2FaoI2u11HFOEtGqH4TTdVDeqNhCsbi3lE0VJE3VZ4XJAs80Knxl7S6Z7iQ7HDpey1kUOXQcN0RGOp14TZVz6240YdP0mUVyRn14erMOj3phLuY3EvbxVAz8ZnS9t90xJbESTjTK39%2B%2B68KXFNpfBOSjIhMCCfc3e%2FXcMXufR8Ba1G5IAOxjYcspceYjFDjS1HDOqvyQF8cfsk773mQ53jZ1bBDYtOB3YANHW6ptEHSMYYKY%2BXUY5RNIQBUz9UUFXAe12kRssxoShYM0s4DikPg9J%2FXWvXSbpxCaaAO2siI40kdoky7VJc1FjrBxD4aGEy7L82MIdQumYDpjtv27K1ih7YxcbRMPrpmcsGOqUB91gO2xMxdGoyV3wGpInt3P36JSWb%2BNi87HwbASBH0E1ZPGyiYOs%2FUpLPPm%2Bquwquz5v%2FailqcApWVZXVXOYH%2BHFD1tnLJGfoiCnnBLg8bZkwlfbtGX%2FK2GRB7QtT3LnIFRrMV0xLRglD18uT%2FeJHMzMekOV%2FiAW%2FDkmU%2B%2FL5X%2BZ3RbaNFhMV%2FbXYsrZfjmUqzdqZpS4xhp%2B2zYwY6s4AIIZRfMe3&X-Amz-Signature=10e7caf3760163730a21036da4150d559fcc4f6f1a297da8091be7dd7559fa1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQBOXMCF%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T171622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIFa9EbeoAA6%2Bev3ObGxRZko8QgzAJf2b8KwcpFMl55tIAiEA7SvKa65IwJ3GQz5UWr%2BC6ItdP%2F7e8%2BeriEyraeZo5a4q%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDC4xHu%2FEilVDVREAeSrcA3oEQNktnK1BAMhpQsZu306AIWQpbTSzZh6iTCojkfneo1MNv80jCA4MICk7dipz7lsAxTdfJVhdRIsO%2FglIozYUPaHacoZLoC%2BteiNTBSi2MrSi%2BZ8bMh5eus7qeQksIFuMvNUULORl%2Fiiqibenz8ea6Gl%2BDDS9CR1zuWAQjLSi0t2SRxK1iv9Nar0vGVuQ9WuFqdbFvUJoBmVoLkZ8r2xHjcxrHyUvsLJppkaPkJRuCMXo82wzhm34T1Dm0IzrtwGaIBlJXxhkb1MSDOxACfZ%2FhAj48z2FaoI2u11HFOEtGqH4TTdVDeqNhCsbi3lE0VJE3VZ4XJAs80Knxl7S6Z7iQ7HDpey1kUOXQcN0RGOp14TZVz6240YdP0mUVyRn14erMOj3phLuY3EvbxVAz8ZnS9t90xJbESTjTK39%2B%2B68KXFNpfBOSjIhMCCfc3e%2FXcMXufR8Ba1G5IAOxjYcspceYjFDjS1HDOqvyQF8cfsk773mQ53jZ1bBDYtOB3YANHW6ptEHSMYYKY%2BXUY5RNIQBUz9UUFXAe12kRssxoShYM0s4DikPg9J%2FXWvXSbpxCaaAO2siI40kdoky7VJc1FjrBxD4aGEy7L82MIdQumYDpjtv27K1ih7YxcbRMPrpmcsGOqUB91gO2xMxdGoyV3wGpInt3P36JSWb%2BNi87HwbASBH0E1ZPGyiYOs%2FUpLPPm%2Bquwquz5v%2FailqcApWVZXVXOYH%2BHFD1tnLJGfoiCnnBLg8bZkwlfbtGX%2FK2GRB7QtT3LnIFRrMV0xLRglD18uT%2FeJHMzMekOV%2FiAW%2FDkmU%2B%2FL5X%2BZ3RbaNFhMV%2FbXYsrZfjmUqzdqZpS4xhp%2B2zYwY6s4AIIZRfMe3&X-Amz-Signature=36881b8c80585ed7af1477d905ca4f287ecd11cd6d01d203a75bba858c610ffa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T6CU5QKB%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T171623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIEu6hKRa8BImjS1KldwZVle0%2Fv3e8kdYeau6qAwIpTAQAiEA4g2soyH8yzls5qjhbYgHkFO7EQMFx53vwksn%2FZN4xgcq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDJAz6yU52qvfr0S1ZircA4EX6D2pZS3yMMr8HZeO94X%2FLCL%2FqCqjDb2eUbFXeXExAUW72t8LibAGTUuxvjumEPcMDI4OKQlGmsh15PTAfKsjQgedkZNXb6z%2Fv7a%2BAk6JZ477WLq6lGylPHUEQ%2BRMLefL19CViM85tJ10GY5SeednHNQ95KUv41cYKCgJn22E%2FycyY36GPSvAMb1otxYfT9mOPkObC4F9IUjtySZHDzGn0s%2FvI2bRxHzmTpna0Rr2JeJLpaRo4sdee3na%2BSrygPO2m%2FNbtxTdATpjLDIVRGSoKRI2FQeXjRC%2FqTt47x%2BpPcdtzgNIQrkKnC%2BP9MhFtsR6OyEmU%2B90v6xm0i%2FrlwM2HSKatstuOfJLx%2BM4ols0ZV1mc4zRtGn3DNrnkDsUpL0cxEpN1aCZK1Cvsrkvo5Yrdk0E3kGTcddQkqhoUpjnmDstZ8pWhI7wG2Ck4zAqfHXk6hP0SWkWFjH%2BaUAdfDPfXvukmf5pIOsr83z8pVWvfPMylqltI60u%2Bqx1fEKnRQkbZP%2FMFaCJo9oa9y2L4lxeBm9pledYJyNAXAtJ6P1PxIdtAU3g8bnZpIV7pIJjTNv2n7eYBryKLESDK8v1i0QOPDD0O%2BJdQFGCpNnhwRG5NN7MY5UaVi6mTY%2FOMMjomcsGOqUBsDc6RmDJQqR%2FWYQEdaey6cmXXBbyZoRdSKUJDrf777eCTLX7IFYnK3dAM%2BR9ejN3Ax1qZGmf9Ghoa1CgJhhifrMxBOU%2FAuoTjduvRbFXsqVoijaXxWUX8pZm3OwU6mFvbunFTe%2F0H8KEY1CzuqSr2qFCYXArwYyEcqCKLmhm3nIuMit84H3dWga2yLccU%2BPfu5Ynzst7yQ0NrX8XplRvYWCId1K5&X-Amz-Signature=0348507b877300925333c6cf965531beda07e27028dd8d8a09473b14a06e744d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XPM73BQM%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T171624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQD%2BoPGOft7qhkT6YZFoLc9ViVD%2B%2FxwP3YjDjfWidlZSvAIgbmDgSCYZJKZM%2Bt%2BO2j%2Fx5cbzGdGyoj68UXmm0hbhWjkq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDMGrMS9SMl%2BRRs3UjSrcA3gJzlQ23skkRDZSFj0tceE3ylhv5Tnxs2%2Fl%2FLAlkDnVD1dhCWE1Sp11H8sCuCZOc9n9q8ejDXktFv1VEB9EskFfQh1UWJ5LNLvcVcW3gsRmnfR2aszmq8cPfT2zM06MPdeV8B7VjSIhybBfeUATXEJPnQlrRAovIRljqYHwL0BawGJniB%2Bwd5s%2BHxrhMpDuTXi%2B3lsNQUGuAlgjLjBwP2482oUN70N1E7NkFWnAml5t9qMlfARI3KdtBJj00TFMHt00VceJhfhrXX8Jk4%2BaV7vt0lsr0lHEYXxXmE7%2FSBcxwy5ZRIzK0c7b8onRETIn%2BXYoo5nNe3t17Z1WtBUy9BEi0z72ktPGeH45BUsnYiStUbJo5kyFDDFmcAsTOyOAfphllJaItLN0uCwy75qTpbBECGfBisLH2UtFJdUe2cz2dvs4n0Pb5vSLoH%2Fu2lwe2p%2F3cxop%2FAThHDKxSbS3ZpL1vTbx4FoUTu2wEhVWWOnVyN%2Btzo%2FVFsYeH5ds6hjB%2Bjqj0MxlABzxxrnWadeWXK%2F5lZaqH4d1ff%2FwU7899RRzw5hHaRJDIWgsjoqBB5vgXYhFPellJsgu1%2B%2B%2B%2BgqEO5XaWXQNYEOlndkZ0lx8KkNBDuM48svlTgg7It3jMNjpmcsGOqUB3v0GabldVuj0yd5ZOxuO%2Fi4dgrW0z0L4C1RDtw1NnGnLlVSwEuOBtRco7kLwc%2FGNJ3S0%2BUU9oc4QTMfld1HXMs7AVGeEtPXx%2Bft%2BqBD86%2FrbQ4nT4RvrV72F645Yql6twGBGHxKsgeEnxQrG4rpZdroXl9DGbjDgzNcobuSeGyjy7LSemLgKnLzQZJH05eJocWJ79gYZZiE2o3rBUSMC%2B1ahWRUx&X-Amz-Signature=43fbfd8cde14ab1f52d5e2bc4bf26efc7544bd8b9fa505ecda228ccec4ace6bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667J7RMAMN%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T171624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIAn41jg9pbu1Vx8j4%2FzYLT97NS4DmJVnuMFME2JkIohHAiAbCWD5%2FfYPEGmNhnTWuD6GCBq5dGExLDnrOsQxN2txBSr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMF1X%2B0Q6kKnY7U%2BJRKtwDyRi2ye10vuEJMNfGBljRP0Z%2FiTtMsg9kBIMqwBXs3QP4zjLwVdAvzRmklwVSeHUry0jifAzfsJiiUAlEiaQNSAeslq2y90pNfhD51C%2BQR9S0fQMllyy4lyEmboziR9dBL2pORA5iMuSYLv9bXL0FT%2FNn8QrR68s4b350%2FW%2Fc7Ufal5uTsubEYS5zXKXdXFxvKS1OBZUmI%2Fos5ARn5wDlIhibNJC4jZatRi8z1rFSGnC18ZWFisCnnOl4OiA13ZNhurFG2TiyNy4AnAj5s1xCk5tGuwocM6Ca7O2IPZvMZUgS%2FwNVUbF37pcVdMpy5ocY3mDqyQB4r6JmSkrgLNixqqYu%2BmUmJttI4nllYxE%2FsLT5cw8byDr4grK5UcKfr4WVvCh28dCMumyq2cxtHXVMP1%2FkybH99L7KLsABikP9lmh6S0Nf1cyjfLx0ltkIp6fntn51Rzuk0hpDabsGSiRzd52VSda%2Bhe2%2Bmw9H%2F99iXjijQrAIIS0gRGZYDlIGCnu%2FUkLiYJusEvw6ZUYLzBAe0E0eqE4PvBNb7DyJVbpy0NbkppiPr5vIlSZdYyLt%2FRLGQz4iTJacAZd8tJ4cGEVEVXMsMMWg%2Fxz5krIx5%2Bkwyg%2FsfiaNc%2BoyDit4Bm4w2eiZywY6pgF1XwCprI5DxxMEdjsWZIeUaQ0MUJ5dOKqUPZSpb7hNyqfzrsGgGkcCnEGc53mgAT9f1keHjemJhmnAbVp%2BT1QsrDo1dpkv1%2BM%2B2RB2mN0LPkAud9l4dpBIdAmtudH9LNOoU4KPzwR7qOAAnDGXIFKOdV0b25Yj1uEpCVxkFnvyrql4chX2Wqerx34f6wIgjphw1mnaReDcmh9N74gm4OcWUCNyQyDp&X-Amz-Signature=e773c951eba5bfd293c52bf77b2af72b03072c98b453c190412167558b4d09ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SX5QNMIE%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T171625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQCyIGN0QpE5iBlJsufGGNJfvYF6H%2B1dWaxnDzbpdf3VEgIgPRqVw8nB%2BVYMeRrIHdb14pSkbARGVpZGVHZtGl24Qq8q%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDAiSlgFas9tyz4A%2FSCrcA%2B6HN37Ho4wUFEILUDUTf%2Bngw%2BTUtU%2F9mBTQi%2FLSos464J1NCQfAp7J6Xyys3HL%2B81w5ARX1mHfrz2qLKHw1OSNmh%2FXAynDTYLQTFPZpdymt3fFFm1fElAQfTsY62PfPK5IMllDEzew8hkTucswDjek8ikeyXvFQ%2FLh%2FB22y1px2Q9XalGQks0V0o6Yut97J4TP4%2FrzMCRCKbgsdfasGCHYIMPQHXioNtFMT%2FK3AgBPKYGQlxgE%2F3S%2BfL9Dr5pN4cprnveh4i3HfzA34hM%2BjVRlso3%2BMug7TjAEnN1PT0PUDWzzcCxnHGXuw9wo7HEiMFb19Qi2zdBYv3L%2BvKZFpS6N%2FlZFOLtw%2Bz%2BWExWI9Rl06ghhcmne2IWz9lxw3oPtJE1ejrb9cN3gV9V8m95nxruIFYeTR3zgbTHJKSIvg4wKaMLYY%2FUq89bD22HwcvQJ5sxPAorZNyOGKvvai3hsLFk8m2ZnHt%2FP7xAmnO4wZPBfEiOCtg%2FPpA4JYsAasssqQ0xGpo1WyrGsRqhOeJ7Qt7bwVK69Hcg%2B2PMqHiuNZenTaMLfcC5D12GnDf%2FYljNU4jp6uTbXHjSqkzC0KiUSWx%2BIEx7zHIT%2Bznm0ij7cA6i1F%2ByKBoxpZUyJ082imMInpmcsGOqUBQ2502IE3zZJlwr1AqeYeREVq%2FftvGYRKCYPI9rM1ea%2Fa9vRfrJfDGvpcwpJful6diK87oxyiLC7iPWU7UrDBzx%2FkziRw1sylaz8fAFjdl5nlISZ%2Fj8kHwad4d6pNpF2pR0HpTxIWnUURpyR9PgiKC8knr4cby2JhwN4piFd86RDgv%2FQCDWyAfr5QDHEReE2x5d%2FAt%2Fusl3L%2Bx7wTfZGASdWTQkFU&X-Amz-Signature=3e5f74e715374d60613e94c9422505e73069af5200bcc98822452b31ed6d81da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SX5QNMIE%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T171625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQCyIGN0QpE5iBlJsufGGNJfvYF6H%2B1dWaxnDzbpdf3VEgIgPRqVw8nB%2BVYMeRrIHdb14pSkbARGVpZGVHZtGl24Qq8q%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDAiSlgFas9tyz4A%2FSCrcA%2B6HN37Ho4wUFEILUDUTf%2Bngw%2BTUtU%2F9mBTQi%2FLSos464J1NCQfAp7J6Xyys3HL%2B81w5ARX1mHfrz2qLKHw1OSNmh%2FXAynDTYLQTFPZpdymt3fFFm1fElAQfTsY62PfPK5IMllDEzew8hkTucswDjek8ikeyXvFQ%2FLh%2FB22y1px2Q9XalGQks0V0o6Yut97J4TP4%2FrzMCRCKbgsdfasGCHYIMPQHXioNtFMT%2FK3AgBPKYGQlxgE%2F3S%2BfL9Dr5pN4cprnveh4i3HfzA34hM%2BjVRlso3%2BMug7TjAEnN1PT0PUDWzzcCxnHGXuw9wo7HEiMFb19Qi2zdBYv3L%2BvKZFpS6N%2FlZFOLtw%2Bz%2BWExWI9Rl06ghhcmne2IWz9lxw3oPtJE1ejrb9cN3gV9V8m95nxruIFYeTR3zgbTHJKSIvg4wKaMLYY%2FUq89bD22HwcvQJ5sxPAorZNyOGKvvai3hsLFk8m2ZnHt%2FP7xAmnO4wZPBfEiOCtg%2FPpA4JYsAasssqQ0xGpo1WyrGsRqhOeJ7Qt7bwVK69Hcg%2B2PMqHiuNZenTaMLfcC5D12GnDf%2FYljNU4jp6uTbXHjSqkzC0KiUSWx%2BIEx7zHIT%2Bznm0ij7cA6i1F%2ByKBoxpZUyJ082imMInpmcsGOqUBQ2502IE3zZJlwr1AqeYeREVq%2FftvGYRKCYPI9rM1ea%2Fa9vRfrJfDGvpcwpJful6diK87oxyiLC7iPWU7UrDBzx%2FkziRw1sylaz8fAFjdl5nlISZ%2Fj8kHwad4d6pNpF2pR0HpTxIWnUURpyR9PgiKC8knr4cby2JhwN4piFd86RDgv%2FQCDWyAfr5QDHEReE2x5d%2FAt%2Fusl3L%2Bx7wTfZGASdWTQkFU&X-Amz-Signature=79f4a884b2ad97137fbb8ad6d51583cb269dafb4809529dcc8007d4ed767ce1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667COPASI5%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T171609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIHHjHidN2HiLz%2FcJMsU93p2N%2FRomubt6qRzRTE2%2ByjYUAiBG94fWadaMtxGNISFppp0fqqPGQ8CPFH8rYx1P8yV6USr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMysmBw%2B9HHfcGp%2BpKKtwDD2ujlYtjrSMRt55WdI%2BVsk1s969AZgKQwS%2BDff7YDGommeS6927GudQgpKFStPrIDUwMdoJm6WnvWzYFkhblPQwangGu1NmoxCnOmcnf51S3DowzD4sElkDXeOWT4LSecaRpF0%2BJ0x6G3icA2L5Ex8bAJ09X%2FtKHhoR%2Bk2IJHxKQfpiouoS1XU%2FzHnNMM9nUMMf1MZh%2FTwAtroSq6kSjF1vSCgOWlunRCtWHoHy5Z6LF5UMuPCHnEJVgPt9LduSKfj5B%2FEjGdQhtYqxPY8%2FKgEA5pCEWMwjQkTKO2LNXkv3kGflcNAYewjkRQzZWaHCot2NQEZHu26oV8zLHFJdLscikPHcfPNesSq14VJmJ4obS3nOOeoxqa1yZSGLT%2F5xJ7SAEDvzRkfmXQo3NQ0QsyKSYkBsG1%2BCF60gYpmAjugUUb0GZZrhtjCDL6kWwWba86n97e8UUrOTf5gTdVlHCZQI%2F4sv47gyOL6CNzxIepYw9yXkWmT4yjYvhtUJS215M1PDwGuVi%2FVxr6yASplRRzKcq6kqk%2BN3djphbs2rfvRbDp927Z7wYdyHrBAYCbnXjjT72Jr7eB9nY8eT2taFWDlNdm3BPPwIle3XrKXUfgfjYDiMKcplep6BLua0ww%2BmZywY6pgFmIESWtIDWXOyGqGI0sAW05WRCc5mSvEFkmVMwGxIy4pdQxLywtZVOldXHmGPl7G%2B5fhGC8Werh6rfWOGgD%2BX78hHgR7HUwdFc%2BabnsGuodHtgub6p7ys5CLecEdXUG8jVu%2Fm79GiMZaghsiFIgIIQFRsdEi3rUwSeM9sLfWIZMQt2zH7IsLHTGaE8tCYUTtHpoaHNfhOdXKOx%2FcuY5zwvzAaSNb8D&X-Amz-Signature=911344b4a429cbbfc20fa323d4f3764804a41feaac0d058793aca2ed5ec7dad6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KRVHQDH%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T171626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQCm%2FCXsufoW0sSG%2FFME13m7T%2FnhIWPm3nD4CTtuPNMg7wIgZOu9IXJtcb5R14RERKuUj0FuGIBkcFf5BN0nB8jwW2cq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDK6yKL5i2opJewEajyrcA54FRlJ9KGNTahpbRzWvdkd7T1KZDe8o%2FVb9IrEg1QsQilZrpQEv7PxLqYVyz2MebxaXFf0f51GvDkOxs1EaHr4nzfd%2B8cNpn7QY1G4mQ8lrw5QHy%2FGyS7z0Y9Uoa%2BO%2BADNS%2Ff2LYf3xdFzkCBbFob9Z9rkBXgZ09zFOPCUeIBltcfZYZyZen6kRxx2hy3voUy5QCghE4QL9zphmSxH3Pk4fEaZTWDj%2FYhVMwSoUYj8byGU7t%2F7k3JdqUUI4N%2B277ph4PUQiRTIuSkKUedxYF%2BoeRmp0NtUafFB19d9jSKDRXZGrtv%2BepmJNOBr0%2FcNBtcI9BE5pWxRHh%2FVLa1yiYQgl2Q5vmwSQUs3a5KIRShgZdMnlZ8SsZxUPh0HYVLYLzjE73ixd%2FwZ11hT3wJqGds5moCjld21KI2chGGWf71FoxSFsmvcVlMOND1H7XPsd%2BOVT%2Bnt8lyq0cLRyQ8iE7RUQEjcnNPAv%2BBBwPiknCAarY4c514bZa92LEl5n7Y9t5HQ7hBmBQp40NAaeHWm1NOlePNBooOqdsNuaHju%2BOqDvFRKFuz%2Bg%2FVktukADf6V6yg7kIIbV8iOdLng5H5H761J931M4eytKdOxc7qL5TulgLc7N%2FFDVyCwkctubMNjpmcsGOqUBntj%2BfwUiVdV5FUlbTXR9fwU%2FgiaEYUPOgQVxD8wzRHznuRsoj23PtPRDgk8nbS9%2FexF0RldRPmj9ADb3vah61vHkpyANyT7Mr39NAeQb%2BFPxBv6kyLU4q6zEegr4%2FLlqVa6BFnT3si9ZFMwh%2Brkgcxcvb3ItJXkX%2BGZPOm2m1xIyjArdInlaJ9aDxpC%2BETrct%2FkKVDUoRKIBEpe2rWsB6xroxgJA&X-Amz-Signature=78640b203b9e2e97085e26b53b455e4dd84bbdfd2ccaec8c8173cdc80d304495&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KRVHQDH%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T171626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQCm%2FCXsufoW0sSG%2FFME13m7T%2FnhIWPm3nD4CTtuPNMg7wIgZOu9IXJtcb5R14RERKuUj0FuGIBkcFf5BN0nB8jwW2cq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDK6yKL5i2opJewEajyrcA54FRlJ9KGNTahpbRzWvdkd7T1KZDe8o%2FVb9IrEg1QsQilZrpQEv7PxLqYVyz2MebxaXFf0f51GvDkOxs1EaHr4nzfd%2B8cNpn7QY1G4mQ8lrw5QHy%2FGyS7z0Y9Uoa%2BO%2BADNS%2Ff2LYf3xdFzkCBbFob9Z9rkBXgZ09zFOPCUeIBltcfZYZyZen6kRxx2hy3voUy5QCghE4QL9zphmSxH3Pk4fEaZTWDj%2FYhVMwSoUYj8byGU7t%2F7k3JdqUUI4N%2B277ph4PUQiRTIuSkKUedxYF%2BoeRmp0NtUafFB19d9jSKDRXZGrtv%2BepmJNOBr0%2FcNBtcI9BE5pWxRHh%2FVLa1yiYQgl2Q5vmwSQUs3a5KIRShgZdMnlZ8SsZxUPh0HYVLYLzjE73ixd%2FwZ11hT3wJqGds5moCjld21KI2chGGWf71FoxSFsmvcVlMOND1H7XPsd%2BOVT%2Bnt8lyq0cLRyQ8iE7RUQEjcnNPAv%2BBBwPiknCAarY4c514bZa92LEl5n7Y9t5HQ7hBmBQp40NAaeHWm1NOlePNBooOqdsNuaHju%2BOqDvFRKFuz%2Bg%2FVktukADf6V6yg7kIIbV8iOdLng5H5H761J931M4eytKdOxc7qL5TulgLc7N%2FFDVyCwkctubMNjpmcsGOqUBntj%2BfwUiVdV5FUlbTXR9fwU%2FgiaEYUPOgQVxD8wzRHznuRsoj23PtPRDgk8nbS9%2FexF0RldRPmj9ADb3vah61vHkpyANyT7Mr39NAeQb%2BFPxBv6kyLU4q6zEegr4%2FLlqVa6BFnT3si9ZFMwh%2Brkgcxcvb3ItJXkX%2BGZPOm2m1xIyjArdInlaJ9aDxpC%2BETrct%2FkKVDUoRKIBEpe2rWsB6xroxgJA&X-Amz-Signature=78640b203b9e2e97085e26b53b455e4dd84bbdfd2ccaec8c8173cdc80d304495&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UP6MY5WN%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T171626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIBoSrtD9PYNaqhhTL2qk%2BlDNE5Vkzj2nc9uwmzm3S1SRAiBefmzGhheXPCW3wRNX9YgZCiu%2BHOaavZjUB9nbAuGgmir%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMTGQ9xjY5ZWwEWQpYKtwDqKXnS3Z3vMvZKOYLANeMoJokprF5OmO0GZFpX0qf%2F65JWpN3b4VujnXh8BDeefGA8Jqxm3bkOPuxTlza5QHulN5vmxfGaYq4%2F2HJy1e1CSTYalYf4iA5esCyeDGcVAz1hgfVd%2FG9njxaD7qiEtwgVoXO06q1VONZYr9wtUB8H05K67LFt3N2iPaGw2Zj%2FmkWxasBnB2ort449ujzASnba7OhAEvlRtct5PrX8rKS7%2BXxEqg6WTsN%2FtoRs9YP7%2Ft5hxvIjgELC8p4YduL6AWGZb2rFZ8LofOC3iJ0ZRTtB8ktZnW12Rg4pv8GY5c1TeRBGRQcUAAQOOYg4PjXK9GS%2FxDQntpsjR8S2GjFB61nNh3KbhzJxl6Qs4q7MRjBXW%2F3ZhjjG8bUTv2Q7LbQTVCYExfFHKmaHtCFpDlUUb15%2FBNeI7IRI0nLjz29p%2BlPBuGVIp5g6F%2Fq5JkrFxd0F%2F9JnbAwjkZXWKWDvvdcRRV%2BCkNMFZB%2BXjNC1WacR5QvqZfvKk117OGOuRFd%2BXp3sHdI1Vrt7V4tbl3TpVmyOLNakntf4yXLQ3xl0nsy7D1Y6GcNTCuBi1sF8XVFpX9RxdxXscvAr1pTOeRuNtfTyJAK58TAs%2FxnTpw%2Fs1MhGKkwh%2BmZywY6pgHggxDNVQnseDfGokVhnInNj72IufDsY3ou9Cq9vIdauXzd4v771eeH1VT8K57xqpO77GtX0y2NCc34q1%2BqxVife21eTAGAzlZDDAbC6wBUiwjhvYee1rdiAWYgu%2BB8RH%2F5EdsC0bFKTTj2jA40e7PAHAqoOxuAY7RtnslwJPn1ZMRul0UVWKEVhUpBXzR%2FR6IG3xdvUm%2FEwl5rHQN5s4HePE9%2Bz%2FMO&X-Amz-Signature=bee28a48e03b211fc83d7fa2408dae7d6a33c78fe947ae810a2f482b518a799d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

