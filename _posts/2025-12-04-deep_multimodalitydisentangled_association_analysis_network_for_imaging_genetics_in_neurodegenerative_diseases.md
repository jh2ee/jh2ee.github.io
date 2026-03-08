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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKWDIUL6%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T181518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIG4EtMSyyrs6koWSsyc5K7hORSswAAqeCCkvdSS%2BPoW%2FAiA%2B9cDNdfZPM3xMCmQiLDMBI%2B%2B0eRWcSjVN64ejn9a4Eyr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMvUYygmhZ%2F6nL8paQKtwDRpy6HaXSfunq11IgZGd82ll66SAc029Dmg36W2OM8ZPiEOCkSpfL8kAYLx%2B61gL5R2L3Mq%2BsFncjrC0sdcP%2BR8Eqk4fiOXKZJ38R%2Fp5GH8tiT7VRTIuBgWWHcoldVm9or%2BUKb5oddbbp0Kfv0bUKFtsMceZEX%2BNOz4t%2F2CJfyeR9i%2B3hfcT4mc%2FLudH6yoAU5jjIm8Xj2zLUdwFo0DOnYq1bOvwUMNCAl6qktPvGj2BjMbnrwHtSKcriaLwNznZiPDY8EPucCm4pA%2BP3PQRn0FykHf09L%2Fo3kbgJpBV8q9shgy5in%2Fg4uz10pvMBOYaTjHwj%2BbBZvl94qbaSyQEgNEGMTfRQaXZtmrx7V3zvFIkpcCa1KQpx4RMXUdwi7K%2FY4%2FRCGo8DFlBGVH4nxvDUD5vqik7tpg6JF02Zl4to2W7EmjGuXzdjHb8AyAcs2NLDxQcIiANSvRmvo%2B%2Bb7IIu5y3MVVZe8ESWMsWUPaG5vl3FjpgHE7uAG%2BZ30iS240UcLcY8UVXATE6JF17%2BBc0HM3A2Fxev3%2Fhdxs3D4fSXmB9YNZMmZPQGn12sWQl7SLqKnDd%2FrUkad%2FuJYO%2B6RuXBRShnIneM2QycRnS0LR%2BvM%2F58GwIgZzxDrZp%2BYL4w7MO2zQY6pgG9KCeOzucOv62Wfn7sUrsPISFVCwiu8O0v%2F3%2BHKeIx82CKIpKFMKSCb%2Fe0%2FPbOdgyc1nk1u9AW%2FNjhB17VONoweJret2Es5bOEaCKXNQvXAkJ%2Ff5g7kYa3iScoVrqkW%2FM9wMXwJTQz9%2FZVtYwkZoSn7OnDCly36yde77gP%2BnkbefcOr7Zxi1p0i5nruhsij%2FMkGqCxR1%2Bv8JgsuTUbPq%2BZF5UVUvmH&X-Amz-Signature=0bc0c9b8236107866fe71398050782a10e900800fc75ea41a6738116bc5d5800&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKWDIUL6%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T181518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIG4EtMSyyrs6koWSsyc5K7hORSswAAqeCCkvdSS%2BPoW%2FAiA%2B9cDNdfZPM3xMCmQiLDMBI%2B%2B0eRWcSjVN64ejn9a4Eyr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMvUYygmhZ%2F6nL8paQKtwDRpy6HaXSfunq11IgZGd82ll66SAc029Dmg36W2OM8ZPiEOCkSpfL8kAYLx%2B61gL5R2L3Mq%2BsFncjrC0sdcP%2BR8Eqk4fiOXKZJ38R%2Fp5GH8tiT7VRTIuBgWWHcoldVm9or%2BUKb5oddbbp0Kfv0bUKFtsMceZEX%2BNOz4t%2F2CJfyeR9i%2B3hfcT4mc%2FLudH6yoAU5jjIm8Xj2zLUdwFo0DOnYq1bOvwUMNCAl6qktPvGj2BjMbnrwHtSKcriaLwNznZiPDY8EPucCm4pA%2BP3PQRn0FykHf09L%2Fo3kbgJpBV8q9shgy5in%2Fg4uz10pvMBOYaTjHwj%2BbBZvl94qbaSyQEgNEGMTfRQaXZtmrx7V3zvFIkpcCa1KQpx4RMXUdwi7K%2FY4%2FRCGo8DFlBGVH4nxvDUD5vqik7tpg6JF02Zl4to2W7EmjGuXzdjHb8AyAcs2NLDxQcIiANSvRmvo%2B%2Bb7IIu5y3MVVZe8ESWMsWUPaG5vl3FjpgHE7uAG%2BZ30iS240UcLcY8UVXATE6JF17%2BBc0HM3A2Fxev3%2Fhdxs3D4fSXmB9YNZMmZPQGn12sWQl7SLqKnDd%2FrUkad%2FuJYO%2B6RuXBRShnIneM2QycRnS0LR%2BvM%2F58GwIgZzxDrZp%2BYL4w7MO2zQY6pgG9KCeOzucOv62Wfn7sUrsPISFVCwiu8O0v%2F3%2BHKeIx82CKIpKFMKSCb%2Fe0%2FPbOdgyc1nk1u9AW%2FNjhB17VONoweJret2Es5bOEaCKXNQvXAkJ%2Ff5g7kYa3iScoVrqkW%2FM9wMXwJTQz9%2FZVtYwkZoSn7OnDCly36yde77gP%2BnkbefcOr7Zxi1p0i5nruhsij%2FMkGqCxR1%2Bv8JgsuTUbPq%2BZF5UVUvmH&X-Amz-Signature=0bc0c9b8236107866fe71398050782a10e900800fc75ea41a6738116bc5d5800&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXKNR4ZO%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T181518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCg4hrbZRUHrVAbjDy9AJJ0itfunnIOhFVekvP04EpzRgIgcXgc3vahIPnZJkr2pC5kPkWDo%2Ferlk34MusHeHpjmSoq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDAKy1%2Fy5Y%2BexDznZ2ircA1bqlvyni5sCNDvHONkSX1rrgxzOTNBToKA2LJFg%2Bsjz7VCMQWNHdN24cEQzeQnWkgNVXWStqbxxRVk3tfPEC02ViSJrgVxeh5taVxWt7D8Tp7t%2B5agjlLN9i99thhtsUEe74lCFPXFZX%2B3iT70j%2BUNLpMqXuWskTO%2Bg%2FvjPH4pQcvw4fjm4D5zGuL3c3eWeyaNnMDACr%2FI5o%2BacGlslMITt8g1v6QeigKGAU%2F9kMxPrCUQhS2MsTCzgtugVYYkmC2PkRqEEFnmdInMKeQnEN4BfVj597FRSXOY2BDpi%2Fb9mOhiiPy16Uq47Mfwpi6VqfhAkkQQU3B8s3Mm7ud0yLN02T8pZyLD2r60bvJkoTYLr9YK3s712iHD7GhGPKE%2B7QqZm2dqxz8G66EhkSsyHO4r4D6qZKKFb8YivKUHdvfvT6FbSwNru3obzp0NEQHaO%2BuOtmPCM9b7Xhv%2FkVpxRx23PruKVbZTHfASksU7OTkkFlMqub6L0D2CMwA06a9sXvw3lDDfOKQ0D6yu6Ag7Atnq0ntXWqk%2BtBj9a8myzZ56%2FqBlmpltpUaM%2F%2BweBt4oJx4iXTfQ7tJ%2FZriHii0lSBtLpa6uNFI0LQVvWOdRiCeX6PRYViuFuir9Oj8BpMJHDts0GOqUBn5GnrSAMxWECAnIWUlK7lSSt%2BTy1Fqll%2BwllCLABLRl7s0FdQeG8%2BUvNt8k0CYng6SxIWeuoeZpYipgeYUEJOe3pBDfMffTjCe6w1527QBaZfx5WfVrxLtG5eHRzRTzAx18%2B2CWsXUXUERO3uBA6auZZBzzjymSXFESyf6F0OWQfvaJjGVqCKGpnolua6RojG3Q2OlE80s7TXUzvi%2BrUYPb8WLXF&X-Amz-Signature=9e5f23b2386fa9446ac3314189eca8345e7587c12e71757490b993b95962d338&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635WGTFVA%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T181521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIAaiYgLWe3gVjdJFTJpObzlYdQmpXrewY%2BCtRS%2Fu0EDgAiBK1z%2FpmAusYuA1%2B2iu9CMh4NhUCrDtSwYgb1%2B5H%2BLtDCr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMeNIRrkMi6oM%2BWXv8KtwDI3nJoPlm%2BMds1qMi%2FceVzHD0%2FnZhQCMRdF014itECLfyf%2BfCl880bua6AKEO2UN9NfVHSHm8IX1tesrMmLznWB6IMSzjQjc%2B%2FiDozoqr5Bi8gQLEcMNkwYwo0IltpvWql3MHxCPOXTA2etRnwiQlIAnMm%2BixgRQ0NSX6sWVVlUYRkK55ZakP86R5NucBCPB%2Bh2CjeOhRe9S1VgDZyAJ4IY6MveC%2BoOaPBRa1d3FvndxUFSeUAhmfbQUjvSazB7DrQMaHGKojH4Z2%2BDrl3XLchY3zjFKSbLTF2ySXwc3O3fXNZrOI9wgMvZXHvDHbAvwoOk0yrOEnuMaJyfF%2B5j1nAUwxtSlBtsTU4gStt8wemSoreITGEgFkhlVYKei%2FxMT4Bus%2F4Ie%2Bv4uYBgnaoMKLeX99shU1SP%2FIQrZVOeleL2efGgACjtZ%2Bb2K7SkObYqxK%2F8R3F3RHNVMNdiRHfTXel%2FFg6BXU9hG0c73aHf5MtSBgnpZhbDTjtbwjT4x0YVKM0p3CH11Y9CfALvd%2FXMV5LvgXrfKIUhoP8m2llHuZfAmpu5VZWtX7B%2BPe4s20Ehx45Xv%2F4SzGPujayRR4zoadN7dIPAGaPNZJoDZ3OOwx9gWvLtzfUHxN%2BeJtuL4w3se2zQY6pgHpEMgnJiUejRQTY60Gu3URITgUAH4CZUK4iEw6tLm7A9OFOFEuwSV3AY%2BtpMXB5CxVp5cLiZdvn4lJaFq5GRQhadMt6k1YXyEMd7Ax14YMqfNnLvnXgPAoyAFKrjWj1YxSqOpg1wWpjeRpxkOduASrBWwCcuBEycG%2FEfu7pIEWGAgvkAIR%2B2g4l0rs54EH4%2F%2Bl%2BJbS5rGDXgEDj6S7V1hrCmkLywn8&X-Amz-Signature=2ad4feda84dcc433be98d07194c1b4858301d19a21688e0a4c07d475ea29966d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635WGTFVA%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T181521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIAaiYgLWe3gVjdJFTJpObzlYdQmpXrewY%2BCtRS%2Fu0EDgAiBK1z%2FpmAusYuA1%2B2iu9CMh4NhUCrDtSwYgb1%2B5H%2BLtDCr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMeNIRrkMi6oM%2BWXv8KtwDI3nJoPlm%2BMds1qMi%2FceVzHD0%2FnZhQCMRdF014itECLfyf%2BfCl880bua6AKEO2UN9NfVHSHm8IX1tesrMmLznWB6IMSzjQjc%2B%2FiDozoqr5Bi8gQLEcMNkwYwo0IltpvWql3MHxCPOXTA2etRnwiQlIAnMm%2BixgRQ0NSX6sWVVlUYRkK55ZakP86R5NucBCPB%2Bh2CjeOhRe9S1VgDZyAJ4IY6MveC%2BoOaPBRa1d3FvndxUFSeUAhmfbQUjvSazB7DrQMaHGKojH4Z2%2BDrl3XLchY3zjFKSbLTF2ySXwc3O3fXNZrOI9wgMvZXHvDHbAvwoOk0yrOEnuMaJyfF%2B5j1nAUwxtSlBtsTU4gStt8wemSoreITGEgFkhlVYKei%2FxMT4Bus%2F4Ie%2Bv4uYBgnaoMKLeX99shU1SP%2FIQrZVOeleL2efGgACjtZ%2Bb2K7SkObYqxK%2F8R3F3RHNVMNdiRHfTXel%2FFg6BXU9hG0c73aHf5MtSBgnpZhbDTjtbwjT4x0YVKM0p3CH11Y9CfALvd%2FXMV5LvgXrfKIUhoP8m2llHuZfAmpu5VZWtX7B%2BPe4s20Ehx45Xv%2F4SzGPujayRR4zoadN7dIPAGaPNZJoDZ3OOwx9gWvLtzfUHxN%2BeJtuL4w3se2zQY6pgHpEMgnJiUejRQTY60Gu3URITgUAH4CZUK4iEw6tLm7A9OFOFEuwSV3AY%2BtpMXB5CxVp5cLiZdvn4lJaFq5GRQhadMt6k1YXyEMd7Ax14YMqfNnLvnXgPAoyAFKrjWj1YxSqOpg1wWpjeRpxkOduASrBWwCcuBEycG%2FEfu7pIEWGAgvkAIR%2B2g4l0rs54EH4%2F%2Bl%2BJbS5rGDXgEDj6S7V1hrCmkLywn8&X-Amz-Signature=0d24a43ed5ef4044db25ccc9b6aac7354eea9e2be777529bcaf0aad28d377749&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q357LVZN%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T181521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQDYU53iOFYVfqwAWjnOXVoLpUxB64%2BB9Uli2WMQLp0IkAIgdd%2FBVRKL5H5E76MeoSDpdfgxtQowjhGJqG1VfM69Z9sq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDC0G07rYMsw4tWYBSSrcA5JK%2F%2Fq73xLSQ1e7EQ0doVzRDZ%2B9vuwluwW4N4WtGOFNenA07tcb22%2F2ktGurL%2FYKxdeGFp%2FvatXqMmtVjyJqe%2FqA44ldiRMT5W%2FWxE7pn8cDu0vTZIfXNTnfQFafjmo7xaEzm8FOThOveTBsiCvBrVlRiz3kFSY85UDOCp1am2QED378K4nl2ZodpTacvmonJ%2BK4kLZnBqBPJR55sL29B0qM7vkaDpuKr%2FU9awUptRwbwjoH7YQSAF7KQ5wlxotjEWH6%2Flhw0t%2FvcJPpp2qXbah6lhkL5r98TA%2BjAXwq28Sgtb%2BjstyyiYczVXu5LOqVzzwm7X8ayPZqGhyvNMOl3EyKY723i9JW7rSeIt9ruFWpUG3SeUIuTUN8ttW7jrpr2FsIHYcPb0%2BqoPeo7gSc5g%2F6tPA1vA1rWZLn%2Fr6ZM9svq5weoUrdms51xJIg7zIWWuONirz0dyumdEVkSexiRLJj1hB6TCX30K3lIDoQjAKqk42R5my1TG7fYL6pc0%2Bh4X2eSL2bTSq48oIMoxgik4sBhSlyGVX%2Fo%2BbU3TIMO1tSb3lchqyv7pf7St6VABDJxJD8uViEIyiOQKbm327YEWwYiKvfKnjtUG958KftJDiGAlq3cQuVL7a%2BEkYMJ7Its0GOqUBBWzrMBosFPcIN73IwLvrh%2BcgZWQsV3DQXAwD3kYQMGR9Nd8TDaq93sEkghk8Akr536vl0NO14S12k4NczY4u3BKzg14PFzB%2BmGj78HAX%2B6tlFCcN180VTIPTtsJtkJaQnMEVQO5IKgy6mJm%2Fy6I2HFaU7jKJ0v3heNvwa2y9pGBdIS%2FTF8p9KTnCzmMk9%2F09sREg4YZwPzE2hQjbhknfwnMtJCAs&X-Amz-Signature=4eb62a14bc7326837f78ba3930f7e10feb3acdb26cd7332188f2072944bb34c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HBGGTKL%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T181521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQC%2FYpXA6pbjVVHmK9ZmJh6Q2MOi2FP6sz8Cay5mJwXaOAIgUUm148YNaRz9MsbL2%2FKBJBF7qucEEXSVHJHFgEkvQKgq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDP7GClJ0muop07K9PyrcA%2FxYn44f5tDEHUMwi6jBHphEYvjmva%2B%2FyIYCCnlgfB2Y%2FYCbyMpvAYgWHqLrAAAqqu6xOIALGueoaSIJ0hXT5eX%2FjvqaYC310mRdNGqLT%2Ff4dzavEpcdJMGkO9EgR5PW0Aec3prYYCSNq7GR8G6S1X9JlUkOid0y8JByOlqxFlJ9vvgc6tQNtt%2F06GBRMi%2F7i8j6QYVA1NVIFaWsmoGboHjNXLRAtwDFy0sxDV2rwkJP5KGUAmlMLnqhfv%2FH5Vt%2BqaN7uZeQDMmyTPChxwaWzq3Gr0R38OqEnCAG3pf4VFntb1%2F0ZV8nO7FWkxU3nMgF%2Fo%2BASLdYoQ55ZTuph7SWuJ%2BYmttYnjvCSbSFzZdyqmfGvoJWOqhR0F4X6WREICJubU0e0DDkGfJ%2BERqiOMpmJPIGgWaIzOb5g3jAZJ7J%2FK%2B%2FPsngFrf5tb%2BP3r7FvyovpK8u7M2nRFBLgCSuTJmzx%2BWePJSEsFQ9TjhcvrK%2FBRYYDLxWIxYMn8QucuPQjNIwHpU4s1Vnya7bzdlxUNRXep05DiAfnbeAqgxB5cn2L8%2FzOzXXv%2FOFCDxPO57wlZTzJRcGxUG018SWGQMtpSIO3rb7hOotrGR8ugYMwcNoDyFT9V5%2B1W%2B97YX15hK%2FMPfitc0GOqUBo07khxHxgCAtMtZYbvmaC5MeBm6acLeO7ZWNHmfEo8r8sMisotMDLRy0EBa5P2vig3t3z3RupBoEg76IEyWyxGp%2BSWCbQ2oxuFYhMwGHcVYdSOffEpwup3LdVgnHizVcXQP9CYhp2BBXfKmYhnW0xMKKmshPD4yOG%2BcPL0ySmpt2bx3EMi5xhDXVVuMOrJncH7jW0srDIwH5XWOH%2FDL9PJiz3s9s&X-Amz-Signature=a302b60e044bd6cf2422820b2723c7332e6b476060bf6c11d451f33e3d405523&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KOMEPVM%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T181522Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQDzMxs8Dw1aiG%2FTjDEWx9YFmizylFnznl3WktAqHc21nwIhAODJ1rUqEKcRSXo%2F%2Bix3qKYVSyyHu9d727Ib13QC%2F%2FtjKv8DCBoQABoMNjM3NDIzMTgzODA1Igyn%2BV1RRmUGafD0KcMq3ANysQEyDYwvj7FWParf3xmqrmdo0V3Coz8jGhF1BDF3w0KiiJGOKr0N8XJrtRjjBtAaJUemR1cw5Z2ZtVo%2FEj8Wz%2BYY%2FWMMX851EdB2FCg%2F2Z9wJQM6AighC4LOjmJCg6zRwvT%2B0Tt%2F2IBN%2FaAQbB2InRMbGCbwsLIo3ysHT0PIHqHcUG59KMzdhKSNJCPO%2BID4HeJ7UFCy%2B9ou4O6pFwpz3mn8lcpNX%2FwJfialXgktN4Em0B3JcJaH4PgzagjTekp%2FBBJHiREdLJFtkuk1sMwDs0qCcqxtSTSL7Pjhs9d5XtglQYdOkndzrIdvjAwiGJUiPW0kNAeAT1mAH%2BZ8BT%2BHaxrQBb8c7Z3eVSdV3cEcT2PXxMaWDpoOxe5co6r8RRhc37jxTcHDDaGPCdsyZqs%2B9u2Sbyh5w%2FtsKfJavx5fqG%2Bl%2BcQNOUkindhc9A6DpXx8FDikg4AZrK6aT3aOb1li0JoMbtuJ9N3QoJi6rz2A6bYa65zRt0paXR1htYOBuG%2BEYfAYswWkW9JnEwE8Tokp0WXKQcvoDGjStLLKcm9Sg1%2Bm%2FQIu%2Fu62DY87rYLXj4%2BcumGQDYS2YxJkDudthojSUxVmHx6bSUXP2ti2Rp%2F4NdlR3YUxWsOP6CfraDDUxrbNBjqkAXKTcI6d7uLHsCZpdpzKTQONJlHNrtrN70PjxA0oBp7iHoGH2yZ%2F2%2Bns2%2Bq3f6uogf6EkDs%2B6y1xTxCiCxDPiy0HwTpgUmMoOAY2vbKdt5y%2BZU0JnPzlvr%2BAS2zarY4dNiYt8vI9ynl%2Ffu94h7SJXLYPwEBd%2F77Fhszpcou4n%2Brieh4sm5fF9kKHKd2RxAXydpCHmR1wo%2FBGuiwQTgA0vvNYZ6%2B8&X-Amz-Signature=1c3c05841fffbe1ec5cf414f03b94211e158c70e8f75d3f17c6237582b1817b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRDZZWK5%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T181524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIFo%2Bw%2FTu8A2LprS6GBzsbmXrSeHgEezr80fajuJ11AFlAiEA1sbBP0JH2ROMGjNQj09P0PRdYTjXFBdI0jaZVl1NNukq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDKgckGTC3N2hqadARCrcAwoNMzcQcCdu1cZ9fqPOC4e%2FY%2BXX4Yb%2FVp5FQnVAFAKIsyVAoUfpznD35tHETsBnMvMOJD%2BrFQiyXqjOB5509OW2kidMP7j11IFUVTZaNvtI2AzcvsjVtSH9hZ0DRxX%2FeiR1dy2q2Lbm78Ho6IlwRvrzsPQDaeBcKzddAANOJo8wscAj78DSJSYfrhMCkwK9pxH7GoGVoC1HE8qfC5%2FlCehDFg%2F29UpRSsNfFqExcN2JzmYIBNk6r641%2FSfOGdpOxFPgxexn6Zy5%2BsomzzlS0uGsP3Bm6Xziihb6ePeqiPL7WF2qVFNBL%2FcFrk2Np7AqBDHjMIPtAfB0Xvq2%2FCE%2BrVf5ND%2BF%2FiyvSK%2FBXGQ0EScltg4S8qivaDEeH752pchsyejp8fZRmHZm6WmC7u9af2dTvKH%2FYj3x%2FvzG%2BlZ4K2BV4siFGelTX%2Fn0KxG8fpttWi1Yt6nk6EiLqykzzlqw7%2BCoqVwkHkogXUMfitv2tJPRe5RbpXlHP1OXCsM7LLOJFtZ6JF9mHcStYEVGrjh9zqiqaz5WXpX67Q5WmIHfKDwcpZE0CoDOqTRLEFdBG1Uu0yGSO1xY3HgPv5LtA0Z2ZBFL0SH5j11nu4%2FQJHqWfOWHMskgT%2F0tqPme5d0cMIzFts0GOqUBjX5ijqmOgWZcyoMkfyoDGODliVhuwwfdgE9%2BV5A9HKeHvjvC3x65fjhvFV%2B53jlv9i15PaD5Kg2%2BSigbP0T%2BmiaCQTae3L3NIdeynGPXnt683ITr4nGYgaSxG%2BXCba%2BtZAiT4r9NZlc%2FSjz9uNB2npsY9w8mBfUs53%2Bewws3ChXNN4ELefhqgvyo2EeYbqwLSmG4XcbL22ULOFVV9qdHqPg%2Fc%2BVh&X-Amz-Signature=2fd5a680fc35f38d6b87f7e9f22b67d3d77a6b56ae20fb960e8f66ba00561a77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRDZZWK5%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T181524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIFo%2Bw%2FTu8A2LprS6GBzsbmXrSeHgEezr80fajuJ11AFlAiEA1sbBP0JH2ROMGjNQj09P0PRdYTjXFBdI0jaZVl1NNukq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDKgckGTC3N2hqadARCrcAwoNMzcQcCdu1cZ9fqPOC4e%2FY%2BXX4Yb%2FVp5FQnVAFAKIsyVAoUfpznD35tHETsBnMvMOJD%2BrFQiyXqjOB5509OW2kidMP7j11IFUVTZaNvtI2AzcvsjVtSH9hZ0DRxX%2FeiR1dy2q2Lbm78Ho6IlwRvrzsPQDaeBcKzddAANOJo8wscAj78DSJSYfrhMCkwK9pxH7GoGVoC1HE8qfC5%2FlCehDFg%2F29UpRSsNfFqExcN2JzmYIBNk6r641%2FSfOGdpOxFPgxexn6Zy5%2BsomzzlS0uGsP3Bm6Xziihb6ePeqiPL7WF2qVFNBL%2FcFrk2Np7AqBDHjMIPtAfB0Xvq2%2FCE%2BrVf5ND%2BF%2FiyvSK%2FBXGQ0EScltg4S8qivaDEeH752pchsyejp8fZRmHZm6WmC7u9af2dTvKH%2FYj3x%2FvzG%2BlZ4K2BV4siFGelTX%2Fn0KxG8fpttWi1Yt6nk6EiLqykzzlqw7%2BCoqVwkHkogXUMfitv2tJPRe5RbpXlHP1OXCsM7LLOJFtZ6JF9mHcStYEVGrjh9zqiqaz5WXpX67Q5WmIHfKDwcpZE0CoDOqTRLEFdBG1Uu0yGSO1xY3HgPv5LtA0Z2ZBFL0SH5j11nu4%2FQJHqWfOWHMskgT%2F0tqPme5d0cMIzFts0GOqUBjX5ijqmOgWZcyoMkfyoDGODliVhuwwfdgE9%2BV5A9HKeHvjvC3x65fjhvFV%2B53jlv9i15PaD5Kg2%2BSigbP0T%2BmiaCQTae3L3NIdeynGPXnt683ITr4nGYgaSxG%2BXCba%2BtZAiT4r9NZlc%2FSjz9uNB2npsY9w8mBfUs53%2Bewws3ChXNN4ELefhqgvyo2EeYbqwLSmG4XcbL22ULOFVV9qdHqPg%2Fc%2BVh&X-Amz-Signature=57d502f5944a5b01fed472bc12866731ab2d1ab5d74d4bb400f2fabd4c453a8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666QGNXTK3%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T181516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQDIFZ%2B4NsOhv0cnQSOZwg2lpPCoj%2BwdhEi92MUN%2BcqVDwIgR2T2%2BJautg%2BFTU67TXYBqG5C1cwiJkisMm1n5EbkXLEq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDKxMxZTpVSh%2FkJoONSrcA84vaiFY2c1zHyZBkWhbvpPyS0uZ%2B56VFUL46xLHnOAcb8RFCcy4Q%2F8qG7qP3zH61SLKonVTFZuumswoMdchjIAvETms8foB13PkRSgL6HPKRp87olJrE1on6oAdOyHcG5stYaG4hhT2KNhaz0bmYKtYifhGtKLLYkhjiGMpVZyJ2k7GL41RZLDvwWHDvnINbQ%2BNhTMY0cLkGp0cF81yDSFfkDOoaHw296cQqve4FR0QrkA%2BBbUzaPVngee1rId98ByMMQcW25hIr3EVBSNO66g524nHVCUNSfpFV%2FSxHIiz%2B6rndsN%2B3sLkY0AY5kq9AM5LFYT1WCdyBOgTOYxDOCzEHVccoa%2B7Ig379Cz%2BUZyux%2Bx5igJwVZoq7EWJTppo%2F3xsImSIrYmSI85yzGY97II%2BnMyZeAl%2FBYEySJTzjXb08%2Fqg2gGJebkRxJaXDkrtqa26HE6GWhdN34FIHHXBYX0JtH1kgz4yNOQOGBYUZZUjtLCg7KJToe%2BG2oVhFwrYR0ncMNfjTkc035GYBqIKUAUk1sILLi0847M4UG8j8%2FrZDJVzn8pwvxFoHTx5rtb1MLw1kkErvQtB%2Bck3yFTSteWkLyf01s3h2qqMM34tPLv6D1paVI1COzkrBWCHMO3Hts0GOqUBXEzuOK7vMLYxCb1sts2xDOgGlDGJ8bHkuTQBo2BJgBrb2a0ew8NZedycuAOg64js1PawmrVd%2FbtjnawZtknakFWsKaCrVdn1wyI6nmK7C0CjCh2vfmIFQlZy%2BnLAEzvbv4NPkQkX1aX%2FtiGuL3hKmFF6aTF3%2BHa1afEd%2FwLEMFZBz3XfPvOT5wiB%2FnVHVRCxKsg1IjnFhJrl2m8p2%2B%2Fzao0%2Fc6C4&X-Amz-Signature=f4f018bcc39b42089058667b9c5e1c930fdc5f554a98d32b385d6003f2944bd9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HLSED6D%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T181524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIF%2BJCFV4K7yzGrmZYX%2F3B1hy1GzhBY%2FqDOiKMC2gjIqFAiBwi02nPwbfW49ylpVpV3dm40DI93IBRxy%2FzY8pX4Vwjir%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMbJBI%2BeqhGfHgly2pKtwDmnJq%2BhuEYI7rEXQ8cphaZ2pfS7%2BlhY5FTl0zTLlwJSi6l%2BV90uG8ZXmL4VnwdkC9gwNkhsLEr9giEqZL2DUZx0vV0wO2ScAKicLhQhLgQ5xTIUIaFm6T2odOmwANwW40UdQRyt5CaaiAu4yQ2O4%2BjITiHZ7Ia4piR73OhqIr8rOX180BYVrrWToep1corT%2Bf7q1aNZNCHIuhMe%2FQqXjkMgch3KBdoZh0x4Vsw3GAS3DRt7A3f07MBkAmhAfkHrCDha24ACgM807ntUGyG%2BnIiRCdX8TUGioJYACmA9ABwp46xsQ28p0GqCR689LJag9wDhaUVisEaqc1uNBmCpGM9RVx59GBCpAWCeSYQkH9XkUVALgwQglSsy%2BHVTAI9Lc2vFnPCG7C0B%2Fjki4x2GRTD%2BIo8Pc2KkgrebZ2I3bBFPloezvjvEk78Ub2ttPp8oIxazecD6u5zRUmYecxVDpABthrY0wGWYHpLl6NoGBVoYjHW8B4pjpIqFkrDJBzaT9S4w3xIDoooQesQLM9C%2B6mNXNKmDqwgts859Sfd02qMAf0l%2ByhdQ%2BPgMNqCtn67%2B4zGes86WaAq%2BMIxuwvVN2niSDsJnxPZNjoX%2B1iiSEErcObA3Fktj0ay40jMAEwrcm2zQY6pgH1CXehALJpxqj7Rzor8H5cmnFHxY7Nxa9ogWlbs0Gc%2BezelRWiYGIU5%2BQgN2x5yNdpGgKm6Q5m3%2FJngYqBTtPq91nDiDI1IbKGCoR%2BwsIhEcueUSp42hqQfOD1qJdb2Ly2T0z5u0laOjE3jMsiUdKVO%2FOtxrXASXDxtFAg7BADcKxGA%2BWjLoEicY82mP8vgMsIzNVYplk%2BfAqYjJP1eg9eN8XRYEXO&X-Amz-Signature=5e0e3426ad7b6ae81ca5180433570011be41472488d7195de8f7a3014a6fcd31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HLSED6D%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T181524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIF%2BJCFV4K7yzGrmZYX%2F3B1hy1GzhBY%2FqDOiKMC2gjIqFAiBwi02nPwbfW49ylpVpV3dm40DI93IBRxy%2FzY8pX4Vwjir%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMbJBI%2BeqhGfHgly2pKtwDmnJq%2BhuEYI7rEXQ8cphaZ2pfS7%2BlhY5FTl0zTLlwJSi6l%2BV90uG8ZXmL4VnwdkC9gwNkhsLEr9giEqZL2DUZx0vV0wO2ScAKicLhQhLgQ5xTIUIaFm6T2odOmwANwW40UdQRyt5CaaiAu4yQ2O4%2BjITiHZ7Ia4piR73OhqIr8rOX180BYVrrWToep1corT%2Bf7q1aNZNCHIuhMe%2FQqXjkMgch3KBdoZh0x4Vsw3GAS3DRt7A3f07MBkAmhAfkHrCDha24ACgM807ntUGyG%2BnIiRCdX8TUGioJYACmA9ABwp46xsQ28p0GqCR689LJag9wDhaUVisEaqc1uNBmCpGM9RVx59GBCpAWCeSYQkH9XkUVALgwQglSsy%2BHVTAI9Lc2vFnPCG7C0B%2Fjki4x2GRTD%2BIo8Pc2KkgrebZ2I3bBFPloezvjvEk78Ub2ttPp8oIxazecD6u5zRUmYecxVDpABthrY0wGWYHpLl6NoGBVoYjHW8B4pjpIqFkrDJBzaT9S4w3xIDoooQesQLM9C%2B6mNXNKmDqwgts859Sfd02qMAf0l%2ByhdQ%2BPgMNqCtn67%2B4zGes86WaAq%2BMIxuwvVN2niSDsJnxPZNjoX%2B1iiSEErcObA3Fktj0ay40jMAEwrcm2zQY6pgH1CXehALJpxqj7Rzor8H5cmnFHxY7Nxa9ogWlbs0Gc%2BezelRWiYGIU5%2BQgN2x5yNdpGgKm6Q5m3%2FJngYqBTtPq91nDiDI1IbKGCoR%2BwsIhEcueUSp42hqQfOD1qJdb2Ly2T0z5u0laOjE3jMsiUdKVO%2FOtxrXASXDxtFAg7BADcKxGA%2BWjLoEicY82mP8vgMsIzNVYplk%2BfAqYjJP1eg9eN8XRYEXO&X-Amz-Signature=5e0e3426ad7b6ae81ca5180433570011be41472488d7195de8f7a3014a6fcd31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TSIDODYX%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T181525Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCICLdrWeghU12oF9BLkdmriEJqe4xVZwpuJUADHA0VAx9AiEAnpV0Y60KZ9ImZIwju%2Bn5yVVVYmjTW1tyBoFqF2Tq2rIq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDATFRvN9dlNkSS3z%2FCrcAx%2FKmR2eFrS8XYa8ozZE0suM6dKXuwuq%2B3ODE2IOz0IkMzFLcc%2F7T2gmwa0hKmrOcBkxtpWGMjTTDp0sq0DuT3ax4uS%2BFzwDgIAW%2FXbNPP73ngP5Wxn0CnaUz0hlzKJPTZdyg5AqT2Zl1HILvL6Hi9KaT6xjCNE9tL%2FftlIZPjJgo5Xg2tuskwFXb0GYoYOuaDXSOwFkY3P9tFUkjch2ipvfkt00uoKoEVAQL82cj0L%2FqSqVpkj6L248HY6u3yK9nWn2RUV2rVmXihn4pyAGIMsNyikq%2B%2BvtqLfoL%2FxNJFgSHkhpG03WU9XLBRlwWyen2sL%2FmktmQ0s3cF0WwkjfHQYc%2BRqDVeKXNpw4M5O7Ywo7qoDn33F91c4TzQwiEWxxYT5N6He%2BuZLPh4%2BhSHQq2k3lITgi%2Fx7aGfJGMZ7SqrHqBjo5ZHsArEWVYJ8Gj8fWIZ6G0XyPuFNo%2ByakhUsVw2D6feHG45HStzgnrN7TmhLW%2BauKkXH633t7w6qlJIJ9xW8z7L4Eu%2BZH%2BxcY6FCAZRJI03zyI8VRqRxVj%2BjIOJwazWp8%2FtpsQebKl1Nbf5RMzptd6BAhyxE5YhKfiLq5dQkQroymra9O2vQB4Ba9bH7NfYZGbKUv6%2BgqK1VAMLGYts0GOqUBV1kBn8%2Bnp3ufhCw%2By6WnDvEvnCvO%2F1OxqsVAwpGKTSq%2B1rssKxoFhFTtkFzovtP0FT7WMAFiI9R4APEgnKPe7rdvkJV%2FtAbGgPZEiWcMq%2FRIWrRol4rojimsZFXctijkQk0QQOC6tNPpa7SVXa5eXq9yLyzFcg%2Bh1kHsWJVG%2FUSOIopQpWOo%2BOnZXeWubvHAw590wV5Z2vx4rGhNOYt29LSDq4Vn&X-Amz-Signature=3eea629cdd0a477fdb1ee1cca3b426006bdf4475a237c6c5762abd3351fc8efd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

