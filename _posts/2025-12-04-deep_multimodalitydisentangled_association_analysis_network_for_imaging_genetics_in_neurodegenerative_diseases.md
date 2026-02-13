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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTS36RS4%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T112104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJIMEYCIQC%2FtPnoBS522hACLbCWSsvTp%2BH64AFtFhwM%2BXQ4vEDQZwIhAP9FDLX%2FvEiAxcEIXLu6iJD%2FxCcaFGNTC%2BCNw3t07JR9KogECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxsBljA0nzJeAIEFrUq3AMl0pizVgdIDB4uebrIb%2Fle0GxLdnhezlq9vPr%2FF7vLdWhEkSxkz4BvavAQ6azemMDWpQEL4mhHSrYaOol3U%2BToHmArQ3MAweYKQ%2FI1qjUrB9ZnIK0pJE64J1NVXK3a8Ik%2FyvxtJ3Zyecv%2Bd0tqTM%2BqMLDhVULPBXOQP92I3Xpm%2FgeympaUyuGRjGl3He1y02BqQB8SUSjNI4MY4S682q%2FifJjAtojGz6H0M6dOfjhhxzR32jRWtg5ZlgkGRAPgNBKZIH4Dbm6rfDELyXcgAsRm0a%2FyEFw%2Bvtgc4yv6gbCS2f0W6GApOcs6ww5u7yp1MK0s4rg2WPuUVND7wZbml1tDlwP6Sp7j60x%2BKoPivu5jipyaxd%2FXdxHkkzyd%2B5bXow0ztgbyoRvRm3eLnGTGKoLNIbvz3sfF5pIkm%2B4VsiNzLndB0yfPdRdzDrRBPvxcuceGXMaTIztXQRSXzGnFJsfRVsDCdc6ICJfYTtfD%2FZJEWPnhai%2BmpSe7IKSkfNyddDHpKlX3%2Fp%2BcGrYP%2BposJb%2FUT77Cz4ZiJcJY5ekQMZ60akl3r11PBjRFVHsVjGWhbuRDxsjkf%2FWx7B4FlXEKkjsdFviFEBCOaCT4qZd4%2BlqnTHdtqv6kQBS7tmMY3TC5h7zMBjqkAf6Y2BIBvSJQ969hPoZt622ST%2BvUhC1vVX9aBVg4L1%2FJuaUMnacTbSXWNBKyzWDQoX1h5KLIRStkJCs6vnBMFAbDmS%2ByzhMbPd9kTjnnzAHRF3Da%2BWpwrFqS0Kno9yaAK4Wv0qmRv4Oph9WruBaNHhVDWlIqGs3BuKkCAA%2BcuCOKeBGcIzsbB95QtjbCqYjceufMfft%2BxR9JbgvOIzWHt04jUJ03&X-Amz-Signature=3234bb76b48dae894332142ed8c8c0510c7b74425238b4c3ab032c639340e430&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTS36RS4%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T112104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJIMEYCIQC%2FtPnoBS522hACLbCWSsvTp%2BH64AFtFhwM%2BXQ4vEDQZwIhAP9FDLX%2FvEiAxcEIXLu6iJD%2FxCcaFGNTC%2BCNw3t07JR9KogECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxsBljA0nzJeAIEFrUq3AMl0pizVgdIDB4uebrIb%2Fle0GxLdnhezlq9vPr%2FF7vLdWhEkSxkz4BvavAQ6azemMDWpQEL4mhHSrYaOol3U%2BToHmArQ3MAweYKQ%2FI1qjUrB9ZnIK0pJE64J1NVXK3a8Ik%2FyvxtJ3Zyecv%2Bd0tqTM%2BqMLDhVULPBXOQP92I3Xpm%2FgeympaUyuGRjGl3He1y02BqQB8SUSjNI4MY4S682q%2FifJjAtojGz6H0M6dOfjhhxzR32jRWtg5ZlgkGRAPgNBKZIH4Dbm6rfDELyXcgAsRm0a%2FyEFw%2Bvtgc4yv6gbCS2f0W6GApOcs6ww5u7yp1MK0s4rg2WPuUVND7wZbml1tDlwP6Sp7j60x%2BKoPivu5jipyaxd%2FXdxHkkzyd%2B5bXow0ztgbyoRvRm3eLnGTGKoLNIbvz3sfF5pIkm%2B4VsiNzLndB0yfPdRdzDrRBPvxcuceGXMaTIztXQRSXzGnFJsfRVsDCdc6ICJfYTtfD%2FZJEWPnhai%2BmpSe7IKSkfNyddDHpKlX3%2Fp%2BcGrYP%2BposJb%2FUT77Cz4ZiJcJY5ekQMZ60akl3r11PBjRFVHsVjGWhbuRDxsjkf%2FWx7B4FlXEKkjsdFviFEBCOaCT4qZd4%2BlqnTHdtqv6kQBS7tmMY3TC5h7zMBjqkAf6Y2BIBvSJQ969hPoZt622ST%2BvUhC1vVX9aBVg4L1%2FJuaUMnacTbSXWNBKyzWDQoX1h5KLIRStkJCs6vnBMFAbDmS%2ByzhMbPd9kTjnnzAHRF3Da%2BWpwrFqS0Kno9yaAK4Wv0qmRv4Oph9WruBaNHhVDWlIqGs3BuKkCAA%2BcuCOKeBGcIzsbB95QtjbCqYjceufMfft%2BxR9JbgvOIzWHt04jUJ03&X-Amz-Signature=3234bb76b48dae894332142ed8c8c0510c7b74425238b4c3ab032c639340e430&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X643OLGD%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T112104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJGMEQCICmH8wCfX0YJsXgDRpoZsQRb5d6m1wQJ9igxdse2%2FU50AiBgKVXgtTiYQXGh2IzhEH6nQu%2FW8Ag42TtpSKCDWKGWoiqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMxgZRGucGomCNYzDYKtwDFNJGH%2FeQiQxuVv2TX5BUBRXhvVfDrXgwxq6LLoak%2Fi9VQAOUIdFNtvjkCkaoQp%2BGFFC1JFzwItahEtjY%2BT49%2ByXQLrBOWp5iXYH%2FhYMg279MBL39JItVPaRu6yEGMlzRdVS59zZdoq6wC1rT%2BQyKJv0e5gKv6KgE3bC%2FOS4x1bZ%2FQUgJi8FSrCpZhxfkTeeTaU2CxBJFPX12g6bPNaKfcsBm7PfxjRuk9pXg8BCmmFQ7%2FW1j6Be5vpHYUS3lyZLgUQUnapfkNyD%2F1K4uKhPRvXEqj3f5ObUTyh401sV8F7PXns0qACuY%2F6P1lQJ%2BagWNwD0FSlpPRlh1Lfisp%2FkDT0ifsXll1mv6m7YCPpubjCwjrZb4ZfjnpfXuep0BwXZBzBBQY%2BtIc8j5pptvLHzA%2BkkQ05yaEXqHMqVxCLY6Nlues%2FC%2BGkPFSChsmY4qMBqrh1GggLKPpdcQGhdOKVlej9EXxR%2BPNkRNUi%2BCIio4EzCt1jhB2U2AWSnP%2FeuzSU8RvXvKZcKfw9XQ%2BNBJhhsZhB9TCfGq6Sfo5KmUwhAb4bomroixfR9zWzDOqvoU6vGJHtKBOgt6GhEWfZauaXLHAS7PuyvIUVbso40hmRkj5nSi%2BUyISGOhx%2BdAlFIw2oi8zAY6pgGyp9jFKzTUPLPGL%2FhuzjxjSIrC7FXuFAelkFBb734Yq1QhKSJp4H9T028wllRi8IdkOpe8MACMUULeaK3pLcpmRAGcAbtABKf6t9y0zdXSDLkMKWYcVJDDxEi0FGbNaTk8djD%2BM5Rw%2FcBYtKNjrzkx%2B4RX1iy9Zv1cMN1UlocBUhqeas9WgdXzrj42IWAjbzNcZSqtt%2FVF9N3HhX9Ig1eslEi83CwG&X-Amz-Signature=19acf4d805547d113ed852b7820936c0fd8c9d8009dff304f572da1fe2ade8e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBMKJT4L%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T112106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIAJyQybxd8IoEEH%2BFRrV2debzAHK5oP8TDzxrlLMhgQsAiEAp2Lj9sfgqk9EgflPi308jD%2B4%2FjpeD7bpKookbIr7o7wqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI1rI%2BFY7tHJwImn7CrcA5cWMNABtUolfd5v4mP84I0VGaTdftTo0XvdZi4p9b8hfnC7UbQ8IltoOIACoc0SBjPfiQdBIWhQyLnoIu92gIkWu9wti0hS2fgR1jowrCM%2FxzUYJ4G4tr19R8%2B3TbZj49ykt5Hujcyf32A8lVp19qQ42MrcqTqbVlGYdufcmSUzwCYevO87lCw4xb43AoDnJHzX5HY%2B92tY1O1S5QuZiMurjnfGqxpffgZxpmznfQxvcvY9iYh9SPAIWuuLsCOg5p1oZxf8fkV4Ge0p30nrkCk2Nz%2BfhEOOhe6GEIhKIYIZeHLYFf3ZB0bRTfojETUeA1qDGN7yTSge1gxyeQA1U1kcAsBWU97WoagDDfRF47WB2kr4Z0jFqijGocUeb4d0WuwwjakaMr6246TsYYWc1zTREwWWNDelxF1rfPDWV3JPQOWZ8grSibl6HnjMRgSRcf6%2FRBSVCMWLz8eirkvxxfgr%2BUwLc2bN%2FiyvFCHNiEoiIeun%2FN6fiOX2mqAQAjNKFoviTTKfMyQn%2B5GxklO8qycUUNw982AI8QD6r03Y%2BJ4g4P1R%2Bz4yZQwnclIiTYtGWOo2tRWXLx6CAr0cq9KWIo7JPshNTJ1d0JzvzUFaE8GacO8rwdB4Kt%2BD0W5KMM6HvMwGOqUBanm6vntF9%2FoZZN8iDUwWqjQiy6%2FpWpKvLBB6Ci8HB6Miq%2BMlqK5eRzxfg7e4GF3iwpVwV%2FPxP6q2y31w3y%2BpKu08BK8i23KxTeord8qVOt0Xgrqh%2BWSlgllNoZ69aP6EXsWFrRHFV%2Fqz%2FpeARKyWkBRoL2FlbSiEItq%2FsvW4dsWpLH2WsLNtIzKWa9LWsL%2F6lYGlGLSbZbGfeLBVtW2JT0spl98%2B&X-Amz-Signature=5de685ba55c96290782716c99309c49570921a63d2697d19a671dcd8988f38f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBMKJT4L%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T112106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIAJyQybxd8IoEEH%2BFRrV2debzAHK5oP8TDzxrlLMhgQsAiEAp2Lj9sfgqk9EgflPi308jD%2B4%2FjpeD7bpKookbIr7o7wqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI1rI%2BFY7tHJwImn7CrcA5cWMNABtUolfd5v4mP84I0VGaTdftTo0XvdZi4p9b8hfnC7UbQ8IltoOIACoc0SBjPfiQdBIWhQyLnoIu92gIkWu9wti0hS2fgR1jowrCM%2FxzUYJ4G4tr19R8%2B3TbZj49ykt5Hujcyf32A8lVp19qQ42MrcqTqbVlGYdufcmSUzwCYevO87lCw4xb43AoDnJHzX5HY%2B92tY1O1S5QuZiMurjnfGqxpffgZxpmznfQxvcvY9iYh9SPAIWuuLsCOg5p1oZxf8fkV4Ge0p30nrkCk2Nz%2BfhEOOhe6GEIhKIYIZeHLYFf3ZB0bRTfojETUeA1qDGN7yTSge1gxyeQA1U1kcAsBWU97WoagDDfRF47WB2kr4Z0jFqijGocUeb4d0WuwwjakaMr6246TsYYWc1zTREwWWNDelxF1rfPDWV3JPQOWZ8grSibl6HnjMRgSRcf6%2FRBSVCMWLz8eirkvxxfgr%2BUwLc2bN%2FiyvFCHNiEoiIeun%2FN6fiOX2mqAQAjNKFoviTTKfMyQn%2B5GxklO8qycUUNw982AI8QD6r03Y%2BJ4g4P1R%2Bz4yZQwnclIiTYtGWOo2tRWXLx6CAr0cq9KWIo7JPshNTJ1d0JzvzUFaE8GacO8rwdB4Kt%2BD0W5KMM6HvMwGOqUBanm6vntF9%2FoZZN8iDUwWqjQiy6%2FpWpKvLBB6Ci8HB6Miq%2BMlqK5eRzxfg7e4GF3iwpVwV%2FPxP6q2y31w3y%2BpKu08BK8i23KxTeord8qVOt0Xgrqh%2BWSlgllNoZ69aP6EXsWFrRHFV%2Fqz%2FpeARKyWkBRoL2FlbSiEItq%2FsvW4dsWpLH2WsLNtIzKWa9LWsL%2F6lYGlGLSbZbGfeLBVtW2JT0spl98%2B&X-Amz-Signature=16727ff8cad44805b7f99307ddbbc332a552bdc576460b5f15e020f72394ebfe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MNVYHZS%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T112107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJGMEQCIFMOCKw8av%2FuuWgOsVjQ1FdJ4XPSxN1mrI%2BiQNNHkiBiAiA8SlGp4TlIB0ZjQWj5MkjBhin7Y%2BrExlcZg05VNt45syqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMMS52p1QmiQQ8FVggKtwDI4IT1Bl7%2BxT%2F4VMm%2BsnECb8NtjBJel4p%2F8bFHOso%2BZnPgEtgezITU7xfjH%2FcT3P7PJVHQVPeoG4COh2cS4mrljLa701hS0upmZotiDCMigt8HzGvrcyLY4Ub6Gn8886vmcfw5oRZe57Az70j2CD0Rh6pcTeAFGmz%2FrNgFdQbsSc%2B3wzlYC%2FdtC3sSF52lz91yROteANbscn6XtioWc3qifVsIlx56itiY4XStylv7i2RdX9O%2Bp1dKQkfoIlkrjS8LkoJpt%2Fu7fulqg%2BXX%2Fn0zRx9q7ufVda1xQGVUSd%2BYcW4KWuYQKvb%2Fh9ngt4BwrlkPUvoUvJVQZpSL3LPVC%2FXgYVf1IqPe9BOeT9gOe5K9H7hlgoHT3fl0sTEcmWeKKwZD%2Bt31RPykjWiNvjAIYZt1tGhgFeQogwbpKRPSlzxep0%2FYOOdkjYFp26s6%2FXn7yWTLAEzTT4KO%2FZuuL7MzNICZz2uomoPIGu35roi5ov%2BgjpohfPdGQg2JEdlFjD3ySgnsZXvZhlDAbheifo80ViUOXhWKMIgmGzxPiMT1RezRdIJqvbMiwCgByjr8VYFn4lZEchXG2uCNjSknzn1vjGc9FyrVZTWQrs5%2BsPkFBCTDabImAA2JVPFFEPBghQwtIe8zAY6pgFkgDHLma0bT83TnDWBd%2FwGFxIf97f4Rs8%2Bnu7eUhm7%2BDiTwCphOWCjJ5JCeGGHSJnGo9iAwT%2FnLryXp0mxQf0YF5SKt3641mn7UwJeAU%2F1o7IJVaeehPd%2BLUP%2B7c0ofAVzK5WxacVueM%2BKZ%2B8BvtZQngNHWpq1GKTHcD7svjZBijIR8yFKsORn0%2Fdb6qw8wFLrbQzE8riRUQsjDHslHU%2Bf7zCXdoBV&X-Amz-Signature=a87f23fd2d1c934b414ebb66ed1405d1fb2979c99f7347eac6520621fb6c0dec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466743P5GFE%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T112107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQC7H%2B4aX8qAP4296SZQ%2BKt%2FVr4o0L8XdOfEbPGWjN1sRQIgM%2FpyXSToZhIlCKzLsHcC9fR55mWPv8bWWHoyvqUP%2BhEqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB07EclKg%2FnEPOyKuircA8hoK%2BOaiURhjmg1Na5I6pRXj9cnmLulj5FL0NVs821G2z%2F5dVY%2B%2B%2FT6jDxzaT36veNemuHx02fVTjvzj76JTAapOtTsCzWinPzTb49VFk1Ee5J37Is4%2FNxGJoAC34QvALHNEslDl9Oe5nId3JbOPjZKh0Or0mDqzQpsIKvLatEC%2BlbRdnCk3XFxMECJwisSbOdQttcp2zOikzyu33PYUPVw8R1hqWUBK5ctjK9cG9tNQvQjr5F39GF%2BeFdgPFihkU0fzH6GwuXysmEyP7pCgiTDtykFKCDOakjPfjffbao8gtSTJA1N1rsyJ%2FSEt9mCmkdXY5snyd4F%2BOYfzJyEkTO408LAqlsGx73qkfcRTkLxmgbkzrCp9HskB8RKtsZTb1gxdtvJxsp5xnju7G4oJTmKBINJRD1YrMJTptG92He3TA%2FkDFfsvcaIkHArthFueQcgKleH5toHhuww1n8QevEZ%2FyblZh8yPFmb6yKRq1OhUPF31NOZbhk8m%2FBitwnR0Mqb%2BaTE%2BELvdQdcyDV0uqlK%2FzDYOI1fiGGLZklKOto%2FIZ%2BINhc7WG3V%2FWOKMsSKkAWLAX1tu7XY1dbzIPeJuwWbohIpZDel0%2BQhKIApSrGSGtLaoaE16kEGkvngMNqHvMwGOqUBIzW4iz9q1V4b9yVSCC3rXtmP8FMixFlxIp7fitdWcDuEU9SmNJLZlc6vSbtnEFrNtBd91kr1ivFC0reY1WKKfMjmijJBSOGIdyIFEgWidV%2BXLHB3iPFT9DeCeXiVN1wxLLR1hx7wwB2EYIANkMZdkiQTMD1snNmBHH44BJpjoi2X47WPulLz5ZmL%2F4iIA9nx8uR6RymtHfGFjGb33FEbat5yTcvq&X-Amz-Signature=6d8d3c1dc2723135e8e2dd4e8073e3137cbb21b84f0c485cfd5597962adc3b42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ORFE2ID%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T112108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJIMEYCIQDbi5yzFaI77QZplsoLT%2BYNy6mWiXZaAKxvG16zd5I%2BQAIhAOSvUcLgZUa9WbvtAQRrG6eqf49vEe2xP06vMHPcudZdKogECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw2kXzcpXNn1mH7lYcq3APbxGhfk1NaG2hXh8pdmwNYeYkYSiKM%2FEHH5rGdQp1B8Vacj8MfaVrjrlMH5o28MziUtVEDyZiERS%2F7GnughxDN7UnY7soTQda9cVwNMtFZdRNE%2BluNtINxZmoK57eSUww7zKR1IaBUTQno6A6aloo%2BA0QxEx3h3%2FIsAu5P6Woep2jNI0UWVkzldeOYWaAF25t5MyPj4cFCelcNzKD3vVTqw8T7opwBfdKtc0fiUyca6Sa0M%2Bail7dZFAea73HMF3d2EX%2F%2F1yaYQCjHCteqbAzdr4W0OV8ACn0i6T57mCUinFxIShQ0wwqdThqDjC%2F5KRf%2FeR9Cob1t4qHMMnoXY3drus4iG4i%2FvZGyMGfr0kesU6juQBniLRT4hYgAZxB5SkY5ZKjutKRLwzjLcdnDyA6nwCMiClezcfgTdLtyJgXvDjoliqZyX2ftFKCjuIWOREeEXYmRLE1BElhCG0W2H2MuDeHHyTb0jmK2NFLwEad6AROL9xMIOW31yaAval%2BxA7lhdsR8NNVSQV9aiZ%2F5GDX4Cp2n%2FF6SOHZw3vGSJRRjy44HvLL9%2FMt%2FHRVA3nMKJ%2Bd6gP%2BGc5bObbb2neByLa62cXE67bC%2Bp0LRq3v923%2BM2DJryVFcX1yIDT5A9jDLh7zMBjqkAYtZB7yEOgi73DvGgGtggfGec0895B4qSR45rLNLDGQAuEem4ChqL%2BBlIass9Cysp7475uC8vN70SJwMEFhFcA1AvRbH9udGanQRFswgFNYMKnyCuIjYs3DzCtS2Z1hbFqeyCJS39aNO0tGh1N3OYWCxvXXoECHqr4AGA%2BnWGGoc99pt7MehjNWQCOnQqpWBOFrMzESoq%2B4HkZDTuYDyI%2BugxsRI&X-Amz-Signature=93079c0e3272ec1c9d19452397d14c4f37eeace58bb0b85a1bb15a1ed99cef98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2JBYJWI%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T112109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIG9MfpSTngS8JGcFRrK8o0Ee8uTxaHm%2B7BQFrAr8xGz4AiEA%2FcnJpXV3IMhM%2F8JGiVZuKRj9Hgsc8wg3Du%2BmPLwFoGwqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFby3QZDPKC7Ys6pfCrcA6aYdAOd1O5gBy6DQO4YM20rmeqoSNwPS1vYlpRgexWIBQYEb8PGo090tqVhpWkdufPB15qT7LwtxbEDHptZeAGlPTQjIltgnC0%2Fw5r35OIoezX2FD2mZ8qoS8cG4IbRFYL9a3R1H0tfsKHNMyl%2BxrXoOoJxJqkI6BTsfgUde5esljAKhH0XSkhG1%2BK%2Byadne9%2Bw7feCk8eCkBz2AKzlaIe4TemXqIc93nRMLsC0AfjMpbHZLsi8Ked5dm43NeaukJAIYmPGtFDE%2FrhJpVhzP4JWUiOw8d9i4Y%2Br0NF2zAddWFPt95V%2BNi%2Bg2VAxqQmNZYFqrVnO6LzaImUrQloNJMonZyfQX%2F3sFDWSNVyluebUVW8EWRiczFmaQGzw%2BGGFphxHFURBzLIE6hqE0jNGrrgSYlH0LjiYQQLo8J2RnjRx1QAk4phmkw4LOBYoW76MP4NMdxm%2F5rPVXlC11ceCKcyuoz%2Fw9whAlRar3lXlyCh9yYy1jTo0D%2BXSAY0C25lzJKYH1mscz1Ye9wN2BJZnNzebBI2j20pUNlaDL7m0pdVg%2BAvHH0OI8qnB%2FAWzB0SOyJX7pJMbsKGhCMs0XOB8m5GCXg2t3D5NScPHG25wQn%2Fvwb64Wftquh4HFtBCMPiHvMwGOqUBNY1AHkAf6WS0QU2wYWNBLjX4PZqOCMrbLn0TSw0qBKkr4GizBON8OX622aAv6FdoPvOMM5CnhPqVvryLcjU%2BUUFpwYvFFpRiAEjIBERb%2FOEdx%2BHmRfhwGz8YioENULDnMoOnH9LF%2FnMQUNpGWJDPhoTjC6RbAiklmETDqQ%2B2LSLJVfjIhdnEUh0s3xKX9%2Bln3IR0b%2Brnb2kugxsSupA14Vr5zKc0&X-Amz-Signature=fbec9df832d6ad718ebd31710dd416435e29437821ceb15d5f7b10a17c365dd8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2JBYJWI%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T112109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIG9MfpSTngS8JGcFRrK8o0Ee8uTxaHm%2B7BQFrAr8xGz4AiEA%2FcnJpXV3IMhM%2F8JGiVZuKRj9Hgsc8wg3Du%2BmPLwFoGwqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFby3QZDPKC7Ys6pfCrcA6aYdAOd1O5gBy6DQO4YM20rmeqoSNwPS1vYlpRgexWIBQYEb8PGo090tqVhpWkdufPB15qT7LwtxbEDHptZeAGlPTQjIltgnC0%2Fw5r35OIoezX2FD2mZ8qoS8cG4IbRFYL9a3R1H0tfsKHNMyl%2BxrXoOoJxJqkI6BTsfgUde5esljAKhH0XSkhG1%2BK%2Byadne9%2Bw7feCk8eCkBz2AKzlaIe4TemXqIc93nRMLsC0AfjMpbHZLsi8Ked5dm43NeaukJAIYmPGtFDE%2FrhJpVhzP4JWUiOw8d9i4Y%2Br0NF2zAddWFPt95V%2BNi%2Bg2VAxqQmNZYFqrVnO6LzaImUrQloNJMonZyfQX%2F3sFDWSNVyluebUVW8EWRiczFmaQGzw%2BGGFphxHFURBzLIE6hqE0jNGrrgSYlH0LjiYQQLo8J2RnjRx1QAk4phmkw4LOBYoW76MP4NMdxm%2F5rPVXlC11ceCKcyuoz%2Fw9whAlRar3lXlyCh9yYy1jTo0D%2BXSAY0C25lzJKYH1mscz1Ye9wN2BJZnNzebBI2j20pUNlaDL7m0pdVg%2BAvHH0OI8qnB%2FAWzB0SOyJX7pJMbsKGhCMs0XOB8m5GCXg2t3D5NScPHG25wQn%2Fvwb64Wftquh4HFtBCMPiHvMwGOqUBNY1AHkAf6WS0QU2wYWNBLjX4PZqOCMrbLn0TSw0qBKkr4GizBON8OX622aAv6FdoPvOMM5CnhPqVvryLcjU%2BUUFpwYvFFpRiAEjIBERb%2FOEdx%2BHmRfhwGz8YioENULDnMoOnH9LF%2FnMQUNpGWJDPhoTjC6RbAiklmETDqQ%2B2LSLJVfjIhdnEUh0s3xKX9%2Bln3IR0b%2Brnb2kugxsSupA14Vr5zKc0&X-Amz-Signature=a6c1336f8b4610d7308d251f6b0360b3d70a626ffd088f8c366d594d9bd09e68&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YFV6IPQN%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T112101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQDK0mQ8sKUuwV%2B0M5tPU66kytEAErCKs8U4Eo%2FG4s2r4wIgYFH%2FK77udRU9AmJ1jjSEb0N3c6c1wLFSLRz1reWBu3sqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKH9gLRA6oPmzlGNQircA0QlOw5O9K7qxamBlFn%2FIElG1iEVbBHn9bkmzanbL4puH3vmugaspYtMu7HCxtr6VkQZfjyshAxi%2BgbTGZ%2BoAG7nNxdoEtMWkZ3B2UWPqAtWb1S%2BqaDWXaOr0G%2FHFRTc1lQycSWXCr12TjXyFvkhSfA1ITCbzn55BTToRVfEZdYWsa%2FfqbcIPZs9WOxXfSOrMwZc6WR7bDpgkc55b6zKPt66LENXZamP9Pp6%2F2hCD7J65VGMudteOHgnEiJioKod3YEvac6lDNpE37Qyp0CXOnBm%2FjSN3RqdYhtEe5vwMnWZnP2YUUndQvXjtUMVMFaZxxbF0OXnsDlEur3020jDQoUyGxxTBBeZDkOPchRI1iegWsMGtM%2Fnpzgutnv0FkkU46lbXHMupezwPhkpO%2BHpYh4luIlOlBFLkbIZ5IpZDgytOhUAmYMOWL7%2BtHhkmCW%2FUUf%2B5BRGF69EE90%2BX1qqmlAsmxSSzKKS0blh1y6he9otQo6fevvEOb4lP196zoXysfPE857nUslUvUG1EDYiJLIHH9aszFRzh%2FfLEMiDH78ZGke8zyP0o0rIr5HYgxJEiB1yt6OvghigxzL%2FUQ6JQ%2BdIqJkwNdBuWVV1fYxnetqVUJYgPrH1FUHgUqXhMLSHvMwGOqUBQ7UNOpQy37aHdU14JKH%2B0aw2lUvW9s%2BRDD5bKn9w77wtC9qHUh4Z2Y2QPMYomrOhYo1FGT4MIPguyEbbeX9%2FKhjsq%2Bg%2B%2BsoEFiwi05RTIBkIgBWNMIUWsfCzxr4DYL65ivjX5CmWfh3OL1hob4i7Qt0Q3U0RdDVRq4jkh%2Ba9%2FsY3wFmHHAnSwcaRyxfJG9TIG8Xs20OcJRlPgmHVV4I7KGLaoIIz&X-Amz-Signature=9bd7efeedd37a60c2a6f4f396247acd20777ea45af8fded47b82002fa047b2d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U72PNWSR%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T112112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJGMEQCIEzPB%2FnUdnPjSE6DEgai5sdeuSdKzVELmLpBuJH%2FJhgXAiATk9GPxwkdAHp0V%2B5qEjaG1HJUmUUNZQv9NK3YxgAA%2FiqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMIapE5S3QeXuhonSUKtwDXAdiqSgnRq5FPIsklfQ8aknDhbMWCQRsOmwHwoBbLvUueCcTKvDzpj67G%2F2mzW1I5qNqaRAQ%2BIRYufWyBmRWkpO1rer5NkWrZQdFR%2FulFIu8%2BhKA9iPNKJNNE0A0z9dKi5N9L%2FFu24OZwTmrVJ3ty9y9emJj%2F1gzPnIS9Sw%2F5xoYOv4j6d1Cu1va%2B%2FK1wFBYKHpS829otHyT%2Bx0r04WB0sJdNkHwWnvmEcFK1gjXRg2bgMKX%2FUt%2Fd51xNFj5cFvFRIniAZu6AFDSJii5Xa%2FM1O7Nb5vELlHrPSqyq6Xo5kuELJb2JXR00ClkhDF2l7qnl%2Bkg4keNYKuxWDKqIQQwnH2u8FSqYjYjMW8unsDYbWbLWVtQSgji%2BDOj9op3ylW5GeI%2B1G2AyKxPb5hhrLs3uLdBmEYXmteT6mhx5DQ9VRtjWXgo72itnnLxOrhg75NJHnHpz8HbKEPiJCunEb%2FYQeuEh9HAuMebmvX52sptGDQ4kkGNJVctfMAkRBKWmbLDi4gaJVr9HOHjnFIgr9OPb5s2Ni4wBBV16E1XhCEf18B%2FClQB12VEKhdkNkRdE2qyYIUASzQEjPZdLgfHVoeskAB7HAG5yUV6ON0U9H4KEeTEpHPQ%2FS3rBNEUSgAw14e8zAY6pgG%2B0GSeNJIpSdYrSXJ%2BNpjANPO9UamU9jQgFR8wFCyKEd5ANwogtK4nj2Q%2FQzcx4R5GL5oDkbg4YHAXST2vTsYblzWT8ejOgdIqmyr5ydUaRWeSOGetQTIAzVfxZgU2HHPPzrkJRxJqlKrTctxiBsd2H5QVpFsu21NGDurp6mVlWpctHZLE3%2Fhm%2FP2tc7cmYzAtK1UZPJRUDjmXzUEyGSwO2E5p077D&X-Amz-Signature=c4141481d9488fb84870614259ac0d687b8538e0013f74f9c1d17738fc88e68c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U72PNWSR%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T112112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJGMEQCIEzPB%2FnUdnPjSE6DEgai5sdeuSdKzVELmLpBuJH%2FJhgXAiATk9GPxwkdAHp0V%2B5qEjaG1HJUmUUNZQv9NK3YxgAA%2FiqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMIapE5S3QeXuhonSUKtwDXAdiqSgnRq5FPIsklfQ8aknDhbMWCQRsOmwHwoBbLvUueCcTKvDzpj67G%2F2mzW1I5qNqaRAQ%2BIRYufWyBmRWkpO1rer5NkWrZQdFR%2FulFIu8%2BhKA9iPNKJNNE0A0z9dKi5N9L%2FFu24OZwTmrVJ3ty9y9emJj%2F1gzPnIS9Sw%2F5xoYOv4j6d1Cu1va%2B%2FK1wFBYKHpS829otHyT%2Bx0r04WB0sJdNkHwWnvmEcFK1gjXRg2bgMKX%2FUt%2Fd51xNFj5cFvFRIniAZu6AFDSJii5Xa%2FM1O7Nb5vELlHrPSqyq6Xo5kuELJb2JXR00ClkhDF2l7qnl%2Bkg4keNYKuxWDKqIQQwnH2u8FSqYjYjMW8unsDYbWbLWVtQSgji%2BDOj9op3ylW5GeI%2B1G2AyKxPb5hhrLs3uLdBmEYXmteT6mhx5DQ9VRtjWXgo72itnnLxOrhg75NJHnHpz8HbKEPiJCunEb%2FYQeuEh9HAuMebmvX52sptGDQ4kkGNJVctfMAkRBKWmbLDi4gaJVr9HOHjnFIgr9OPb5s2Ni4wBBV16E1XhCEf18B%2FClQB12VEKhdkNkRdE2qyYIUASzQEjPZdLgfHVoeskAB7HAG5yUV6ON0U9H4KEeTEpHPQ%2FS3rBNEUSgAw14e8zAY6pgG%2B0GSeNJIpSdYrSXJ%2BNpjANPO9UamU9jQgFR8wFCyKEd5ANwogtK4nj2Q%2FQzcx4R5GL5oDkbg4YHAXST2vTsYblzWT8ejOgdIqmyr5ydUaRWeSOGetQTIAzVfxZgU2HHPPzrkJRxJqlKrTctxiBsd2H5QVpFsu21NGDurp6mVlWpctHZLE3%2Fhm%2FP2tc7cmYzAtK1UZPJRUDjmXzUEyGSwO2E5p077D&X-Amz-Signature=c4141481d9488fb84870614259ac0d687b8538e0013f74f9c1d17738fc88e68c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663BRKFCB3%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T112112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQD5XuhvyTGvphhQS%2BQU2OHM2fO4faaCEG%2BWTi3bnEMfsgIgKDifve2MMi6Qekc6m1%2B004M3IczgmkhjTDT%2FvsU74XEqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJrnpz%2B76HGoN0MdECrcA1e3QuO1%2B%2Fa%2BV70Z9lam8GYJb%2BbKfyt1F%2B6UtNwGOIFzuYd%2FRnVfGS8zxNnNQ%2FG71I3aBmNzm5Q3SguD%2FZyEqnOJiClfFSA118EJqrclHOLJ8NuPKv1Pwgk8h3ExO4J40Wg2Hy0crG0KzuN4LdylfKeYDIFkDDXRpNVhPgUvO17YiJrABrqMp5Oc06BocvR9SZzLss7%2FAtm9Nj9zjiLVRDkZzhq06WRSanepAPwIYDCH8bn8JyeNrpexBSA2KglBa7hWBghX5iddrbeGZK7pFT3uXCBP7TF9nBcf0XeaRu0XUW3orYdd5oXiXFPhhQZ%2B6%2FpVrC94ejzUGok%2FtG862IInBPtPvMjV%2BgZmtUYQZTERzJ%2BQdhLaVz51wvmuoN3OKY3mej7kY6Sn5LbmShNyo8lMmMHzPjjpbI0tWg6iGUUp0PPxLX2ZYJV4CNIX%2FfidiKOHKJRmMZbiiIev%2FRXukSWJFEEjkOhQco%2BU1LHH1%2B7pIiujcSj%2FbDxKRjM1oSMMKraRWERXN8ixolED4lo%2Fg2i%2FhfkXAIyZQLeR8Odr%2BCsdX5bCdQ4JC2841DUUtstRwZqXHfKY5uPCVWhXH%2FyTE6RVfnEm%2FFqt2s%2BWydImii2dEJ6AKDmtxdIIkg6RMJmIvMwGOqUBIG%2BXsj6%2FDSU5ql8QJIXhZ%2B2uQMVsr3t%2FrHZFx7YokxUxfBDwA3XPBwD5ZcOqPedMlsOFvHx%2BxOSAUSGRGRzpgd%2FzodbQaVKoonD%2FICWAp7eBZmWz5FiXLbBgiBccA7ajF3id3zEki4E7bhVbo1eYUKxzhb2v3hGGguDD%2BSPh7Es7iAKCCbuZlC34kVJmollo1dsnjCxuiPVs0IMGGMsZBJSCByuV&X-Amz-Signature=3d2f527f18cb1413a97f8348e74e2e08373cdb3cca2fd0ca8adb46ed4743a7d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

