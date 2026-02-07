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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCBISALI%2F20260207%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260207T081524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCrmnI5oicpmMteoqswUbpihPxLzDgo1ebcCYDbyJKZAQIhAM2VTDGdxRP3JO%2B2yMxMG3pLaQeFEU04cQ2JiO0HRIiDKv8DCFkQABoMNjM3NDIzMTgzODA1IgwjP4TO0wbV7qZK3Csq3AOFyAdfJajqjmCRBVOzXoYPOjVdBeYxsZXOnrDda15fIqFPCTNrNKJvndHcbh%2B86aCW3TpsCi%2FDakgXSwmL0ttrts5Wt8gVl1SrzfC0zcwFlKnPWu6IYpeBalumfW%2BD0bHwCPx7lqAg8UuwOkeKOr3rd6J2JgYaLcmHljPSOd4Z9CEysB6DFm0%2FVtI456NP%2FQxmNoSnlTDEhssSSOY6t4fLruIyB5HuNqqvw8iYyzyOfO9XnKGaAqTp6GdSUSI0Ba2YMDczvLuxrQ8hi3%2Fd89AqfRERQFEVxg0HD4yyVfew1guK2pdQx2SpcMprmlMPQNvzXQQOCo094Y60t6lOPq9mTd9kInLO360WZ87gYPLbWPzDs1KwUKSRaWuV7I92ibfjzXS2JGL1em4EPGHpMhGEIJPiX%2FvsbJw8LkA0MYz%2FwdMblpGW9V3r6LOUE1UbNO2EYciUMO5C6RKqEX%2B8DwQV4NzDzEK92SiaIc148eth%2BCp7oYtWd49YDoDkLlhKj88iUq3NGTF6%2B8njmRlYVucv5fnTSTy1jjOfGlq9go5hUIKOxz0TEAbCEZ9mlDtjEvBK7jJlp2PiBcd%2B4SojErCepSMeZnS3XRcuJgonFQfev0CZXEKT2eTpikpT6TDL35vMBjqkAcdEwzompajPKNcJ6INFkW7bjpqhvER0Eh0B3e5jnrlaoRTpMrWROeuA2teOc4qy3yG9t8T3bP3WZ9Oq6z9KUGSZDMpOif8OBzzjaYRYon06lFDhIsiHNB4pQ6oBIBbC5VDJIC3qHnfyPYwvJORjE91%2FgAcSLVwZjIOV%2BFMp4YuX63xFZVH6NnEAFTfZ8mlMhhlM8sxwegfEK2njKnlBN70aH%2B0M&X-Amz-Signature=e6e2a528f41d15d54a290407a41979937b233e22f1d3b538132a247ca46d22e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCBISALI%2F20260207%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260207T081524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCrmnI5oicpmMteoqswUbpihPxLzDgo1ebcCYDbyJKZAQIhAM2VTDGdxRP3JO%2B2yMxMG3pLaQeFEU04cQ2JiO0HRIiDKv8DCFkQABoMNjM3NDIzMTgzODA1IgwjP4TO0wbV7qZK3Csq3AOFyAdfJajqjmCRBVOzXoYPOjVdBeYxsZXOnrDda15fIqFPCTNrNKJvndHcbh%2B86aCW3TpsCi%2FDakgXSwmL0ttrts5Wt8gVl1SrzfC0zcwFlKnPWu6IYpeBalumfW%2BD0bHwCPx7lqAg8UuwOkeKOr3rd6J2JgYaLcmHljPSOd4Z9CEysB6DFm0%2FVtI456NP%2FQxmNoSnlTDEhssSSOY6t4fLruIyB5HuNqqvw8iYyzyOfO9XnKGaAqTp6GdSUSI0Ba2YMDczvLuxrQ8hi3%2Fd89AqfRERQFEVxg0HD4yyVfew1guK2pdQx2SpcMprmlMPQNvzXQQOCo094Y60t6lOPq9mTd9kInLO360WZ87gYPLbWPzDs1KwUKSRaWuV7I92ibfjzXS2JGL1em4EPGHpMhGEIJPiX%2FvsbJw8LkA0MYz%2FwdMblpGW9V3r6LOUE1UbNO2EYciUMO5C6RKqEX%2B8DwQV4NzDzEK92SiaIc148eth%2BCp7oYtWd49YDoDkLlhKj88iUq3NGTF6%2B8njmRlYVucv5fnTSTy1jjOfGlq9go5hUIKOxz0TEAbCEZ9mlDtjEvBK7jJlp2PiBcd%2B4SojErCepSMeZnS3XRcuJgonFQfev0CZXEKT2eTpikpT6TDL35vMBjqkAcdEwzompajPKNcJ6INFkW7bjpqhvER0Eh0B3e5jnrlaoRTpMrWROeuA2teOc4qy3yG9t8T3bP3WZ9Oq6z9KUGSZDMpOif8OBzzjaYRYon06lFDhIsiHNB4pQ6oBIBbC5VDJIC3qHnfyPYwvJORjE91%2FgAcSLVwZjIOV%2BFMp4YuX63xFZVH6NnEAFTfZ8mlMhhlM8sxwegfEK2njKnlBN70aH%2B0M&X-Amz-Signature=e6e2a528f41d15d54a290407a41979937b233e22f1d3b538132a247ca46d22e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XT7THMA2%2F20260207%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260207T081524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDjvwcqMW%2FYYy%2Fk3IfrIK3QnuJbau5RQeNNdyJ31yFlKAIgZyxG%2BWig8XFWGvxvkzDslBySah3UMGIqSgDwJamEhQQq%2FwMIWRAAGgw2Mzc0MjMxODM4MDUiDLuhZODXdcUyLRZK3yrcA886GlYbjNWTyeBcWxkX5Wq6HJnI5OuAUW890hCJbMF8fJzEofo04pppijKC1pzwjpUGfIKcXUdNuCs8XZnOaKwox%2FiR24gX5MUaSwECaFyEB76wlSGdAlQDiUedMB0FnVVItFLCBJGMIuQRNFij1Mw4j3qr89k%2FucZlQ9%2BeItIsn3GxivZ%2F4Mq5n9QSxgTNgM1whG%2F4gacxmxtp7MVs7bWj1Q4ucBzcdMJnesLYL%2BRvrkN1ZNgPGqD7MtPpbr0kus9lIOIZlKGTmntSfsG1db3Z2CLDwzpfa3SauA%2BnDSDhM1qVwdsWetupCCPx7dGQlP5ZHtanYXirB0VTQ6vTMikLsqNwS%2FdM3zCmW4qPpEzBTv00bUHVxX4p2K623BzPPewHONpGMsYEuu0sj1vE%2BAP5HWUArzSLqXcCgQDA%2FZuRNeQgAlXQLpeoKr5CUxQCwqGAa3d56HNmRVXv%2BfHKQLKyUfuz4iV5tb%2FwSt9bPwhZ8m0WYc04UxeaJo2gEgXCKxZzEliiFha%2FvWj9jb1U8TmRZ69681fnkOxj8ykE6nKmB82oeI4abpL7gvGAsdxgeVO%2BIH3Tf8nwVBziTAODdtCuWu1KhmK9vCFN7UczOuPKBkcpoy%2F9vl5ATjzlMMHem8wGOqUBq2x2JHLUXuWpQ87n7C%2BFvq5iLxPMy5oH0m7CfWcMcCupy0zL1a1GNm0ndsyvSZ79WAeg3Egl65XQa%2B2Wtn4HbgZFY2%2FkOfVoKvn4aXeDzcSWLLT%2BS5GxHUifQQ14om5gffFagc2DDRwbuXwupsbKWkcO1NITRfIFiKFuDqBcsKGTLRyHPMKQfbjfuSA6V1bbhfiziXYDtMV9NH8%2F1m6FQXyyGYX8&X-Amz-Signature=5cfa82a486057ebda2457d2acc370ee82824d0f1ce5becf2152e76db31c297e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCHG76UO%2F20260207%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260207T081526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIATmOE7bjp83Sad8k%2BGsM7sTrysV7iMY67yCqZY0tflBAiEAu3KrF62flN%2F437XzLf2nwS08E%2FjkHfutEehftuukkSAq%2FwMIWRAAGgw2Mzc0MjMxODM4MDUiDA%2B5Q5dkPdM4oPrZkCrcA6xSuQvi36FchcetilhU9lN82QQOADoHYTtl2XxuPXvkOYfaotO0Z2cYzGOrybtWaIknVWhO0YymWP4NYM8TROUj3yYZf2raTYKlZ1TbUboIP23iAluvMH6t6xze6Wl9OUMkKhUnkyqHcmvB%2BsMdQjfpZW2HhguCCDf032VR%2FoEehae93fAr6XaakinpvL03Pbi791EWuo0cb%2Bur9aLFPy8MVP55TS5Il7BtutCAnbdtUWDXhau2pOfqnJ%2BHCyOeXNiETNN%2BGhAx6tqaNVP157DhM3BzTR1ZCiTOR9VfXgD3sLWuWDXiSUTpP74ONsSFqwHC3qi56PON22C3WwjWsdgsXSvxZWYb7vuyAuqXiyRLKkIkXEbDyp1rACuw%2FITJyrdiaqdJkvFVK8BbjGJlYQyJXs9yYvfXFpGIu6F1j2S4RyGGG3HUwiB%2FVqSNteASXRHq8vakfysCU%2FJ0leb7evPUlUpdCrw38VNCQJhaupHUBdB%2FQiD%2BVD2bTRm%2BODvqUDeVyu7PDUYQfJts7N6D9HuqlK%2FpzvqHaCsnlX%2BztNi5Gjgh0WesgnLITrmSIanm6%2BGd9c3B4o0Lj8H9U%2FCAexUNtjaQHt4q7h0c1U31h4wosyfQ2SKVP4p35lGbMJ3fm8wGOqUBWqhpsiJOAGAKpF%2BZwgu55slJUKtl3fhgaXj4MM%2BXAEL7o6dUdQ8K1qq%2FgMvvnTK%2FHbxCKxC%2FDlusNUETLx0lqKnoBb5hIGDiq1YtUJ6h%2B%2FmJlKSc4wphmlDo7lhBu%2B5sIXpDbTjz%2B9NUmRC3IOtQWCa9Zg4GqO30LDD1qY5dJaMTEimapaxPKdekiS5ywXE9rgk%2FIXl19i05TsBRq9Lzy5FG%2Bqim&X-Amz-Signature=ab590d08f362ff97723474adc5aa3aae923498ee0d5ccb4eeb319e47f4f75af6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCHG76UO%2F20260207%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260207T081526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIATmOE7bjp83Sad8k%2BGsM7sTrysV7iMY67yCqZY0tflBAiEAu3KrF62flN%2F437XzLf2nwS08E%2FjkHfutEehftuukkSAq%2FwMIWRAAGgw2Mzc0MjMxODM4MDUiDA%2B5Q5dkPdM4oPrZkCrcA6xSuQvi36FchcetilhU9lN82QQOADoHYTtl2XxuPXvkOYfaotO0Z2cYzGOrybtWaIknVWhO0YymWP4NYM8TROUj3yYZf2raTYKlZ1TbUboIP23iAluvMH6t6xze6Wl9OUMkKhUnkyqHcmvB%2BsMdQjfpZW2HhguCCDf032VR%2FoEehae93fAr6XaakinpvL03Pbi791EWuo0cb%2Bur9aLFPy8MVP55TS5Il7BtutCAnbdtUWDXhau2pOfqnJ%2BHCyOeXNiETNN%2BGhAx6tqaNVP157DhM3BzTR1ZCiTOR9VfXgD3sLWuWDXiSUTpP74ONsSFqwHC3qi56PON22C3WwjWsdgsXSvxZWYb7vuyAuqXiyRLKkIkXEbDyp1rACuw%2FITJyrdiaqdJkvFVK8BbjGJlYQyJXs9yYvfXFpGIu6F1j2S4RyGGG3HUwiB%2FVqSNteASXRHq8vakfysCU%2FJ0leb7evPUlUpdCrw38VNCQJhaupHUBdB%2FQiD%2BVD2bTRm%2BODvqUDeVyu7PDUYQfJts7N6D9HuqlK%2FpzvqHaCsnlX%2BztNi5Gjgh0WesgnLITrmSIanm6%2BGd9c3B4o0Lj8H9U%2FCAexUNtjaQHt4q7h0c1U31h4wosyfQ2SKVP4p35lGbMJ3fm8wGOqUBWqhpsiJOAGAKpF%2BZwgu55slJUKtl3fhgaXj4MM%2BXAEL7o6dUdQ8K1qq%2FgMvvnTK%2FHbxCKxC%2FDlusNUETLx0lqKnoBb5hIGDiq1YtUJ6h%2B%2FmJlKSc4wphmlDo7lhBu%2B5sIXpDbTjz%2B9NUmRC3IOtQWCa9Zg4GqO30LDD1qY5dJaMTEimapaxPKdekiS5ywXE9rgk%2FIXl19i05TsBRq9Lzy5FG%2Bqim&X-Amz-Signature=8e5e6229fe51f586fb1417b48d0b5fd7c44b9b33b7a6b45fd6c4607bc48827ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CELIKS6%2F20260207%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260207T081526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCp0Zk3IIestp67yMVOOWk6xohJQk5qVCnu8ulfYNpfMQIhAPGGDahPXtf5%2FdHi2ViQkFv9iF5akQSAceMuU4mI7jfUKv8DCFkQABoMNjM3NDIzMTgzODA1Igw4%2BGLwniFZGTkpCBAq3AOcwmyvN2bng5RO3%2BXzfagRz2BtExS1zii14FDHvVWh5RUap61yWZ9GyhToyH43JLNu3eqmsIDWX9AOFeySJXywpFqSiu35awA%2Bo6oa3Rmd%2Bcc5FsWclQjJqGysLdTo6bAqeZ%2F1tCLgZKi9MJ1MUEgUbQMXEKH9kSa1KgMKfx6%2B6k%2BcsEDurIjg9J3LoLpSnCWP7nifN79%2Fte5NEgWC7XklaIfEIT8nK09ppYC4jY7JHhjAEoFGD2DqVWVurY2cl7RJj%2FsBOrJ78aBfcdSXS%2FGIgqlInrdC0fn2oKDRPIKrD9IsOIwFFYGGJ0fYPMXPs4ta4C%2F4eB%2FtqfiSNo%2FQuwfkU86dq9zuO3lDzyQ9ko%2BVC8a5R07xAPiV8sUm6TPa9pyaOrHBH2BZ6jVFs96fYmv3hV3B6IoAJ1gLbq2baaL%2FjzrPfmduxYVVuXnQHAkmx4p%2BfEUYbXJK8WSQlR4Yi5IAmevV81DC9M2ybKxpDxPBT%2Bh8Dh4gIdvjjVstCpEKkquAogkUSmCp8L1gkfvpyi21T4u1XwwiWRr85MAKzWRgdN4y%2F3lZxuStt%2F9%2B8RoOefjtFa9anosQITp%2FfnSY2SM%2BuhEvV3rKLE4kyeSjdgJYQ9FZJ2TcWj5hmfeaRTCt3pvMBjqkAdxwNTLQ%2B5Gm7Bab4A1DrX%2FTReMEZ%2BM0cYkDwK%2FJtEhjKSuTYvg6i4PBSlcqOHaPBMxrFnppSUInlIHKCLJ05TFKgNSEfyu0GN2zQ814d49MsewzEWmZzSA9%2BabQh8sZKKlcdueu%2FqQvB0S3JympOOzaeqiLMDl89EkJJ4FyuRlOo8KP4d74Npv9Sjz6co8FQ1nbJce31gaNXSaTOtJdvhYLlS%2F1&X-Amz-Signature=4ca7e6db166f6ae46ab7f33d115489e072902a839bbc6ccc1a8697f061eba32c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSWW2DHZ%2F20260207%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260207T081526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCxUxkiKPK5IOOqGSHUxGK5SU7lDKvRTQNY%2BYtlq5Kh5QIhAJ44ObGVZQivtdOQBuv%2FdZSUm3X1BMTxzcqJeLOKdob7Kv8DCFkQABoMNjM3NDIzMTgzODA1IgzzYjKFC54mi3EbK3Uq3AMECMY3N7u2HKS%2Bqojr8leAW302lh7m9BZIjdQEAuIDrB%2FbFrIbGSCEuD6veFFXZd%2FzVKIE9a4nLM3M8x7Lpw6hbjg0fdWpIge6nLRYiABR%2B4j3TfXdAjIgJbqMO4t8gbdzlc3OTWi65Xo6XrvHLyldTJLugm1y22ffEIaWCd%2BWM2QIt4zbtpq32ve3Vy3KhLiEo02GFQX7ZTv1XDL9D7oXSGAT9wx31O8Pte2okKJtnejeoDMuWDsxDMsPFq9Km3dD9sgM6LAAJjkLfmg3pOlKxlyeMHpl4DQqgr2sCzybOBTa75%2Bi4a68ci6A6klcfV2SzNG62XdEc6%2BsV9ddKOekbFBexc4QRgcv%2FX7YHPaCydMNk0UAfYXyGnl5CmcwUsFH88S%2FYfvoJldL7R1x9sCEEBXVeP8fiPKXYCqxjkUAedJXVIl%2FNga2qnSuZdZRB6QtORyLDTfAsbhIvdk300m77BkbohuuGE4mE2BmXodfHxQ89F%2BQ9iA9KU83%2BDMuafFhb9ronPFZe0fj%2BfW627JHAZPL0u%2F73TK5rLcwKLi5Lj8j1d6Wr8jONJNmIpXOgqHOo%2FCd4b%2FoCs%2FVLLTD9V7ZvQToAATbI7k4Vjaw9IuBSfYeuzimyJ1MyL1CgDCj3pvMBjqkAV0YqHj5zrUjy%2BPgybJwoO21IWxsO6s3Ko0zm0djADgcMLJbZuouZwyJApLGDgbF%2FKEzUjzK3Dfz%2Bh2F0OYROZok9MfYljasZ0WdtwUX36fdBuFHMqAB9h%2B%2FTB%2FOOB9j6Bs2Xfc%2BZ4LcJRqEiYBpEPGgmiH4eiY3OGSBkWhHnEcgalS2ghRP41exqqskJZKzlmSvdmUPnn1gFb4f6vhkbHWZ2Mfh&X-Amz-Signature=12de677a050937986228edc3e3a88dfd18d5dae5ff804cd5687c3a3dc22b1c2b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WESZDEWS%2F20260207%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260207T081528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB9ZiFH%2F%2FVHPRDrc43yfkWT9%2FCTym%2Btp4oTR8d9WPNzZAiEA3EohLDVnZ5DDbLpsgXu8qfszibVqX1dI8dv2cVFuXJUq%2FwMIWRAAGgw2Mzc0MjMxODM4MDUiDHKrGdgDjHBVaCmoBircAyrtPr86FXiB02f1eg2BhfGlsQ6Mh6oM2%2FcmWclfYp%2FNQqk4cDDbjkXtPCY5NzrQ%2Fh4pE67%2FJ6p%2FDzqVYMiRWCXBgMAPYw4iecXPFNZy8tqgrKYdL%2BJCl1%2BSRhs9eLsWqr0JztJ1r9Jref%2FvzVUKDns4Y3SdrN0CFeAS9NuWtNzNNt5Yf5cuMpoUOHV5hYj9Du7nRa7u2Ww4dnor4QhPIRmua%2B091dZLQBzjJEU%2BfHVKKwwPooaCPR4eGzqsstrkTY1KuoLWxfQ43CZ0%2BJB7hdybsaaVq8yfLCfFEMP8xWAGvBnMg6U%2B8%2BaZegr4HsMdfcFbHfkizI07RbfFcS0Q9%2Bv1Q3PcS7bUXqeAI2tMrUkifvr2H5FzFxI3WJdLtu3F2Br3V17rLxvygc6shnnc9iThxVbl1YK4NKg72f2YOkRzvFEN9nWaQVzvnB3NX8L2Gcp417khGESo5J01LisDIgWnl4fygWIqDFQFpwfH%2Bif9VkcsTrOZZTxCtZm28gBR%2FsThSLPjojkspQYRP5lI8%2BVwcBKo8YcCxcpji6eak2hkBqdn91%2FPsHbvzYO5kqf6B5iRCNANpgLRuVeV3JuRGHMJSkndZLQjLoeLPy9e8d6SQ0WMe%2B%2BGVzz99uwgMNfem8wGOqUB1WI9inr6svznEhwboBDk5Ff4p1EWtqDZe7pG9VUvYneIBDKsKAa4SbPce8BrTYu%2FIlVCv6%2FmOGmY1KDOAcSRwLG2IB1Lty77X9nxwu0nNgv2M%2BsGt4T8Gzrqo3vYIITPEEMYT5pY29fGmtOzYgMg6AEb8fs3Y18QoaePKjNKLcTCG%2B4IWKd17NXBaPtPO%2B71WpjklMzKgnhuHgKQ8op4sOC%2Fe1pC&X-Amz-Signature=c132f00ea4ac6a8e8af07f0c5dec7ffbf9958f83a557434dccebefacdb88f74b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJ4RUDMV%2F20260207%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260207T081532Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDGvMreDOVwhtef37AUwGe7CJyuWE7BxGuWNJ2yQbDCFgIhAMoFrXoQ7TseFhyEYtz7vP%2B711JQdR17%2Bk9aOuLJafm9Kv8DCFkQABoMNjM3NDIzMTgzODA1IgxuYcvreY7YEYzwyskq3AOD5m%2Bvb8QqUmCAjOZCEBfVA2x9nyhtRw9WTgwsXMwqCz3FUg9c3cvkIiNhWRyAKbmti8DethVfBsNAwYEyr7rBQsZnTj7lSasG4DaZSjUYVbD%2FL1J6PaUasxvI1UDFX5yK1YBa6kFYG3soWPf5ZIGTlzVc2TBX5cpC14ecznoKy4zPMW0HhcZuoQ71yPTgMq9IihacN0ZrT2LV445thiBHn4uz3GDIxKSCaHbpu0gkoNkjPy1CVaVEbZbL3LIQQ0sbUfw%2BanA4B%2F6roC3La1zFJUQnc%2BmTt6UFR6ERDus31UNYff3ObPn4Zrf%2BxhMUXlaaz6Vu5gV1AxNTyK8qI2hLHU%2FKM%2FPZCsoNOMPbEbnqVaqa8v6n8R%2BWtbq8h8VyLHpArbp9HZZrItd5ORXJ7%2BUqT1fQZG9key0eec%2BTkiwJR1phUihPPWL5V0azo3i8hDpChUqwkS%2BQ3qM1Or0MBGtY6yLbTnbSRbgAJd28zUFi2SAVaaSK9I3s3QZYildN6HtdL5%2F0Wk0zx1k%2B19G1WvS62KXjUSAlqBjm%2FuswSxWday4NS273HvLQ8xZYeSriqpC9CnRgHpudCiHofBAm%2B9%2BH%2FipYkUvc4%2Fan2KJRPHnAAyfzBmbmf8VieO9GmjCR3pvMBjqkAT87EVCPx2IF2P9xBJJTq4DS%2FAuNzvsUVZWp%2B5ywdHiExl156%2FJOnNJqMWEB7Y%2FkwP%2FzmNX7oTTuLVVgdPNM3c0x92m1umWs%2BNDpbZ2DyX9h6B%2FjkrB7IkAnUpoqmA79%2BdOq3B6juzoTPhkY3SbxpVaZZ4p4%2B15hyRkd9ulahzULL%2BH%2B3qOhVwBuXf8PXzLSdvvIMDvtASCKEM8o6h3LaqVb4zwY&X-Amz-Signature=a175c205202e4b599286c1cb6c3feefb6568ebf89ce55d22dd885e7f526edacd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJ4RUDMV%2F20260207%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260207T081532Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDGvMreDOVwhtef37AUwGe7CJyuWE7BxGuWNJ2yQbDCFgIhAMoFrXoQ7TseFhyEYtz7vP%2B711JQdR17%2Bk9aOuLJafm9Kv8DCFkQABoMNjM3NDIzMTgzODA1IgxuYcvreY7YEYzwyskq3AOD5m%2Bvb8QqUmCAjOZCEBfVA2x9nyhtRw9WTgwsXMwqCz3FUg9c3cvkIiNhWRyAKbmti8DethVfBsNAwYEyr7rBQsZnTj7lSasG4DaZSjUYVbD%2FL1J6PaUasxvI1UDFX5yK1YBa6kFYG3soWPf5ZIGTlzVc2TBX5cpC14ecznoKy4zPMW0HhcZuoQ71yPTgMq9IihacN0ZrT2LV445thiBHn4uz3GDIxKSCaHbpu0gkoNkjPy1CVaVEbZbL3LIQQ0sbUfw%2BanA4B%2F6roC3La1zFJUQnc%2BmTt6UFR6ERDus31UNYff3ObPn4Zrf%2BxhMUXlaaz6Vu5gV1AxNTyK8qI2hLHU%2FKM%2FPZCsoNOMPbEbnqVaqa8v6n8R%2BWtbq8h8VyLHpArbp9HZZrItd5ORXJ7%2BUqT1fQZG9key0eec%2BTkiwJR1phUihPPWL5V0azo3i8hDpChUqwkS%2BQ3qM1Or0MBGtY6yLbTnbSRbgAJd28zUFi2SAVaaSK9I3s3QZYildN6HtdL5%2F0Wk0zx1k%2B19G1WvS62KXjUSAlqBjm%2FuswSxWday4NS273HvLQ8xZYeSriqpC9CnRgHpudCiHofBAm%2B9%2BH%2FipYkUvc4%2Fan2KJRPHnAAyfzBmbmf8VieO9GmjCR3pvMBjqkAT87EVCPx2IF2P9xBJJTq4DS%2FAuNzvsUVZWp%2B5ywdHiExl156%2FJOnNJqMWEB7Y%2FkwP%2FzmNX7oTTuLVVgdPNM3c0x92m1umWs%2BNDpbZ2DyX9h6B%2FjkrB7IkAnUpoqmA79%2BdOq3B6juzoTPhkY3SbxpVaZZ4p4%2B15hyRkd9ulahzULL%2BH%2B3qOhVwBuXf8PXzLSdvvIMDvtASCKEM8o6h3LaqVb4zwY&X-Amz-Signature=335d8362fe7c08293c024291a283b88dc45c1103c9b6f3b8e93ed886a9065f5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663Q2UGMDB%2F20260207%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260207T081522Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCIRn6JyjDuO%2FzR%2FwDaHDWqQ5wsQ5cP2SGi3YnPfCSjygIgZ411oR0bFStU6f%2BE%2Fn7lk%2F5CiLTUrUdP%2BVq9kpKA4MMq%2FwMIWRAAGgw2Mzc0MjMxODM4MDUiDC3SY1LTtZeBcPXlWCrcA7PJjq9QjbnITMxsQuy38B%2BBPy6hdPjXU5uI4yB19%2B0ycSIrnx99x9RPbHpG72RjIXtA%2FZlLR5Petiw1nIZchnBxAYxQnq5A617XJ%2F7V45HXNxMzOCPT0MhCzH4BfsHjmf8fWfeZ4fulKvjQktJXWh4AGfBnf40yc%2FCY2pYMjYMq7604uNtk6Y%2FNYfteb8XvKmLBU%2B9Yxj%2F%2BBmNBSspePOYuyTj%2FYuS4GejHKHD9kNJn1bgL1dJclha44qZl33BpU1TgWwA0W34yDQH2YhD7GiKexE6wZ9rhbncXaQMYfNB8rjCxJ2l%2BFIMdgZn02wijNRZQKKYLILo6A7%2B%2FqBT4bVpRg5RS4yW55QyXbb1Jnqi06mFJ0y1X1EuPMAex6otWxwkJ28AQLRCi4mbrb2bhTlfCAM1HEd9hNKpw3mau5z52gmgYV71qr%2BkypenZ3uCkbNAFM3y9KaekodV6gOdOyP0mCaYaDT1f9GgAysxLnivxRyjZod3R27Prw9YcqeCjVhMimuMPg0ChuGZs1nKpIlIRJeXfsRZvy03AHTm3q8WqtOMdOTXy6FbmT%2F0%2BrboYKWanSbGREcG0o3j%2BXq%2BNqd350%2FNZGVvzA%2BgH8ROTfnbbYqlhkLHF7g52CTpCMIffm8wGOqUBM6KvOZMCpJ%2FVo7%2BKSBMXrqZ9GFY%2BOzW2To90Lsz1LqYXZTOSPsEdc5eumJfrFayeM2JHYGwZZ3U5GABouPvKH%2BPc8AecJ6KUM2HqqousO%2BBVcEpu2yMwtEEWw0erRTZwIiz%2B3Ru%2FtPXiuVTIB23piKZMUd7DwptndO1xEJgSxm2Y%2FhfYh%2FWkIrNW1GgfZQwQ2bAGY%2F1YC%2BWor2em%2FU69P1ZB8Hfz&X-Amz-Signature=1428e8dbc4bd0b3a1c9c4a68cf95f42db43e428e511b52f583c2c4f35547bae6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQMAUKDQ%2F20260207%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260207T081535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCy4pv%2F%2BdGD2oJ6V%2FOwPLHaBg6q%2B8mdNO9hmFsPRMq57QIhAO6CY892289MR7vwAnfsR4Dh%2F%2FizY%2Brmxxi3077cRZ06Kv8DCFkQABoMNjM3NDIzMTgzODA1IgxRr3hcCB0K0FwK%2BWIq3ANwAw4akNNHlUm3c5rK34v1ExMWF%2FnJAPcb2sgAQwS6wq39R9EorrMiwCpMpF903wr8Vb5l2qWdq22MHk0t4LRManG0y03%2BHPZocZfNgRGBxYAH0zX9EQ4MxkyJGPx1ac3Xz%2F3ZSKvwwB8P4WgMuU%2B8MeML29Orz9Dng%2BNou4w%2FSpeWe41MHVUT3mXlYjLZ5v7%2B1mGFY2a8g6hL89mqIDDqe9swUBAWikBGysx4GExfJgmkWBpakvgraUWo14QzWh90uRE%2Bx1aiL2jKH1HSjeVnDtWB%2FOYHBul1A%2FE0xKr8P5FcKBgFO%2Bc1H2MCY5muc3iJ9dVkzNc6tfpeSxd2hR86uVSTh0dCPr0I56DOqb%2BzIWtCWMfPRzlHLQpuLvI4kTz5r%2FNiDxjvzbS54O2jdCOd25TSDaVZWmjN73IMVg%2FyXCgVU4Emm2ZfNxy%2Bn1juzYR4sle4ZLyMTTvS%2F5k7hD4D%2Bm2YVg1RHf8uGLr1lvSQoGvpx2WsSDYGcUV%2Ff7yPWcl1HwhVnGDU1HQYj91yG7J%2BgNN540uAxWwNrDuBZ2iLD6vFQbqOXn64r56PCZmjcBFZaxIafoE9xcmo4okY4kXoKUw%2FyNVhZH8IlPuhSeHIAVQRGG4Faw1Bw6q6IjCj3pvMBjqkAYtdM4MGUCL1C5vRvpr4Dx61Nb%2FZPnsRB9Duda0bzcGZv%2B60vroWT7CwthmzDC12ZgLv2npRVEK1qVy2wt5u592HiTJcwH%2FmumOA9vISbOddSujMx%2Fqsi4phzVzLqv7jwOWiaCLmKkBI68SMx4l2hJyXw9SI2Zw2NMhBe9%2BdtE2KgnzhPl%2FQkN3%2B7%2Bsn6iYFG%2FiL6%2Fr%2B09l6BNAfLa7SmWF8enLV&X-Amz-Signature=52089044a0383a42b7daa54433e8ef288c71bcd0554c0a82bbb4fe3c533ca489&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQMAUKDQ%2F20260207%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260207T081535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCy4pv%2F%2BdGD2oJ6V%2FOwPLHaBg6q%2B8mdNO9hmFsPRMq57QIhAO6CY892289MR7vwAnfsR4Dh%2F%2FizY%2Brmxxi3077cRZ06Kv8DCFkQABoMNjM3NDIzMTgzODA1IgxRr3hcCB0K0FwK%2BWIq3ANwAw4akNNHlUm3c5rK34v1ExMWF%2FnJAPcb2sgAQwS6wq39R9EorrMiwCpMpF903wr8Vb5l2qWdq22MHk0t4LRManG0y03%2BHPZocZfNgRGBxYAH0zX9EQ4MxkyJGPx1ac3Xz%2F3ZSKvwwB8P4WgMuU%2B8MeML29Orz9Dng%2BNou4w%2FSpeWe41MHVUT3mXlYjLZ5v7%2B1mGFY2a8g6hL89mqIDDqe9swUBAWikBGysx4GExfJgmkWBpakvgraUWo14QzWh90uRE%2Bx1aiL2jKH1HSjeVnDtWB%2FOYHBul1A%2FE0xKr8P5FcKBgFO%2Bc1H2MCY5muc3iJ9dVkzNc6tfpeSxd2hR86uVSTh0dCPr0I56DOqb%2BzIWtCWMfPRzlHLQpuLvI4kTz5r%2FNiDxjvzbS54O2jdCOd25TSDaVZWmjN73IMVg%2FyXCgVU4Emm2ZfNxy%2Bn1juzYR4sle4ZLyMTTvS%2F5k7hD4D%2Bm2YVg1RHf8uGLr1lvSQoGvpx2WsSDYGcUV%2Ff7yPWcl1HwhVnGDU1HQYj91yG7J%2BgNN540uAxWwNrDuBZ2iLD6vFQbqOXn64r56PCZmjcBFZaxIafoE9xcmo4okY4kXoKUw%2FyNVhZH8IlPuhSeHIAVQRGG4Faw1Bw6q6IjCj3pvMBjqkAYtdM4MGUCL1C5vRvpr4Dx61Nb%2FZPnsRB9Duda0bzcGZv%2B60vroWT7CwthmzDC12ZgLv2npRVEK1qVy2wt5u592HiTJcwH%2FmumOA9vISbOddSujMx%2Fqsi4phzVzLqv7jwOWiaCLmKkBI68SMx4l2hJyXw9SI2Zw2NMhBe9%2BdtE2KgnzhPl%2FQkN3%2B7%2Bsn6iYFG%2FiL6%2Fr%2B09l6BNAfLa7SmWF8enLV&X-Amz-Signature=52089044a0383a42b7daa54433e8ef288c71bcd0554c0a82bbb4fe3c533ca489&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TA7ZH2GR%2F20260207%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260207T081535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCXHgxvcXIk%2FvWU28qZt9U%2BfSlalW1qM4jLuhlGQyOoNQIhAJ9uh1dEY3GXnt%2BHIyvPH2wLGB9F6TMefmB0ImF9z3ppKv8DCFkQABoMNjM3NDIzMTgzODA1IgxXshN%2FZ%2FtDI31R1KUq3AMGNBoxonwtPAsXhSzoT1ef9%2BaP1HcsJ8%2BzpXdsyrCsCLG%2BAq5cS3kJdDMakiZiSJr9ZRvCQqmig8S30RWg5IWhYso9qB7MtidvB6T6hQ%2Faf0WImCPaDlriYypdpoTcvdKtT%2FxOXq%2B4pV0YLDEgw9xWuH%2FfBR%2BebNz%2BMN%2B%2BGG%2F4IBE0YfgvPe7c1ivL0SgL1YgKP70JP4C1VxtAvfN%2F742VnvlPCtA7Dx0F1LxNL2mxulW2LZC2oBxGs3F2f%2FNu4IHtrPGCAunB56oUAmY2ZI8XAzd86uE5ePPA5Saiif079Gg%2BtA%2F1wJ%2BV8PxLXs0zTW3OAjAfW6mG5kR%2BR4pCHBTGJ5H0qdlk%2BbyOqTcNZOlJFiYUM5nEj7HcKBUa%2BXEFOjPDm6aOs6hgVXzALiZduqGGJZnbXho01o3sjFoRbYn%2BlIcdITTatN7mdV%2BZ9VGXdEzADmrYanct0KTCteCcGIraTmMtoLUfLdo468yfb7MS4UIT0zByk0IJf9SUnv5rfS15BYz3QRTKi8IWFQz%2BwTfCcyhWN1eVgL%2Bf3fZgsZOUCi0phLFk%2BrU2DTbBOMTKP5wQs5Wu9BdUeftOjRubPTRhYq92dmHwu6j166sKJMVrohvP67o98I%2BdmGtt6zDN3pvMBjqkASZGBaaaVx0P1xvBCA%2Bf%2BKgFvYBa0gIL%2FogxCjk16Y99BZAmJkujipNOK60XQ3ZN2RhvkydGP2zC6tlOWYdnfGMFNAgdY%2BoxOse7MtJaCwAqqhpM2ILRY6sG50p4jHTRBRv3dRAVvTbqmfawaWrlbWO1oigAIsQeu6tpBfBdFOmrr%2B2LUs8Vvpfp8MQWtMdc0R5BOeScmtb444F61loqPqe%2B9cML&X-Amz-Signature=59596f651c8c76adc9ffe9379d730a5da881fa967ea0df87b430ee3ceabb132b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

