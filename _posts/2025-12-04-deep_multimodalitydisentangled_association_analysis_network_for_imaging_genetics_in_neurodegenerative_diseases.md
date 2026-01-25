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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3XX5AMD%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T140112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIByp7ZVZDUXN6618txGDV7060%2BR%2Bl2MDXMusdpl64EJxAiEA7yH3i298gFH%2FbGclIPkxkeWFKQy%2BVJJ9VgJwmk%2BopQUq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDA5NqllwaTkTcPnujyrcA6GkblznFShgZNBn9YoWbt8NCreXZRw%2FkD%2BVLS8iVA21qxltROZL8FEYAK1l6MaNO9UowePBJp457YiR5vizJMCFp2CbjbTUlNSv7pmYo%2FhR29KwNpLlelEfcRR7%2FQTtUVnqSkouKzdEgge8yh6YVfXD6XNAW5gEQD0Mj9r%2FPOC1SKNoDoN57oyIlgbwTnSQVSKnqDw5aQfL%2BjTb8x73X65FHYJAdNjbilk5T%2FJa%2FZonsY9H8VDltlju%2FAdX6hY2rOammEA7WUgfbGF0zBSvigEjDITzTNIcLzOCpA%2B0JVikIVRozx7hsVURMBGzxOfBfOpV%2FJS3D6eH3Nzcq9uhDyGbmOHK%2BvYGU%2F4dnTc54M5OJ9tbLsEK9ct85F%2B8DN1q86urO%2BwCPpJJosXx6nhponN7SUqpfeH7%2B%2BmjM5r77xePI3VPkV4kByxa%2FYoYsOpCdesuIyVsVXv48IsxmIzkHth5nLnmLB0eW3650BaH829tMjnpA%2BMiRCfiJn10c3USGbQqHOiMdDwCUyvWvkPlEEBw3jTGYKL7f4yurPna4BRIOgQ2%2B1YzE7a2OtMEXdkGOKNTglrqDP6xDTocJ2oS58IOjN3bGEyrfzFKg7WYEEOf2X2qkQZ2OABplFdBMPHI18sGOqUBPDVzchomTeqSnE1oNhtE5Y3FyHuqUArlp8ub5pmfI1ymB9lCJc1LNnd50NhfUFeWxZMOsJUaXwKBGR1o0Z6wlBND%2Bki3z87vTMuqsDcRIQOinxIiLgdzTP5VC1ZC44CZtWshFrF8D6tN3b1qQNUw%2F2gtdqg7jDa27wvL5jtaWeihIMfCLu4xTinxpdB1Fvoex3dx6qoabd24T9ZeDvXjHJJpjryO&X-Amz-Signature=337277c64d617f06135e962e9b55ddbd14dd3a8db087b4b8a118e77950d1182e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3XX5AMD%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T140112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIByp7ZVZDUXN6618txGDV7060%2BR%2Bl2MDXMusdpl64EJxAiEA7yH3i298gFH%2FbGclIPkxkeWFKQy%2BVJJ9VgJwmk%2BopQUq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDA5NqllwaTkTcPnujyrcA6GkblznFShgZNBn9YoWbt8NCreXZRw%2FkD%2BVLS8iVA21qxltROZL8FEYAK1l6MaNO9UowePBJp457YiR5vizJMCFp2CbjbTUlNSv7pmYo%2FhR29KwNpLlelEfcRR7%2FQTtUVnqSkouKzdEgge8yh6YVfXD6XNAW5gEQD0Mj9r%2FPOC1SKNoDoN57oyIlgbwTnSQVSKnqDw5aQfL%2BjTb8x73X65FHYJAdNjbilk5T%2FJa%2FZonsY9H8VDltlju%2FAdX6hY2rOammEA7WUgfbGF0zBSvigEjDITzTNIcLzOCpA%2B0JVikIVRozx7hsVURMBGzxOfBfOpV%2FJS3D6eH3Nzcq9uhDyGbmOHK%2BvYGU%2F4dnTc54M5OJ9tbLsEK9ct85F%2B8DN1q86urO%2BwCPpJJosXx6nhponN7SUqpfeH7%2B%2BmjM5r77xePI3VPkV4kByxa%2FYoYsOpCdesuIyVsVXv48IsxmIzkHth5nLnmLB0eW3650BaH829tMjnpA%2BMiRCfiJn10c3USGbQqHOiMdDwCUyvWvkPlEEBw3jTGYKL7f4yurPna4BRIOgQ2%2B1YzE7a2OtMEXdkGOKNTglrqDP6xDTocJ2oS58IOjN3bGEyrfzFKg7WYEEOf2X2qkQZ2OABplFdBMPHI18sGOqUBPDVzchomTeqSnE1oNhtE5Y3FyHuqUArlp8ub5pmfI1ymB9lCJc1LNnd50NhfUFeWxZMOsJUaXwKBGR1o0Z6wlBND%2Bki3z87vTMuqsDcRIQOinxIiLgdzTP5VC1ZC44CZtWshFrF8D6tN3b1qQNUw%2F2gtdqg7jDa27wvL5jtaWeihIMfCLu4xTinxpdB1Fvoex3dx6qoabd24T9ZeDvXjHJJpjryO&X-Amz-Signature=337277c64d617f06135e962e9b55ddbd14dd3a8db087b4b8a118e77950d1182e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7R3I6GE%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T140112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIFJwPZ%2F6SSgdPvY%2B6MI%2B9vx7KS6OdHN38wt1bXmrqQ22AiA%2FpovmI97RvtRViSUBwyRtD7iEqGI8pJxNiHio5OuKwir%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMGz2hoB5X6ZEP1Dx7KtwDhGHIfR15QtOwZy29k%2F2nCYQf%2BoXEG5GxI42zvqgYnsAb6mA91%2B3pxk9qz14WZJqv1J9eNG%2F4Tkd05hVj3V4pJxT8FZ3%2BG0XP%2BUJ4DRlwNvvU9D65P3mRnmL56x0hKSUdJgZAVb1WgAV7Wxc6386i%2F0rL9%2FibY%2BaBIYHRPSulrkrP%2BRwNv8ciHdIKaXIsKuKOp8NQIbVtV9ZgoLFMz76AjfaA1YtCTUeXS0%2BJnox5OVvUwJclFoFFkzV8DQP1m6VwVtOgFyxdrSD4nFicw3mGxB2hPpqWPcoARM4t2igz6QYHl%2FcHUKQ9uPT4iCleabDTMBvYN6JH2b%2BwC6r7%2BXFYdXH%2BdCz8FOVOl22FnYWzsWXUlbAS3UzSMujqzCJOnInYQx9zV62qOxYenMEoRGwjliwe%2BQiqtjJGy%2BOfY4JHy8J6UCdWjskikYuNF6HPSTJkVvkoMLh8CJJAaKcVu2oHdavxU4I%2B9Y8KNWjrToD6upb3BtgcIp8c7BZwIcBPI5W0tRXw%2Fqda4KyRQ0Sy6L3UJYYcSPXcbAVUniR0Z%2Bjdvy1BMSVmGI0hybU0c%2F%2B5lokV15fb%2BFUmO2Abf5zFav0pYiomA3Zn32%2FkEzrBU7GokIW%2BjCt%2FBV7Fac4l%2FHYwi8nXywY6pgHkXQt%2BN8B0mpPquikcix2iXr1U8huKz3Wg212710Wx7JAmMdGyTs5S8%2BA%2BsVxXUn8ouxNYpJHFcI283Sge3tSNVwjhtuKhIgsJNVp2kTj7jFuTzBnSpqdGRO9AvGxp%2FNk%2FbENZXoMEZMyg7Bki0UC2vE01q9u9aFVc4wxCz7MuXHcuDk06q%2B2Q%2FbLJby%2FipcWJ%2FpR2UwhxHlCltkXYs7cSZECYVYG3&X-Amz-Signature=2649a884377a077dfaa745f554037b1a308e4d5d2e1b4a775b368436dd12093c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HGSEIYM%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T140115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCRVhhQOtdR2JM%2FnMojd6U31zs%2FXWtmDjh%2FqSoL152mpQIgPivcw7rHQvrZJtYdLZBqv%2FS6hI8BwwM6RFOea7yX%2FUsq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDIbAQ6M4B8YHn3%2BUHCrcA3QAxYiGgQG5DxVlAYpCTK8aSHWf0oOyv2jnTgT1L4pJjYVNDtK3uPyoAmpsPSWlWSKuhM0roxp1Xr8EBNSqc7MumSK0ydmF%2BWIVzl69ArqPLYONBZUv0NU6swKTJyWqCj9gZDQfgtqTbEERPKBuQfnr3lEfoLXXOhyV6nORYbrjQjbcnn%2B6tnBBtztYnarcstp9FHYHqJ9s%2ByLtUPsJUjlTJIuQ8acsPqssxKeL0E4BWnWGdwUdsynP4nGKv3U%2BrruvsJ0xs1usLu9d3bDeQDag4VUKqySxbAocRqTkcM6KK37q3ubK1WkRfe841rvr7gDfdvfNPaTcHcBBezZr%2BnXC4KD97vtmlLs%2FAVbyEP0g6nX%2Fm8VZvNyWBB5l8CBaUA%2FSufbHkJysdH5B6NY6qSKFnHGVOrDzvjl1JRN50V8jAgs2oatT0%2BjZ3wJkZGIHAH9P3bbOeTvp2c4pGNYF0inC5BXyL8CfjdaXxy219kjm4FsDZ8hCi9QDjAyQCbBSnuWi1swnlnqlPSIfpiajQv8oBBuKL0l1A8%2BJgjK7kYHYSDOX5xWwxPpc%2BAZLJDch89rTbXKIHIAwLVBc%2FES7npszR4Bkq2gCAiV1Mt5b1tT6AWk%2Fq6Y2ES4X10beMIrJ18sGOqUBE3nViWvizwbSLN0KPl68D4rZ2fhlZIRWT8o67JnEa9o2U9ko2M5lBzrqKhSZL2UtUrTSJD6LLYmZ6yga2VywLVAPmI8jxcZRHTsDaO0Ope9byXlN32DH2%2BcLGGcdpqxzGnvPheAyS7XOVQqKcTBAXGuNVvQ5s2bDSCnv1hHqJxDTz7%2BlD6BdpdXyq4FIfDt1e2oSI2Q1WtucPWd%2BX9MwYaJDRrkV&X-Amz-Signature=43385f0d01ff26b9a481c7d84f58879af18e7c991cc3c04ce2a861d260b66552&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HGSEIYM%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T140115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCRVhhQOtdR2JM%2FnMojd6U31zs%2FXWtmDjh%2FqSoL152mpQIgPivcw7rHQvrZJtYdLZBqv%2FS6hI8BwwM6RFOea7yX%2FUsq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDIbAQ6M4B8YHn3%2BUHCrcA3QAxYiGgQG5DxVlAYpCTK8aSHWf0oOyv2jnTgT1L4pJjYVNDtK3uPyoAmpsPSWlWSKuhM0roxp1Xr8EBNSqc7MumSK0ydmF%2BWIVzl69ArqPLYONBZUv0NU6swKTJyWqCj9gZDQfgtqTbEERPKBuQfnr3lEfoLXXOhyV6nORYbrjQjbcnn%2B6tnBBtztYnarcstp9FHYHqJ9s%2ByLtUPsJUjlTJIuQ8acsPqssxKeL0E4BWnWGdwUdsynP4nGKv3U%2BrruvsJ0xs1usLu9d3bDeQDag4VUKqySxbAocRqTkcM6KK37q3ubK1WkRfe841rvr7gDfdvfNPaTcHcBBezZr%2BnXC4KD97vtmlLs%2FAVbyEP0g6nX%2Fm8VZvNyWBB5l8CBaUA%2FSufbHkJysdH5B6NY6qSKFnHGVOrDzvjl1JRN50V8jAgs2oatT0%2BjZ3wJkZGIHAH9P3bbOeTvp2c4pGNYF0inC5BXyL8CfjdaXxy219kjm4FsDZ8hCi9QDjAyQCbBSnuWi1swnlnqlPSIfpiajQv8oBBuKL0l1A8%2BJgjK7kYHYSDOX5xWwxPpc%2BAZLJDch89rTbXKIHIAwLVBc%2FES7npszR4Bkq2gCAiV1Mt5b1tT6AWk%2Fq6Y2ES4X10beMIrJ18sGOqUBE3nViWvizwbSLN0KPl68D4rZ2fhlZIRWT8o67JnEa9o2U9ko2M5lBzrqKhSZL2UtUrTSJD6LLYmZ6yga2VywLVAPmI8jxcZRHTsDaO0Ope9byXlN32DH2%2BcLGGcdpqxzGnvPheAyS7XOVQqKcTBAXGuNVvQ5s2bDSCnv1hHqJxDTz7%2BlD6BdpdXyq4FIfDt1e2oSI2Q1WtucPWd%2BX9MwYaJDRrkV&X-Amz-Signature=84baa96406bca7609e31992201b88b4d424ff76404cea5c5bf6a387220c2f52d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664TYIVVT4%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T140115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQDUTJISa9SUtH5XTdwiOe8sZmMeiYtgHJhPo6Rs%2FEM8cwIhALQ5n7ltDCh%2BGMoJDQQDOcP86hgSanA5GxmjIYphUI1%2BKv8DCCMQABoMNjM3NDIzMTgzODA1IgzSK7t1WhdRq%2Fjksf0q3AO8%2FesoBJo3xtO%2Fa9XzcGlymahuCfvrp%2FuZK5zXiyjF1mlKOueYSrHAtCTRVdjlpLx3zzAqHvoiiRujYsVvpQdcmfc2qJm%2BvWGE0g%2BHrNmURsJbP7IZ3YzCC3U8%2F7aInxyBUR2YqZ5qpKsywqW6VvDCZ4afJDRsGK%2BIAB8JPA0yE9llOouG5ja8VJprza6xKo9mwHRGNFI3oWmfXTaSTQrbwWqD%2Bl67aAEzyj9fQUHLaTB4pmNRY%2B6DZUr1dcTjpkXm1QuQGVhvsB6NDJlLbtIUc%2F9Y6YNwUOXfMpOKJwIJm36WAqn9rfVqeJaMVL3Bpw5sJZYvZJ0PbvaHbBeqDoT02P0Jrbd9lYIclpC7ov%2Bn5J7E2xyBbeTs1lKf0ojmtLdT1WlT2AefqzySsclq200CSGZNuL%2Fk2cP%2FOoBqXbK%2BbSsjaPcPeN6waEU6u4uX7IoW9J3RRXcMGI9E6IeM6HIxWqkifLJxvbf37YeDbeKzYrl5k6%2F7xxuHeCsNUt39IZslQtz6dtGFEZX%2By7z76YMlqrw5gxvjqpnm04fFf6R2VGM7j3rCTbsPMqG1ITUCIIr8UOtqHZ%2Bg%2FEfhDDimvlCno5xVC6GT11iIFAzu1xEmEIR2qcdyVH8QYqnqqjDeyNfLBjqkAQCP5ik%2FkuMELFjlqPeadGWXVyqOQxP16tPtHc0DnZ1Ge0hvuR%2F1U0mT66MW7O85kz8bHJrZOam6eMG1%2Bq5Io1ifO0f4uz1tS6nKDgfgQ92YmFzg1hLR29GosGTai6aSVCIJUphNUeo%2Bo9E2HsU2tfwYQIux2qjWxr4S%2FhMR4sBqO8M2Na6vrPbGxs3RkUWQDzsfnlpxll0mpx5dnUO5unZMDg2W&X-Amz-Signature=d68567633916bf75a5380b856b1327d5e561a4f29f2c70ef130ca474586769ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S75ARNIQ%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T140115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIH%2BUmXpyP9TS8HX6QZc0MgWZlTmn4KJnVbw5gurCrQlHAiEAs%2Fy4lI1cXRPIsqD96Nb0tmVZzUeIQFo5NUiA6dchDIEq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDEpmF%2BtobfgdbM6cvyrcA%2FmNsULtY4GMt2i6PGXKua55oeJE9A2gHAE9z5hfBb07xWBXnLc4RuJPkoRzVnfg%2B3c1sXsuZ%2Fuw5Hjvn4DIFlWCm7zZgZ3uBTY12wocgXO3YJVemmh%2FoX1hGgl%2FCb3oKHdvOdlzY7kUfwfzby88NadPwsGhpd3lc1e3WNr37jSZ8U%2BeYXa9lKkG5N3esY6ER2MjObMsQJvkycjaJ8t2ANx%2B1I8hd6UXsEtkRqU5w72nWXCgZBEYt%2BPHm3IzdyCvH%2BcuSWU9fnEOtrFINhQ%2Fj3TSJwC6TmOE7YvzdiKi%2BopQvGXrV2q9Jr0pa9rKepdRIIM68jbw6pq%2FLB4suREIvRi0G7i87KPXVBoOvJwipwSE90etIZ1OeeEortYlCzKIM5EtrnLAPeKADybOgxWuxGQegmXpvEEOFkouJvjhsa3m47M3eIzVvmwv%2BnB1ML9OFiTB588SjjVgnom96CcHVlTKDANMnrPNqTQYVAwi4ulT23llcgGYQ2zP%2BhJFQcQxFAb%2BAQe0aFSO8tTRqa8%2BG70iS0UCVRQbZhTdKQVu29aVkElFrReLvrqsXiqQlYuty2YDUjE6M1Xt1OBwi1wPXEUvbFzQFl4q4OZuJUc9EG68geRjRdVvH2VjSabSMJDJ18sGOqUB7sX1CtuBbGlbF64KZjRzZCwHcKasbHDVUN8zzE%2FzK%2FYURkV5RU241Rkrfc8Q%2BKcJpToWnU4M2mPUVPXF4KU%2BpjlzFFdwxVL6ZJmsrmzm%2BrtNuSg2qw0mXeuiV7OJYti80zEKiTPHCF%2BQkkNnztEVe7GMfBWNKZotU9ZIEOifSav%2FQdyCFRU9pD5K1UYaQ2Ab1q9O3CKc%2FO6%2B%2F3ydp7f%2BmAr9rINH&X-Amz-Signature=fbdcba770064605d611465fbb9d8fb27097d8f4b49c9940a8fe8fc26227529be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XI6J7GCA%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T140117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCdnMqyR4Wh3UTsi%2F%2BgE7Sl4N6RUPgBLnlxAtVjm4BWnAIgK5QWC62xehbTcrw1Pjj690CeIhIHJCls%2BnsaAN6ASlUq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDAUx7AC5n17SMW5lLSrcA881h%2FEJLMTdjfN5ASCO9lObwickpnud2LrDKOx0kSKnhPDSP2ud%2BMwJivJFFreAgCyOL7tOcbCVxmEF4a7%2FYPsTzIL9D1dyyCF2pQK2Ap2ZOFTY2gESA2eTXxu9JKhQFrGh%2FgQ0k34%2BJGWApTbNafocc%2FhUbbSDA%2BIj5ciQoRBBw7tWJ3b5DzvcfVeHxC%2BSXQkCG6Wh3m6CcSb1YiAPRH%2F%2Ba%2F1Uw0zkxY%2BuKYq1L2XEPHe7leYHYPKGbO6rMsN35AaNcYlmQyw1iyrKmfRjyWuhmkSBlqM0my4Wdsjq7nUFYpVMX7%2F7GhnWxmhfspOCMefO1pylAGnK2MbBh%2BhdVTL962jerrE%2BVeRTFVbWTeUmUmolpr%2B2jnbooiXMtQFVpNfrfSFxeV78gDetHau3feFG7qQdPXaxHu9EkQBHe1BrkfkfZ23PET2QkcEkxrNO9AHzpvv5Aw9yEgUX2YG1g%2BgfuFiPmjOuibOfvgj72LJjGA5Z2I5LZQIAhHychhEszyPnGvC8SLSAkGEghKD%2FonNl1rlPNKvBCXCHrCK5GBNZjaDWD1h38J3geezSqD%2BvwGWBJyPyFviMoWcipHJK%2BqFVsTGRFUmtcOZ66%2BfLQv8BR%2F7LR4DcYdgfZaJUML3J18sGOqUBE12DmnsgRrLLW5gNrZhehcEu5fZrXxjSQm1PcCaTg0YSiCKm8hjB%2F7hX8c8JN0R7pbHhKYtnLEBOefLxUI8dcwFhQI6UDU%2BKIp8YmjgXT0%2Fcm3StukWmo7y9QK6HDUBPymIONN%2BROkHfi%2BXMi0hUEZuNFtaUDlZjTFL%2FgbBqKwZWBT7AxWYUdkc935NUmoY9DXoBI5XupnWDzv5OPNAyrDJVV01J&X-Amz-Signature=bbec78240b230c7dae85845032542c9c4eb04c0627e8f1b84e945f99eeb3fac3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WW5FMVBK%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T140120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIGVjql7%2FIHY4QUzWDqBkyhL7lhV4fFRLh7dKiPxE56H6AiAtPE6XDoovsdiMPiy2MZ6brgXuc%2BiwlPmyH8DtGmaYgCr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMQK%2FucEWHP%2BnkL6O7KtwDmZ8cPZ9rsCzqf3uzQ2LTdNDOpNiNU7BJjynz95bAKISH4sJYnYoepp4mL6lDEAWKyFCU%2BSu3Dd1BncGxFgmL0CJprp8tjQCo%2FMeIuwVuturO6D1Zv9NgOz3BG2eZrYqPopj8OXxsVnLFYlevWlJbYHN5cm4fZcHBQzL8XT9Qew0EGaE%2BERJE40DdGVkYPGSweOl6umv6QWO6Nlu03O71j0I9ZRjRynNi%2Bi6070TsCbf4Lw0waDqAtE7AqYPgRGGHwLocuQf9TPUJo7%2Byt81w%2FDslxjYBYommy94FkkKixjDX64Uack4rxFjH%2B%2Biyx5YDsEskRSpZhNsupmIvUP13Nnv5qpc5sQJiaR0jqUuMm6toBX0U7ROHx5pFAVYNx6h59NAMS3ndGb6PO3OeZOSkvYDibbH%2FzMNtk7kNaIELLZ88ZUNKKLptSSwnQW34VrEQNf3U%2Fs9q%2Fy1VvndPEJrnqCkLYOCodMIoOOmDJV9vi8L%2Bt%2BJiEwTN42%2BEJKZRxLBA3x0p9L5b1hps0zs0qbbIQILW%2FpptkvxJuzxwEpSpiKOeX%2Fc1Mkno%2BcFogX4P1E24CLTi5CYB%2BFvYhdsboVTpeJ3BoGlqdBC7X0IhmuuJ7Mf8LaICmBPMYZPL9XEw8MjXywY6pgH2AYq2XekYzRhR%2B3FCTPLap8pobdL8O7uxad11AOw7YI%2F8cuTSKlRyE24qORAFr5YvTyBFm0mWI6F68R1uJ%2FC94h%2Fp2JSMq15xBDchqI%2Bmk4jzJQsYh2PWzFfv%2FoGJ56X4ghu0gy7GwuDdSHZQzpe6zgOXosqvR428jVtj%2B%2Bja9m9fyNFlYx7qoIbkWvtTTNGTxiPaKuFa04FnoT3HhcFeGs7sHnjy&X-Amz-Signature=c1de9596bfe74fdc45fdae697199d1b16e721ff7fc81d92066bfac04a6eb32cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WW5FMVBK%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T140120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIGVjql7%2FIHY4QUzWDqBkyhL7lhV4fFRLh7dKiPxE56H6AiAtPE6XDoovsdiMPiy2MZ6brgXuc%2BiwlPmyH8DtGmaYgCr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMQK%2FucEWHP%2BnkL6O7KtwDmZ8cPZ9rsCzqf3uzQ2LTdNDOpNiNU7BJjynz95bAKISH4sJYnYoepp4mL6lDEAWKyFCU%2BSu3Dd1BncGxFgmL0CJprp8tjQCo%2FMeIuwVuturO6D1Zv9NgOz3BG2eZrYqPopj8OXxsVnLFYlevWlJbYHN5cm4fZcHBQzL8XT9Qew0EGaE%2BERJE40DdGVkYPGSweOl6umv6QWO6Nlu03O71j0I9ZRjRynNi%2Bi6070TsCbf4Lw0waDqAtE7AqYPgRGGHwLocuQf9TPUJo7%2Byt81w%2FDslxjYBYommy94FkkKixjDX64Uack4rxFjH%2B%2Biyx5YDsEskRSpZhNsupmIvUP13Nnv5qpc5sQJiaR0jqUuMm6toBX0U7ROHx5pFAVYNx6h59NAMS3ndGb6PO3OeZOSkvYDibbH%2FzMNtk7kNaIELLZ88ZUNKKLptSSwnQW34VrEQNf3U%2Fs9q%2Fy1VvndPEJrnqCkLYOCodMIoOOmDJV9vi8L%2Bt%2BJiEwTN42%2BEJKZRxLBA3x0p9L5b1hps0zs0qbbIQILW%2FpptkvxJuzxwEpSpiKOeX%2Fc1Mkno%2BcFogX4P1E24CLTi5CYB%2BFvYhdsboVTpeJ3BoGlqdBC7X0IhmuuJ7Mf8LaICmBPMYZPL9XEw8MjXywY6pgH2AYq2XekYzRhR%2B3FCTPLap8pobdL8O7uxad11AOw7YI%2F8cuTSKlRyE24qORAFr5YvTyBFm0mWI6F68R1uJ%2FC94h%2Fp2JSMq15xBDchqI%2Bmk4jzJQsYh2PWzFfv%2FoGJ56X4ghu0gy7GwuDdSHZQzpe6zgOXosqvR428jVtj%2B%2Bja9m9fyNFlYx7qoIbkWvtTTNGTxiPaKuFa04FnoT3HhcFeGs7sHnjy&X-Amz-Signature=7bae7a8c6a6bfef8f8eaefabbb093ea3a788af54adad2a3b963bf03550add1b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666QPTFA26%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T140108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIC%2B4RVgek4011fytqc4w0WsQbCX9mHHgjH9nAm8ss9AlAiARvRCED19x4jYzhIRPJD2Jb2Sf71Wpj%2BqFX4st%2BSMXsir%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMaACfchnczAQz28aOKtwD%2B%2FldRF%2BGA6Ne90zRQIrokYKmrgbBdzp5ohvC71HLI6k%2FNGu0ZOdhNcIOd%2F6v8aWXhiG5nULdNm8Dyj6yHtIei2o%2FwtQB%2FzEd1F5%2Fk57ADV6HxUVVdOXmqhZH1U8%2F%2BR4DF2zA50uu9KjtDlWypwwoDxTuP1pdKKSmK4S2aj8HIp5qChOoRpT%2BZTMV99PZdbK3DBciW0MwmxE6EE3dmOc%2BBzuu2SR6QXIi5VmaGeF%2FwxU%2FP6mBP87vRqnel0ENt8gSOrIke4Ll%2B9qS7B7cRQnt%2FaEDlnCR27xI%2FcWug2u8yePmbAgOPUtiU6ZF1WhLIXy40YmPrcwjBlWH66Z3Epr8rSdN3aLIWmxhIN8hLbDgMWOby8DNUs%2FI9IzRV%2F2n%2BigcoIPNNcTvLCB6Bs%2BdEcuIoN2mzvLO0P7Z2ilA%2Fn3SPyBAIsDQj5bpAmz%2BiEMWgi4wGuQ0Ro%2FpsKa0EwFgyVJ2XS3jPMkDPqdc8A7jMUyTYhESs%2BmB%2FWyrCY%2BofHPoV%2Fhg5Gm%2FlwaSLASfi7aoCay2YxzJsIF1e%2Fg1ZvMDvDVxj0yj8DmsurApAxD%2B2LLtTY3vQXEM3uwAKUHQ3Gzkpk4PzlmB6PMgSTAaP9wrCHE7q4eSrq5bsVbvOqL1FHswrMnXywY6pgFiykTNiqZtiYUg%2Fu1YcyTn9rwjJkoY4cDI1xCvdTXDhHupHHKn41qyDSgow2s%2FUUgizMBiI1lSeu3lCmYbpcWqZXfzq5xnkY%2FOkuNT0SjyXz77xr05094mpstX1g1xKIWU%2BF%2BG5VwZ52lXozYQJC5gJ5CX1aGeMCjH6pbg5xhbXoRvg%2B8ZBpMrxbuBkGC%2B6Izaz1kjnlq2vSpxe%2F6gedWeTvj3j8JS&X-Amz-Signature=10e971ad641a390989cff42081263e32898ba9c33ff96667f7af7bd623e3e414&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662A6B6SPL%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T140125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIEUvNDhZHDbizHencmTNlGNPjLGOW%2FXqjSnb21w7MTUvAiAqlAPxP2xcYfjQglr5aygNI1SVgvY3HOrsb0a1HBEzXCr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMewqaBW%2FXvtOxYeLFKtwDGvhiZdutjGJXn7Z%2Bj%2FcEAIAJD0d2uWUiiM5pIU8CiHS%2FblcBz0Vt11whX1LWNH576OQv%2BDmg5WrMPbUt8%2BuSx%2BtfsYsFQOKVX5aT9k9r58CaaJoKgXY7V6siGCIj%2BYekJ0LGgMX3oqmhVmVu16d0ikou3W5txaKFuXJb%2Fu1pHaoFq2BDGQx6jXiwYjYgrngjQxYX0In%2FiNQXaEo%2FU1gysZASIuBioMSWyXvPkhceQm97qXQWT9O06U%2BUrDnimlg5Y6%2BUMWHqxGbU4l7Iy90ZAfXZHgLgvChi0dYAyWAFlsmcf1q1hHWYANpkwX1PK0PZNTSGIaN%2BhFi3JykoIc4%2BepbM7grbpbZrsPvlg5%2FZ3%2FXVIFNArDTeHi4oitS5YUh0DcC9iT3XUCQc1Pmu8c5xJvXIj4hO9tgrPNPpJGa8EIq%2FskJdmCdh4yiRWWpgXof6veLGlNJ0KQnTLlC1TpFrFXKO5lLapA9TYheoLUJYVGoVSNK9CFKTix8gvExaVbbtvl0wWIngrjJKuNaFwEUu%2Bo2Yo1moRG%2F%2Bbt0%2FcFk4swWCK2pj54vQCwrz8Xbve%2BxjHI3OrXMXsuagFGbBTzM9F5VxcTprupDqNWShY%2Fs9n4C8VFOBsr%2BP%2B6YgM%2Fww8MjXywY6pgHlsPKYJPqgGyjt3KNj1AKfkXlPewP8VYfp72vOHGq0f%2BhmQYVq1jvsijCiQVnSAmubAloivO4D%2Bh76%2BD0WkWJflCNJYwv04dd1zpXnwXmtXYm2OsoScHdbRLtECHASs0Ya%2FUkzCIqsSh%2FyxmqEVDFwYbvVURuZmdb9UgDkIYlHTs6OQdXsG12DT0SM1%2BUa5o%2B6jHiFs35ysNs8sMrKv1uGDbupssQA&X-Amz-Signature=7f13dffa8335a8bb733b202a80385783a4adc3214d5233ef23a7f545a921bac6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662A6B6SPL%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T140125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIEUvNDhZHDbizHencmTNlGNPjLGOW%2FXqjSnb21w7MTUvAiAqlAPxP2xcYfjQglr5aygNI1SVgvY3HOrsb0a1HBEzXCr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMewqaBW%2FXvtOxYeLFKtwDGvhiZdutjGJXn7Z%2Bj%2FcEAIAJD0d2uWUiiM5pIU8CiHS%2FblcBz0Vt11whX1LWNH576OQv%2BDmg5WrMPbUt8%2BuSx%2BtfsYsFQOKVX5aT9k9r58CaaJoKgXY7V6siGCIj%2BYekJ0LGgMX3oqmhVmVu16d0ikou3W5txaKFuXJb%2Fu1pHaoFq2BDGQx6jXiwYjYgrngjQxYX0In%2FiNQXaEo%2FU1gysZASIuBioMSWyXvPkhceQm97qXQWT9O06U%2BUrDnimlg5Y6%2BUMWHqxGbU4l7Iy90ZAfXZHgLgvChi0dYAyWAFlsmcf1q1hHWYANpkwX1PK0PZNTSGIaN%2BhFi3JykoIc4%2BepbM7grbpbZrsPvlg5%2FZ3%2FXVIFNArDTeHi4oitS5YUh0DcC9iT3XUCQc1Pmu8c5xJvXIj4hO9tgrPNPpJGa8EIq%2FskJdmCdh4yiRWWpgXof6veLGlNJ0KQnTLlC1TpFrFXKO5lLapA9TYheoLUJYVGoVSNK9CFKTix8gvExaVbbtvl0wWIngrjJKuNaFwEUu%2Bo2Yo1moRG%2F%2Bbt0%2FcFk4swWCK2pj54vQCwrz8Xbve%2BxjHI3OrXMXsuagFGbBTzM9F5VxcTprupDqNWShY%2Fs9n4C8VFOBsr%2BP%2B6YgM%2Fww8MjXywY6pgHlsPKYJPqgGyjt3KNj1AKfkXlPewP8VYfp72vOHGq0f%2BhmQYVq1jvsijCiQVnSAmubAloivO4D%2Bh76%2BD0WkWJflCNJYwv04dd1zpXnwXmtXYm2OsoScHdbRLtECHASs0Ya%2FUkzCIqsSh%2FyxmqEVDFwYbvVURuZmdb9UgDkIYlHTs6OQdXsG12DT0SM1%2BUa5o%2B6jHiFs35ysNs8sMrKv1uGDbupssQA&X-Amz-Signature=7f13dffa8335a8bb733b202a80385783a4adc3214d5233ef23a7f545a921bac6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VTJROYA%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T140125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIH%2BQCvyE%2Fwy8efvJWRTMBs73VZDF9dD9b1yj2gOjkTmDAiAWCM18TFFdveUiJDGA6laqAybDTSPhEjIhwS9%2FYfcwBir%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMpbJSGVWsdYPwq33gKtwDKrSpe6X8c2PZIlPhVzlbJrrptE7KXaGZyaWG2%2F8Uw71kET9nk9rsq5WZevzZ4r7%2F%2FD77HJDBKlb745T85dk%2FxV2uunUhc%2BRuhp05hTfHWh%2FswO7rFjG9ftJai7F6m5YCtlBwXWyNxklSy69XHgP%2BD3nzA8RAFaCs0SDweULeEA6Du1P6gtUefHrtzACH3siegr1PEUll4QMWXmi%2FZjI2ApcUwYaklEHEyatTXDaPc0IPeJTVyg0I2pNoyrI4avgpPNKlpmEQXtYyRaom6pU0Qqn6MVyOidBHUlmi9DyRyQLxF7ecndrV96OZCil6s8h8SXTZICX2JVjtFJ49WvDmrRi%2Fxi0qQleA3vK4IVfobwR%2Br59f6Wi0cK33rimbynsqCTIpxwTQNXV8xQXEd7SC8o8S9gfCW3UjKnpTOg59YI%2Fdk9oC47GQy%2Fa86BWUVxsC9YppPBfE7rPR17HCZBrWZi1CNneaFoeOhyhKwXCwnN3ctWi3bM9hgVMmkLoW9Mj2a7mnNfvJY1NT3oiYPRHxyUzrudvL65gImQrcWdDXgbxjGvGt5LNwgWO1I95z9LFRiM77sQziyqDDYOK6jxh2h6wJrtH5nvh1SBoBEFppv7V7hdMhETe5lJFZHgkw28jXywY6pgHS49S6bzQMDZwmX%2Fsu2WGX8%2Fw5NEKfcKsszQmD1KYPBjDZWw3XUOWd1M7KL9zhELpZnlIl36%2FifD8h%2BLvQHOIABCMOOZP6F0Q1eyxDrcvGWKhWbw0HRBY7ACvRmKv%2FBNyjulnN%2FIz0mz0cbpArDLKFU3YwDYrzC%2F0xW%2FzZurCnXezYbmyZ7If2o0mudvdL8yFcqF43XF1dV4IBoQkdnMwycqnfq4pg&X-Amz-Signature=437f327c1ca3d9910bf3236e8df1cedf6a11fe9089a523e6b1e2678dfe391ae0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

