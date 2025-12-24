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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGPKWODS%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T180103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQCuJtFvhUgTqscDbANmMsflPdgg2vjsujl4T4c%2BqRY1fQIgMJGJTxtWhQseAZzhc8M40UaUmacA17iz8wf3MFPd7hIq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDE4DhcJiHQZYS8cJhSrcAwWb6mO54qGXAZnpNkGfSj7L672SPmR8O8Phn%2BdiFyJSUxat1g1irCmVQFE6viO4mS9mNivKjEzx6bWUDcFWs%2BDFTXD%2F7AKCkOwntC4S4GVrYN5cuRQuB7UwD9I6AIV7oFiWpx8lAXV2nZ0EgptYnl0e0djmFz6Xd55XWjghqxYHn00kUhtHfDkGg1%2F8tm%2FNdw8BsMaDx53hVj4brQlLR9G5ozm7tnCJ89fnGJhDc08OCKwvSHr1uQEc7UEUuMZ6nt8FyXNSEtkGJ49D3jgOuEw%2BoMGOymB0tRiNO4grWAWZOCiHoG9ZeGPZ3ZSdfhR5umBo9fj5vVeVZfY7LJdwxXMkNuTek567wBK87b1zLa0KRGSyHyP2l%2BISb8PIrkD4q36KfG755iiwc0MUaB%2B%2Bxvm%2FEova59IRFPPcN5kh%2F6%2BJR66B7K4Z5kuTH4rU0rMYQUtslJNZHIXNaK06IW1EY6XRgXzxIpCt0UBDZqOKSwpVYMFgasXQfOMYYaKnKp5E21DA4pJ4AjPIvv991cGa25kI7IOmaqGZFDMryrf2f%2BU5ZDo%2B2e4vV14h88yMtLID6VOSaD%2BWgAIOtiFwCfadws0vi6xhRMtc65qBJhXzCrilI3aG9xP2Np%2BN%2FzozMNTQr8oGOqUBTLamMvG4mDuA87SvLTq8vh71jOxem2ouCmDA01cRP5JonLPuK%2FUYbXIXYYbygDookR9mgbfTa%2BGaX3so8gfUuZlH%2BJyu2bVRTY%2FUk5Ptnolwhiqiz98GI0kkJVbiurDrnQgof%2FK8cbXIBoghFHxDtXs1mXxL8tWif%2FzPc9TICkpNXlzco%2Bj4%2FbD6zb%2B34jz4QgJ4%2FlaCaO77rk6KR23fB%2BccCpWO&X-Amz-Signature=a628145b55f5b08ab50c35aa4b2bff1a830b4c07b6e2227aaa77d8ae0ac2c7df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGPKWODS%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T180103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQCuJtFvhUgTqscDbANmMsflPdgg2vjsujl4T4c%2BqRY1fQIgMJGJTxtWhQseAZzhc8M40UaUmacA17iz8wf3MFPd7hIq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDE4DhcJiHQZYS8cJhSrcAwWb6mO54qGXAZnpNkGfSj7L672SPmR8O8Phn%2BdiFyJSUxat1g1irCmVQFE6viO4mS9mNivKjEzx6bWUDcFWs%2BDFTXD%2F7AKCkOwntC4S4GVrYN5cuRQuB7UwD9I6AIV7oFiWpx8lAXV2nZ0EgptYnl0e0djmFz6Xd55XWjghqxYHn00kUhtHfDkGg1%2F8tm%2FNdw8BsMaDx53hVj4brQlLR9G5ozm7tnCJ89fnGJhDc08OCKwvSHr1uQEc7UEUuMZ6nt8FyXNSEtkGJ49D3jgOuEw%2BoMGOymB0tRiNO4grWAWZOCiHoG9ZeGPZ3ZSdfhR5umBo9fj5vVeVZfY7LJdwxXMkNuTek567wBK87b1zLa0KRGSyHyP2l%2BISb8PIrkD4q36KfG755iiwc0MUaB%2B%2Bxvm%2FEova59IRFPPcN5kh%2F6%2BJR66B7K4Z5kuTH4rU0rMYQUtslJNZHIXNaK06IW1EY6XRgXzxIpCt0UBDZqOKSwpVYMFgasXQfOMYYaKnKp5E21DA4pJ4AjPIvv991cGa25kI7IOmaqGZFDMryrf2f%2BU5ZDo%2B2e4vV14h88yMtLID6VOSaD%2BWgAIOtiFwCfadws0vi6xhRMtc65qBJhXzCrilI3aG9xP2Np%2BN%2FzozMNTQr8oGOqUBTLamMvG4mDuA87SvLTq8vh71jOxem2ouCmDA01cRP5JonLPuK%2FUYbXIXYYbygDookR9mgbfTa%2BGaX3so8gfUuZlH%2BJyu2bVRTY%2FUk5Ptnolwhiqiz98GI0kkJVbiurDrnQgof%2FK8cbXIBoghFHxDtXs1mXxL8tWif%2FzPc9TICkpNXlzco%2Bj4%2FbD6zb%2B34jz4QgJ4%2FlaCaO77rk6KR23fB%2BccCpWO&X-Amz-Signature=a628145b55f5b08ab50c35aa4b2bff1a830b4c07b6e2227aaa77d8ae0ac2c7df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZE7JLY4L%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T180103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIFAp%2BBKBwYEpeve07MMlPAO6PslKY2ky22s6QeJPTfVGAiEA7wXXxUGU6OV%2BkzKv7Ox4hnPYs1YHg1YlL%2Fnd%2BiNuPEsq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDIbFKoBY2pHPUjDnBircAwZNpZ0NFvQ5URR0BmSUCu715mGY9AB0UiUkN2HbavIAPzj6blHXjLBxub28X6L%2F8Mt%2FTlT48UEeMAUYlt0onvTmsnkTEg%2FrRyEcnG8K3VeHqhjTDqvuZNYjQMNJG%2Fr7X2DvqZt0B47TFxqYS4lxmjTybuEmXB74i3S%2F62WffQZ39rVVYHFRHErk0SZes6S%2F%2BAVyVP75jbN1LBuD%2Fsk%2FOs8iWVrxe7Iv8ymD966fR3zlIkRe5SSpVoRXwrbW2DvQ5F1z%2FRmFrUS4tRQ8984i%2FLJVwQv4eAu%2FWBlm%2F8x06bTf46P2aqJ9AXttZTUO53b%2F2YvKvBW0JWdeuU4Kes1CVrgrlpIljAlTpzoklpngGLH6LXLZ%2BhIX%2BdgBMgs7nhJHyDCjuxA60No2gl7CwiZADq5%2FSlzSyOirDL6ltvAiKC%2FlVHmkTLvZHZHcN7nlGsN56lqQkRmHD8ENQkY%2BKF2OZ8hTijRH%2Fai8YADRDSxy0FKMGDunWYX%2BApt%2B0vwN6OzSDYQjU0%2BKVyyHwdC3J3bRNN6GXwqHvDlwDoTZyevn%2BCpcQwUgJ7zJh0s1%2BDTzN%2BWM3TdK82DFqZRjsBptf7GB8O25DcBgaHAS3a%2F7k8Sag%2F9Hvi7768K0NrfS1x8HMPTQr8oGOqUBW06LlXp8NdB7MRgcwMdRyWd9mMnEyicsjBfYSECiMznFfbsYFKPF10dFVLl2rZ6e%2Be2g2Pd6AjgsRyIISjYsSDOVrY4Vs1uqpw1vmYDn2eWCr67ud0DmX0tsREZnoXVXT9Z2EJ0Xc2Fsfjqg3TQKs8GlrXwsytIbEPf543gCVvycJRfK9n2HlWjiQOoHHdNTywASJTIpKBNqVSissGnhROqXMmZ4&X-Amz-Signature=ef1203e2d7890ac1fbf0ed93f9172354967939bca820f9806e5894b443ecdd9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JLRH6G4%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T180106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIHQAas99uVV4Q54DxmKHPkUPI30OVdmrjFk6b8ndKhEwAiEAgUt1GRudKa9w8m%2FT0drD42StP6tAMX12DfBZqnu%2FKHYq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDN5nx%2FxH%2B8sqmP0fLCrcA5SYhAJ3sOLClXzCZe2NLd8v0Pm%2BCpaFnC5YRpyiubAWuyG5c%2FtXTPZZdxKwmlsOoOAhJjy96UaN%2FzNJDbME4ojnoDRdHSMe2REv7XqA9vteLtaYvAf9SVOxrLrugIhqYoVaP9H78wpW%2Bkv4f3WyoEjvTxu1dlDlwA%2BG0hHnW9Prbj36rydPKD9Uh4dbbzhl1bLsU7jlQ5navrvGinh9nVfCpZat4%2Bg80uzsiM7zPX9ocQc03iYdlCMJN1q%2B98xAJycC3Ijs3MsiGiOfl8ofY4N%2FxGe%2FXe5N1juRL3Y6VEAjOuPyBDiaSwx965ygAZz47xB6x91puLa9h78IsyEUEZBfi%2Bo%2BV9JPMxmOL5gwqlQUxLof6Um3yGB4Sjh8V%2BbMPVwiEOeOfPsSy%2Bf1CzvstdieTIGgE6sRSGRvsRSoOCv2qagi8ZvSPW5z%2BLMRdu4rIjMfSQ78ByvuHqOOoLlvtuUqvliCLejgto1JVsRWQ4b5O954KMJcIABzJbdOS2GOXlkXKmnqLdJcQCEQNogXVjZk651F1L0uteLrUbz5NG4EXFQs%2BTlglZQHXPwKo1aDGgHCQjGScEGqNrD51LIUjJXBDM%2FK7I7XVCjcZvRFhsjc%2F0YfBRLcgromlQJtMLLQr8oGOqUB7bP7k2D6zO8h7se781hw1EqAUJzV2SZPKylj1qNjUqazVypipVjoAobQRJC1JvTPxxQdtKeK9nHE%2FulvXPbMAVNoX4za4g7TYQHkgX5lqLSKBAIldxemE9O9YoW3v6aRwQ4odUiGLpt8Jkmj%2BaVCoJXPfYOzxOzvbeM0Mb54L%2FEHBqHpz7bRi8EZRhtaB5koUTQWkWmmhEl%2B2ihLIZf6iMh4I1GH&X-Amz-Signature=3262a2fad3a68a76a8e18eac7d7baa3ae56e053ccf52c17afef36937d3855941&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JLRH6G4%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T180106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIHQAas99uVV4Q54DxmKHPkUPI30OVdmrjFk6b8ndKhEwAiEAgUt1GRudKa9w8m%2FT0drD42StP6tAMX12DfBZqnu%2FKHYq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDN5nx%2FxH%2B8sqmP0fLCrcA5SYhAJ3sOLClXzCZe2NLd8v0Pm%2BCpaFnC5YRpyiubAWuyG5c%2FtXTPZZdxKwmlsOoOAhJjy96UaN%2FzNJDbME4ojnoDRdHSMe2REv7XqA9vteLtaYvAf9SVOxrLrugIhqYoVaP9H78wpW%2Bkv4f3WyoEjvTxu1dlDlwA%2BG0hHnW9Prbj36rydPKD9Uh4dbbzhl1bLsU7jlQ5navrvGinh9nVfCpZat4%2Bg80uzsiM7zPX9ocQc03iYdlCMJN1q%2B98xAJycC3Ijs3MsiGiOfl8ofY4N%2FxGe%2FXe5N1juRL3Y6VEAjOuPyBDiaSwx965ygAZz47xB6x91puLa9h78IsyEUEZBfi%2Bo%2BV9JPMxmOL5gwqlQUxLof6Um3yGB4Sjh8V%2BbMPVwiEOeOfPsSy%2Bf1CzvstdieTIGgE6sRSGRvsRSoOCv2qagi8ZvSPW5z%2BLMRdu4rIjMfSQ78ByvuHqOOoLlvtuUqvliCLejgto1JVsRWQ4b5O954KMJcIABzJbdOS2GOXlkXKmnqLdJcQCEQNogXVjZk651F1L0uteLrUbz5NG4EXFQs%2BTlglZQHXPwKo1aDGgHCQjGScEGqNrD51LIUjJXBDM%2FK7I7XVCjcZvRFhsjc%2F0YfBRLcgromlQJtMLLQr8oGOqUB7bP7k2D6zO8h7se781hw1EqAUJzV2SZPKylj1qNjUqazVypipVjoAobQRJC1JvTPxxQdtKeK9nHE%2FulvXPbMAVNoX4za4g7TYQHkgX5lqLSKBAIldxemE9O9YoW3v6aRwQ4odUiGLpt8Jkmj%2BaVCoJXPfYOzxOzvbeM0Mb54L%2FEHBqHpz7bRi8EZRhtaB5koUTQWkWmmhEl%2B2ihLIZf6iMh4I1GH&X-Amz-Signature=5860b06c36bc773cce6947b6ddc23788e6e89605fba06b49537c97702787752d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666H6HDZSM%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T180106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQDTX4DmgVn%2BavuU%2F7e76%2FdRyrYrgSFN%2F0o69sLkgXHWLwIgJ8raioMSBp7bk%2Fnz19p92tR6x4H71WvAqsKjqoqE4u4q%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDKfNal6PJlt1U4efBSrcA4bpFlcs7JtbDcC%2BKd4B6r4drT29RX84kjjJ480Uxko%2FiVrScvh7uM4BQW29lU9fbF%2BsPTWEOhJeekOI2E7OLP4%2FB%2Fh6GIN%2FP6DaaNnwst2p3RKY8c6H9eB1o0EMm220xpFUEyZ76EBjHko2I7OY7e22VIAveY%2F8ZnR0Roy65GaCqMxJev%2BogX8C9oKFxSwJ6W57ehDhnGCV759iOPu3g2Ncjx67F%2Be2E0eM%2Bm%2BH%2BMsP7tkx3IM%2FfivFIhExo3Q%2BZIAs4H0gPuw1BJKbL4KylJ1M5IO6%2BCte9JNOhQ%2Btu2wj2ncoN1vhFWICDZrWlcIZ47mt4VheZmf544JZTS7QJNd4mPlJ0LHDWJVcByhUL%2BECoOb26u%2FmwKXE9F0BoQquCs4l2kSvZL%2BBdnowhMmRlaER5PlB0mR9%2Bcynk%2BdsQLRCV1k0HxE5oj58z%2Bq2b%2F4%2F2vK27xb31PwG%2BBJx5TH9fFGtNYqMmdcmxxOBFxLSwq7LccMxidM2SVE9km4VR2hcGyvphqrfbVQS2mUfOnFR%2FaiYSjO6%2FxM%2FC75DdOlacbeBfMnHP599LrCtYip9vFXPGCpW9qm3FBBRKi%2FBc0n3YLOD2w1%2FhSu51zxvXioKrz3%2FcGQqgk9fjnSF5GILMMnQr8oGOqUBIwsNIS5se9A6i1D%2FW6IZRycH1x6ZwxBX%2BNluFsg2cy6KgDkFAqhU8j8kOJKJzrOvrET1BBofjXVLEnyzbI7tee80lyBgIBjQodDkvitRtLatz%2FseMb84UocWAH6q0yfE8eMvPxjnxG7LnoNYA9xUD9UZO4YMAjV77bWZ0CJfGg18Sc1p6ZVhqMvE%2BYmmf7SaDs%2BZZQEvSV2uR9UTHANg1EXV%2Bnkz&X-Amz-Signature=c2b99669020b081b412c531e5cb3c44f0109e7fb055644b8106756be5f0a8256&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FMK2652%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T180107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQDU8I9te6xVVVdWciYRw0It%2Bphcv74WsKGhod7F%2FH1dxgIgGGus%2FvLuBWkOetvWB9AtBEeuROUrRDn9nPWBOaPZRfoq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDASammhKVX%2B4K3xE6yrcAyScl6BFdOU%2FlXZhBOtq5dh%2BV0c4YG9%2FH6XB5dllgq3CxOkKgFWlcBSxYA2KWt5lSckAQ8hvHhOsADSu8fL3pVKp47SkMdf%2BYKTtjNZfeJz7%2BdJ8y%2FHAiJBoVFvyF89tNFosuxgXuCk0WwF4Qw4Pmns4aewZh7%2F1vgh2Hpru9Uwcop%2BhmpKjB7adZxs9H8%2FKRf43nOOI%2FdfeVHerFW9MVbGOYe5BsQPA%2FGvve1vZVJTpN6wJlalKtue0ZGaeAw6fnr3mt8%2B3Yr3ZCrCbYNKDdkMMUq6s4xaY%2FcKc%2BaqXN0%2B6y9xM8%2FzSoe0%2Bk9FdfacCwslFiuYrCEm93JXRdvUaMvRhYvZQgvhk1j1CXPazEIwci%2FLQR1Nby3CNX2qjVxmcmyGjgBFUf79ntny4MAgHggkSZJ57aM3ZfTMpS8AviiKempDBwmfVOgzXQRTTVpcADDakYv24EJ4s5G%2BVGLA8QmHcyQH9AirgGIFdfKdyQVMSZOXwubudiVWMu%2BvAW8T4HiamTayCh1wMRDFK%2BIFK0zOpHbl9CXYkw7ZNs9azkgSKfk1ZQ2a8EHX4HJTJHDOFVlgFxeD7MxWJnziCz7Jn4pmpsTnTJWoqJby5eiXTjqsYEonW0WpW1w3b6lIPMJrRr8oGOqUB15RKIxnyLZjn7P95SFaPefXPz9rZDHoNbB5J0zqp4ysf53OJkaQrHGqDijKSeWm%2FuQU1iBoG2UQBD6ueyEASK4IxZdvu7MHmv4VNT8kMBh1RTBhaax4gThFpetCzpvUROeatV3miQodiGrew4QHGmPzcY7AVdCGDbsXtCdgS7Jva58G3LgwqJDpG4Srs9eIJESE2nzLbfk%2BOjRNjwENOcRAA4Swn&X-Amz-Signature=3d7b6344351ed839044e0ed50717f49542acf54349c0f69df41db836416d9285&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXA2Z47I%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T180109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIDvNicwCF6WXq3sLJPhE%2BCNQWSIkyIGMdKaXHgrJqLYzAiEAgK4xYae01nC7hVAccqlVZIKO%2BcmhosRqFvhx7i3JOC4q%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDKhCVd9yKXhxwqH0jircA3kLtne%2FTrY1v2AM04RF7iPLPbL3klkOqqwAq8NjzYtQ1PpS6cL7J1P%2BOVKO4Jb6P4W6f4Rsyz4MR2dMsBDUqbKDJm8fwzfiKqvHA20VCCgJxRpLu0Y6bC%2FCkUuZ03H25S4aGnrpNgcj%2BSsMreqGhx6z4Cxa4HPEmy0i1aTPC7hOZ8NNB4PwAafedl0DpfQ6r0ll0XVDtbUuxzyQKly%2Fa%2FjUtTRwI91bQn4dER%2Fc7ctU0O%2BKBN0VCjLF8yNVnhCxSHJYEIWzekuFp6s1cgUHtYKpPSl4TqBkanwUcD3kDzZxhpnVarc3%2BYq1dxgES34QmYVlGbbpnh48YGxwVn%2BNSuBjuB%2B%2FNl3EQh2f274ecK%2FnSSBT1ybCMmAcIlvnknksD6KBae7H4gOVzXV9HEx%2FUnjTuBK8bAJtLEybCu0FKJ%2FLArQOQbA%2FpRGO0FxYH4BBQjnE8yimVPCGD%2F4Fl%2FnG%2Fr12d%2FpBU36HT0xaF1r63mqj2KNt8unaSEy1Uy6lJ1w%2FcdprNLLxMadK1nk%2BKLtkoqJHjlw1xqBMlC5DZ7mPKwoctj6%2BNw1uVJ52iADsjRR40LEOAZNgT861cWX3f4Ze6DemLmSSzHlMUEaAC7B9%2FWIdjhnV0fsLwZ2ZDKVJMLPQr8oGOqUBjoUxwrl%2BMUrAHLkBrCQdq3QoFPVoKF%2BM1bX5wLELXOsFY%2BMR2UUC6SY99edvCk9l%2BSAZO%2BxPtMbjZBrMwdR5NQUU2FUzzJLP8M%2F0jqOuKjSTpPH0uCO%2FzW2h36b7FhwxmWa6or%2BuC5jYqVQn%2BRm8cDMLuC%2FCy81gridTgyKJfFQEEoQRjPDuRjT0H4G5VYoJAMJwkeK1cGmkWDeVcMotBGrLdGA%2B&X-Amz-Signature=74af93237c03a1ca9426dceb0719dfb1330b5aa34712d06bca290a4a6f252b6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VPNCTT4%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T180109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIFppcU8hH8SqNYqNJuQRYGbMb85SdnFeqlrjpI%2FDseUhAiBzXL6GogjBMD7BTb7iFUYPPgLEtjl50w7DFU0Mv%2BPzXSr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMaPgiDvcoEUI%2BJ56jKtwDL9YaoXWh0m%2FBldSUwJB7K1ougQtddAeNzOiNOHA6XoMYNihaqakQVNOfGZ9IqUHOa0Xy85Rhs8i4lvqoDczJFSHZxTmodScjRJybFAPoR8uWhD865YZQoHAB6kSJqSkw2mlu2DUoUn6m8zCSgrA58nTa3IEqVsg9Gi1DnGJDZJDL8xX%2FZZjWs27e2yxxGXtaF8tqJDxytVw%2BnYonvXZve3YJLCvDRc1xZmfwZ3cUAjUWNiK9ub51tWte8OUj%2F%2FHKhF3NOsudutR61zlMR4N0hWcdwtXEP27B79UAg6MqejKRpCZn9PF5rGNOWqh0XzvXSrdWZyjrVQLwh6z58wkqBSApApTezZyXA%2ByIB%2BovbdST9rfB%2FyWclyA3SFy2w0PMaUGtOGSP2Gzymimy%2Bp5y4rT%2BlUNnOopoUHR%2BRQDUrmcV4Xin81iqPzGpLxnOW8iGD5BtJ6FMH6yfVhIHk2rxI0HSxBLC1RWm%2F5Fcm0aaL1FPbUeRsZpjf0aKxSSi0npAiP%2BtimOEHlh4dIskekB5k8G%2BRrKPOBPGu9em0RElE%2FOW5pvhl255ql%2FIn%2FN7b92p3nF0q11ZAu%2BDTlKTXDkS8NLsXrVy1B4HFZCVn91oZaWcKoyzvPg2Vz4NOd8wytCvygY6pgFDzrjeFt27jTx2GkHu%2BerdluMdGr2c%2BO6m80rXva9jHmDIezaZZhzRhd2JSVg%2Fxo7eLQJXj0zed9fEJGDm5GMYWGQRcnr0%2F0jTx8c1wsn3vGkpEVZMwajCpYua6zBv47XxrDc5hD%2F4LV0aY%2BTJNzddm1B0WaZbtIgDyxubu7n1LyhLLqztHgWvGvKoy76T0WAJvkLD8OummbfxUKj8AcBW%2FXlm0pe%2B&X-Amz-Signature=d0504db622838add310158f848a7959e70f70a633c7df57e2f3ca3b0cf677b36&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VPNCTT4%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T180109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIFppcU8hH8SqNYqNJuQRYGbMb85SdnFeqlrjpI%2FDseUhAiBzXL6GogjBMD7BTb7iFUYPPgLEtjl50w7DFU0Mv%2BPzXSr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMaPgiDvcoEUI%2BJ56jKtwDL9YaoXWh0m%2FBldSUwJB7K1ougQtddAeNzOiNOHA6XoMYNihaqakQVNOfGZ9IqUHOa0Xy85Rhs8i4lvqoDczJFSHZxTmodScjRJybFAPoR8uWhD865YZQoHAB6kSJqSkw2mlu2DUoUn6m8zCSgrA58nTa3IEqVsg9Gi1DnGJDZJDL8xX%2FZZjWs27e2yxxGXtaF8tqJDxytVw%2BnYonvXZve3YJLCvDRc1xZmfwZ3cUAjUWNiK9ub51tWte8OUj%2F%2FHKhF3NOsudutR61zlMR4N0hWcdwtXEP27B79UAg6MqejKRpCZn9PF5rGNOWqh0XzvXSrdWZyjrVQLwh6z58wkqBSApApTezZyXA%2ByIB%2BovbdST9rfB%2FyWclyA3SFy2w0PMaUGtOGSP2Gzymimy%2Bp5y4rT%2BlUNnOopoUHR%2BRQDUrmcV4Xin81iqPzGpLxnOW8iGD5BtJ6FMH6yfVhIHk2rxI0HSxBLC1RWm%2F5Fcm0aaL1FPbUeRsZpjf0aKxSSi0npAiP%2BtimOEHlh4dIskekB5k8G%2BRrKPOBPGu9em0RElE%2FOW5pvhl255ql%2FIn%2FN7b92p3nF0q11ZAu%2BDTlKTXDkS8NLsXrVy1B4HFZCVn91oZaWcKoyzvPg2Vz4NOd8wytCvygY6pgFDzrjeFt27jTx2GkHu%2BerdluMdGr2c%2BO6m80rXva9jHmDIezaZZhzRhd2JSVg%2Fxo7eLQJXj0zed9fEJGDm5GMYWGQRcnr0%2F0jTx8c1wsn3vGkpEVZMwajCpYua6zBv47XxrDc5hD%2F4LV0aY%2BTJNzddm1B0WaZbtIgDyxubu7n1LyhLLqztHgWvGvKoy76T0WAJvkLD8OummbfxUKj8AcBW%2FXlm0pe%2B&X-Amz-Signature=174a0152d46b5c890526696216c2079e467b31a50bd9e417e7744bf757163269&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664RTHVEYU%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T180054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQCQZ64y3MM1Z6KKhLH9%2BrsP%2F5rGkBnrpLT42x3fNZU8%2FgIhANh%2BWLDBebmB1zZSZ07P7DueoPLUaRHq3%2FprB8ff%2FoG3Kv8DCCYQABoMNjM3NDIzMTgzODA1IgwJmq35VCvLnzDTZN4q3AMe0dqofOD0d2IMfQMFIPmdF8PI5GYFoOj8j%2FRC0DhMOSTeTwtvJiUjbzjCUnEugLgwPJaANBDfx1t163wuGWpxPX%2BYwMweAYM1mRcWbsLwywpHp%2BwWMucysP2sjH%2BOZ04poS7w7v8wnfWOhU4J7Npxy1smKNm4hwxvtw%2B3A0oCMtGjW4%2BZF6jLUAU0DYK%2BxEqsxvtR%2FY2D1%2FdukH7zEgkIJ5jxwS8DkfiRL649njhQz%2BuqvT%2FCNT%2F%2F26NVN66O7MofgUIP3QXh0pCeIE3k29pk8a%2BvK%2F0kLuzFjZ0ByEu73Pdbfa4bOX6ESe%2F2TFtVKwt6a8%2Flnm5nrL8o5yssiPqSB6%2F6c1ZI1NE%2F2G%2B56CvTrb7uWkNNLQ8EInDmPUofDXTsZSCGMAR1oMiXPWkmtALEG2DXTz%2B0631o1SpMXXLNhOqEJmWh9Hbo%2B%2BU6vusfuYn0S%2FANO2%2FNm9n2O0MGasjaT8c2eldnazCDZboA7%2BSYOV3TzVDRIz4Tvz46tD9ExhIDbEiLw38zb1FIN18SvnRU%2BK28tgS%2F5VbMV2QBe2sVMhR%2BpCx3YJ6X0P4MFDvUxvIR0ADsZtrcSXafh7k5EIH55kXqBO7UsnReKnHYPvEj4R8qdM%2B91imJ9dMTNzDW0K%2FKBjqkAZ9ZTRZgqzth8%2BbvbPcopwtmG67Gra28hohKr1PrJYzr2H4YaTzadU4ezPCZjRpHKuj7xl0DaEFdiW3CNG7FsPK7px1%2F%2BpdWW3EOq9ZYgoNvA0fBEd%2BpY2XhbzFYjhGO4oKUivZOy%2BtWHpXti4J2SmtshI%2BARALx3%2Fs89O7pRvokKHW8xwVpOLaGKPjX6yaibHkk6ypS9%2B%2FKq%2BpPpW5QksToUgZT&X-Amz-Signature=96ffd9b3329b4beeffa86406e4bef5268512a3dc9d6cccffa0adb7942344cb3d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SH6UDBMR%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T180112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIG1AL1vXx0a8%2BhFocn11pJFHyt%2F926JbMeomm8KJoYMxAiAnrTt4H68WfQr8YtIHt4zvc3u1PLM4XCTXE8FmP9PXRir%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMHhVVKfDKrQGl9Y0fKtwDHqLZM0M6cLrUFptymekUZSe6mdTwlvhcy53OF8yHbBBAtVuIEN1php1WyYBYr5XrQnksFksphojjuoFRFEnFq5QxZC0wq7COBCCkVAyX2gTYsjpzRPJvFc3fTWPcGU2fW5FUaI1tv%2BNkdtgUnz0gMZOnwA7OLkOO7uEj9z3gn6%2BRDqsXvheHTHCYjfYmzLw2Yq7d5MAL%2F3A%2FO24bsji94JWYENh0MP3IkapMk0qyj847WeLslpG4uYIsMQ%2BQXI8GPkfktpZGlqHrU4yrEM%2BggEJdT%2FZkBcziP2ab%2BUGKhMXwpn%2FXCV%2F7F%2FRS0lfb%2BLAanCDtmL%2BhQr1nXAE%2FTIkfXmsnJJmWZtxfwI99QkDyQA9bKauvZNfe%2F6wtzgw3rfh3%2BNS5gAH8Rt50RZVmwQ7W5%2Bf%2B8VgNIS8Kmao6D3id8JDSrbrXq3rOvBgFZJv9544m3nng%2FSJbBecnJOxV9rcXWzFaaaEF4mSJ1cgiLF8PRAhj%2BrmNiIekZqex0uDAZtAgdw3eBAHS4qVX1t%2B48SSNSZuXebcwnFJ9fBuyx0BKN0zsIIADTSdSPyK1UMj66wk1MLgO3l3ByhV7DelpeONIAx0e0e3eyEq4kdGSnNg7jdNrmNagC06bkpxP8aAwjdGvygY6pgE4sO%2BShU82dq%2B1KyLZ2Mk4f%2Bn1PGWGpmIGNYg3MOGxboZC%2BMUSi414NY5WIc4A87UTBIYRuHn26yY%2FlX%2F0m8za2Pgv%2FzDzX41Lp2iz6TMnhLrOSXq07NuYNcY5F6pt58xGWjJstwXLC3%2FLCDhqnfiJSWOQVbl%2F%2BMkMd8mSy6AGnumct%2BZWrwSbzC0gTZaKhDVWF8ypXReFrI9%2BQqM5aM0pW2jgQDDG&X-Amz-Signature=4aa6a30f692c43544d32e4e463d7023393fb85c388df470089bc074f439c0af0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SH6UDBMR%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T180112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIG1AL1vXx0a8%2BhFocn11pJFHyt%2F926JbMeomm8KJoYMxAiAnrTt4H68WfQr8YtIHt4zvc3u1PLM4XCTXE8FmP9PXRir%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMHhVVKfDKrQGl9Y0fKtwDHqLZM0M6cLrUFptymekUZSe6mdTwlvhcy53OF8yHbBBAtVuIEN1php1WyYBYr5XrQnksFksphojjuoFRFEnFq5QxZC0wq7COBCCkVAyX2gTYsjpzRPJvFc3fTWPcGU2fW5FUaI1tv%2BNkdtgUnz0gMZOnwA7OLkOO7uEj9z3gn6%2BRDqsXvheHTHCYjfYmzLw2Yq7d5MAL%2F3A%2FO24bsji94JWYENh0MP3IkapMk0qyj847WeLslpG4uYIsMQ%2BQXI8GPkfktpZGlqHrU4yrEM%2BggEJdT%2FZkBcziP2ab%2BUGKhMXwpn%2FXCV%2F7F%2FRS0lfb%2BLAanCDtmL%2BhQr1nXAE%2FTIkfXmsnJJmWZtxfwI99QkDyQA9bKauvZNfe%2F6wtzgw3rfh3%2BNS5gAH8Rt50RZVmwQ7W5%2Bf%2B8VgNIS8Kmao6D3id8JDSrbrXq3rOvBgFZJv9544m3nng%2FSJbBecnJOxV9rcXWzFaaaEF4mSJ1cgiLF8PRAhj%2BrmNiIekZqex0uDAZtAgdw3eBAHS4qVX1t%2B48SSNSZuXebcwnFJ9fBuyx0BKN0zsIIADTSdSPyK1UMj66wk1MLgO3l3ByhV7DelpeONIAx0e0e3eyEq4kdGSnNg7jdNrmNagC06bkpxP8aAwjdGvygY6pgE4sO%2BShU82dq%2B1KyLZ2Mk4f%2Bn1PGWGpmIGNYg3MOGxboZC%2BMUSi414NY5WIc4A87UTBIYRuHn26yY%2FlX%2F0m8za2Pgv%2FzDzX41Lp2iz6TMnhLrOSXq07NuYNcY5F6pt58xGWjJstwXLC3%2FLCDhqnfiJSWOQVbl%2F%2BMkMd8mSy6AGnumct%2BZWrwSbzC0gTZaKhDVWF8ypXReFrI9%2BQqM5aM0pW2jgQDDG&X-Amz-Signature=4aa6a30f692c43544d32e4e463d7023393fb85c388df470089bc074f439c0af0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664OVNOQHP%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T180112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIFidz8ADaEoEkwi4C29iy3lDohGo70J5oZWCyIyvqdBZAiEA%2Bk2tknsBmnIsx55SMtfeow99IPptVXJPzTZ6eOdDEc8q%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDF9E92RnkRpm1Dxu9SrcA%2BG4JCVzspIpj8Cs26lGRs6B9Nh2aDiJFA%2BAY4lbaVoG0bFFeullralQfxe5tRlta24WOJ8JI27wRrIO6qk%2FPYH4FWRghu1M%2BukE02b25A0FVR6RhyVjQa%2BNFQTqzJelnL773L%2F4mGE2Spr7nEA4zCEBaQhFn%2B9ZEV2pU%2F0chm4nEDnK4SfNxwHu5BQ6JSe7nWpy%2FdIciHixiKH5vgdnqgRjk9AtkhGM00x%2BwjUjn4zYkR3GgGsGpW6Rs90cjdhgkaulMKh6j482HiZuyVMegILO%2Bxir%2F64hMt84VDfonUQmxbL735TgQZoXUVRMjCiYedxBD35JgRosyP8o7phuAWcarFDTI2SgUDWcG8xRHT35BKd8tW365MFq407Ixk8RV2Z%2B1bz%2B2jkLj8HeUBwrgV%2BMVhYKLLaMubadlghXEBUSZy1ECDbL3Hn8CTw2%2BRLmPTEUkLJ5Q0IiaEyPpRFZgzHCwauasEPWCKH4ZHPQUYsS4YmhTIPn0Wgv5fVRDVXarbvSnSGJn8eybMHpfVM69Za0fmzopMoAJZ6lmWMyr5z%2FRJhzu86xLzgVh3pkeiaPvKSpNvjFuh%2FU2VZFwuCieCBZRa9OJ7haLwyA%2Be5otTaUppFH7lW9tQv%2FFup6MP3Qr8oGOqUB6Nn2hPaP0vRyy3BLPk2ffxzyF6g2CZC9NM3UCgpyT1qrLVMdVnUrj6euc7r6p3perY%2FUsERIhJKzBUfvwvunz6H5g0LD3Ft5mrpM3D48xwAS0YdTIhq%2FEeB04%2BdM%2FENBW%2Bea%2BnaN5TnARHpM%2Bh%2BJnBOTRsPgT%2FGq8DvQ7m3%2B57fGFNSFysiqdRerKV6qfjYYMnpTa0RZGc1gszJJAPGhnUvja39k&X-Amz-Signature=7b418412ecec7357238c9bd04460e85f63a10ee65ed3ffc12095dd7b28d939e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

