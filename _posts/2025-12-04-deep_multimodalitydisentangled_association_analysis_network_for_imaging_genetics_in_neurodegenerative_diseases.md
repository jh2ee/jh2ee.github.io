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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667UA4HSI3%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T210959Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIB86167yGT98fTYU5JOuxLeqzFXtBJ0gy18mWCs2WIHeAiEArqbblBB0dt789e4KhnLGK3K0qHGPiGFqbzGnNHYB4kkq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDCgUHTVE7FBTt04WtCrcAwFm51VoVF5H6OPAAzJwDsHb62XrKHxVsZezEZX4McIDeHxTeHpRrJwLiB8ut3%2BW3EB5DF1q0eY4iBQ22An0pV84WVtjPdtTKoQ2bB1qxhVqoDxPaPXHlmxGXWc%2F7n4Ml9NaTPDk%2BAeb1HSUkEtc7%2B%2FMGAaYNaDAQRz4iQnLiPLnBS%2FuKrJ6jph5D%2Fwjtdw3x%2BvvOYddTlQbQBfNZgsRQ%2BR4xP9qDdHGJMbVGe3%2BGBZTFK5xjQEdnzaQ5WxIBwmDW1xLdFQouq1I32ZBHqomCHflIOHdi1MoKYeIeKnj%2FQLKdvYdmcQYTetAuz%2BGFAJUusZYx1HwIGP2BQXW4Poc8u%2BzexqLD2tDDHYMhUXNUQMWzoDhmeYksBjMqIEJC4gEK5LCs2g1rGZCtjQqZZnHAyPphn4Q9VZfw8H30u7JAK8soeX5qdNyQnqVMrrWjt2WQDytvSKNuByGXmaTKVnmJMShVxxq2g4a%2FpDJqgr%2BcrDX8s5HOU%2F%2Fm82FFrVMBJnGAfvnu5IrDvQGDHKvwyTHB7hEAiYz%2BSPZA%2BNLP%2Fdp2ziu3fnASXFRhrcxk84xWSSx7xXv6a0o%2BxmO%2FpeqNp3dNl0qo0749SHncbuMRCUG4hkZ16FNJQo32eueWvJhMOSJpcsGOqUBRVffShsLeLsznrj6up7KMWt4Wq71hXsufVUr8GSXlFKiWMuwa0BQ8LwdFA0iwCxCymd1UriC69%2BMhqJo1TBrsxeGP%2FWcthOxYenofVYyEiWGoRVmi4fzPiUABKbDzD8W1vmTqERLxX4cgwMtm4dl2S%2ByuwU52Oi3pvcM3DNu7EkCMuxyDZPks5izsprjqBE6iLY4WdZ6HRHGZ2URfKWX3ToByBMt&X-Amz-Signature=e3efbbe1ec83f6e5ff1a0f01104e9a898bb243bbd1a29f5bf69578025a07a6d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667UA4HSI3%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T210959Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIB86167yGT98fTYU5JOuxLeqzFXtBJ0gy18mWCs2WIHeAiEArqbblBB0dt789e4KhnLGK3K0qHGPiGFqbzGnNHYB4kkq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDCgUHTVE7FBTt04WtCrcAwFm51VoVF5H6OPAAzJwDsHb62XrKHxVsZezEZX4McIDeHxTeHpRrJwLiB8ut3%2BW3EB5DF1q0eY4iBQ22An0pV84WVtjPdtTKoQ2bB1qxhVqoDxPaPXHlmxGXWc%2F7n4Ml9NaTPDk%2BAeb1HSUkEtc7%2B%2FMGAaYNaDAQRz4iQnLiPLnBS%2FuKrJ6jph5D%2Fwjtdw3x%2BvvOYddTlQbQBfNZgsRQ%2BR4xP9qDdHGJMbVGe3%2BGBZTFK5xjQEdnzaQ5WxIBwmDW1xLdFQouq1I32ZBHqomCHflIOHdi1MoKYeIeKnj%2FQLKdvYdmcQYTetAuz%2BGFAJUusZYx1HwIGP2BQXW4Poc8u%2BzexqLD2tDDHYMhUXNUQMWzoDhmeYksBjMqIEJC4gEK5LCs2g1rGZCtjQqZZnHAyPphn4Q9VZfw8H30u7JAK8soeX5qdNyQnqVMrrWjt2WQDytvSKNuByGXmaTKVnmJMShVxxq2g4a%2FpDJqgr%2BcrDX8s5HOU%2F%2Fm82FFrVMBJnGAfvnu5IrDvQGDHKvwyTHB7hEAiYz%2BSPZA%2BNLP%2Fdp2ziu3fnASXFRhrcxk84xWSSx7xXv6a0o%2BxmO%2FpeqNp3dNl0qo0749SHncbuMRCUG4hkZ16FNJQo32eueWvJhMOSJpcsGOqUBRVffShsLeLsznrj6up7KMWt4Wq71hXsufVUr8GSXlFKiWMuwa0BQ8LwdFA0iwCxCymd1UriC69%2BMhqJo1TBrsxeGP%2FWcthOxYenofVYyEiWGoRVmi4fzPiUABKbDzD8W1vmTqERLxX4cgwMtm4dl2S%2ByuwU52Oi3pvcM3DNu7EkCMuxyDZPks5izsprjqBE6iLY4WdZ6HRHGZ2URfKWX3ToByBMt&X-Amz-Signature=e3efbbe1ec83f6e5ff1a0f01104e9a898bb243bbd1a29f5bf69578025a07a6d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4WKZXIL%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T211000Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQCfHDU6w95HwtsXwrkQj8of0uQmh4kInD3rBt0fK8inTgIgcN65tdiWW2Joa9ub8%2BskIPQ5tZUg9N4xgl5U8IhTNWcq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDCg8BQmNDl%2FIBg4EGircA8u4dzxwYHhWX9eLvqy84kcc8DWJfpbm4fM0CnLFitPaJsMZsXCcj1agAqUGrHseSaufEkPreUZ6%2FgovolvdrqBN3O9L%2BbVi1jXKPrB0lmelQgfbqgMauD5teLUgxsSo32qpqLQLccTxLkznoslqabXBQWhlNCmawJk0zssW5IUytFCXoxFSfsWgLF%2ByW60hnY802yl%2FG5c%2BPkxm1OJOzY8JgIn4EY4r5jl9XYX5NJbKTAiTodY7UH06W3NiJe9fl0a1Y9s0W2E8yjYsm6I1Ibvn9gtPgmMxNB0W0YHXHJMdZwSmblztMj7MfZmVm3nV2%2BJt21iM7zdp7MMfITPjVp4rsSSdOFjRfYJA%2FQF28tUUymeZElCZQy8TzbpKD7At3qE99h8H543ER%2BixxWWwYQG87TXJfFVbI1ODGREIb%2FK72BjiVpD2NuoExrm91QhwFdZKUDpbFFSj654xi7IPBLpxu1CwK7uO7AywO%2Fm7GORwqK%2F3WVmxfOaVIs6pgb%2F8LrpdEMIKPgifZilgbll3Cogndh50%2FOvF3EpJuC6roDMomeGaO%2FgayOZjs8BL9cpskUTJFMZ%2Fwja%2BoWMIU1aribNnjK6wnWkRj5%2BxdOEUfPum%2FCfAiqgpe9kDiCbZMLKJpcsGOqUBCigqEOg5TVW4jHLeg4StmHJp74VFZsfWdPl5wcvrKvWH%2FpSt0mh%2BOJtuoJ4xcEptEYp9sNVFBain1RBB9b44lRDtlp6XuqBEqUY3sOsAnuMqUJ78mqLujPGcjJsJqWtvdcPzVbIAUaS%2FsfOKLjqalhqf6Lef%2FdFAoa%2FCAfu7rwzrnl3vLcMXOCq%2FzyFBVhpEA%2Ft%2B%2FWnthJPAVrcVXAY%2FNiXSKEGu&X-Amz-Signature=d226c64c8b36ab2e03266238a12edd55c417cb5b962cda8473c523ce88adc32d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZPMMGKG%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T211001Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIECGEeAfviY%2FgwW9H9Tmn%2FToh4VBzgUFYCwnrTEXxfvVAiAVDkC47dNmBIMkD4DxPxlSZzqmm2xZWgDwZoYnWHJTNCr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMF3WNH%2F9fopUdWOCEKtwDw3eEi8BINSpYIk1Ejn%2FZl1Z5W4b9eNDHaPO4QilACUh2HTGhXR6sTHE4fOXX%2F5E58uvnNyNrbEHuDaKT94Jlw7I45CK8eic%2Fkf1mcWXNROQzScGVNaXTZAm7HyJGCIOdT0UXWi7ISnoJ6gpOpcJfUUEczBovqDuyZR%2FDq0Rx6wY23I3x8nfzDtkQBD68qKLW%2FSHifLyRNVbH%2Bpxe6gSUcq5E%2BmT5tK3yzK7KBN03Gs1PePG6w%2FVIaPTGUbCZwvHSKJsyNhwZQxdAT2d1q5bfhdQ%2BIux6TTFUPK29hYMhGwTfq7rYXkgaVGar4gKIjjp2EIuq6E1Iby6nRKH5zGgcZYILC8z8OiuKdp8BeFw9K%2BTZD%2FmL8dhyyBIc8zuPjPTENqrPVsJbsD3PtZhcldwXmLBcu5gDmbJOML1iUzaZNIyE2Ig4MittPe7gBcEXR91tmqLM3kLMA%2BAJzbPLEknmbdDbkAxhxePrFUyx7sRm4ww%2F1CuMUJtSuxOkl6H11F5isSU4sMZfkXxQu5m1QO9fDTNDwY8vJfW2Zzf%2FrNtoGe2MIFlVQZVblIEBwEtcN6ErTgcXQdYf6QOmo36l4gIyHvgrLM3kbNyg8MFJiPm%2B4xJI4ML1v3cJBLHbktAwnomlywY6pgE3vJeZTNA3%2Fv6RGIv40sZ5Hw%2BKanC1IEo5bOgE577ezda2USHKAKF8liuRuw1xK3UldI05gaWrsx%2B8yc1geIyAGWHZq5QO%2Fc4eTtEMo1J55ykDGfyaw44Z3R25aH9nYna%2BsIvQTxN%2BF%2BW%2FeK108F%2BEce%2BFwFPVaVmzap5uM%2F0yawF2IFcbbQbdTVc2RaT0ZLO9QDoHJ%2Ft%2F09k%2Fqzfx0xDl7JUGDktt&X-Amz-Signature=6c06b60cab63effd00b2100efc3dce2377e1c585e21168bbf05cf80b57475cc7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZPMMGKG%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T211001Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIECGEeAfviY%2FgwW9H9Tmn%2FToh4VBzgUFYCwnrTEXxfvVAiAVDkC47dNmBIMkD4DxPxlSZzqmm2xZWgDwZoYnWHJTNCr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMF3WNH%2F9fopUdWOCEKtwDw3eEi8BINSpYIk1Ejn%2FZl1Z5W4b9eNDHaPO4QilACUh2HTGhXR6sTHE4fOXX%2F5E58uvnNyNrbEHuDaKT94Jlw7I45CK8eic%2Fkf1mcWXNROQzScGVNaXTZAm7HyJGCIOdT0UXWi7ISnoJ6gpOpcJfUUEczBovqDuyZR%2FDq0Rx6wY23I3x8nfzDtkQBD68qKLW%2FSHifLyRNVbH%2Bpxe6gSUcq5E%2BmT5tK3yzK7KBN03Gs1PePG6w%2FVIaPTGUbCZwvHSKJsyNhwZQxdAT2d1q5bfhdQ%2BIux6TTFUPK29hYMhGwTfq7rYXkgaVGar4gKIjjp2EIuq6E1Iby6nRKH5zGgcZYILC8z8OiuKdp8BeFw9K%2BTZD%2FmL8dhyyBIc8zuPjPTENqrPVsJbsD3PtZhcldwXmLBcu5gDmbJOML1iUzaZNIyE2Ig4MittPe7gBcEXR91tmqLM3kLMA%2BAJzbPLEknmbdDbkAxhxePrFUyx7sRm4ww%2F1CuMUJtSuxOkl6H11F5isSU4sMZfkXxQu5m1QO9fDTNDwY8vJfW2Zzf%2FrNtoGe2MIFlVQZVblIEBwEtcN6ErTgcXQdYf6QOmo36l4gIyHvgrLM3kbNyg8MFJiPm%2B4xJI4ML1v3cJBLHbktAwnomlywY6pgE3vJeZTNA3%2Fv6RGIv40sZ5Hw%2BKanC1IEo5bOgE577ezda2USHKAKF8liuRuw1xK3UldI05gaWrsx%2B8yc1geIyAGWHZq5QO%2Fc4eTtEMo1J55ykDGfyaw44Z3R25aH9nYna%2BsIvQTxN%2BF%2BW%2FeK108F%2BEce%2BFwFPVaVmzap5uM%2F0yawF2IFcbbQbdTVc2RaT0ZLO9QDoHJ%2Ft%2F09k%2Fqzfx0xDl7JUGDktt&X-Amz-Signature=05c5b79dc315d34612c8b0f0851ebe1982cdb6545201e42bfcd1808e76985d72&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXEOD7WS%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T211001Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDrATCfruO6EZTD3nZGaOfi1ARaVnZEVj1bIT9TLtLX0AIhAOtA7ramQYXW73aHeZQKXsT9zw2%2BJxj7c%2BlBbC5PQ4TIKv8DCD0QABoMNjM3NDIzMTgzODA1IgzFnfxNL3eCTQ9oUyMq3ANTIQTxaun3hKRuRpjFcS4LgOn9Slgxut%2FvREf15rNflhBZeqqVbh0oJw5OcC1OZOhkF2U5uS0zLX8upKtU3f9OjjjvlA4zjhWAoi2g42fh6gONZQv5byUkzvNmb5hPSUbZ9uKh9kU%2B7QgYct8dEYBLdd%2BnRLOZ%2BiBBESTkF%2BP2SwSr7SzHMgY%2F9qzZ8qNdrmAFdcFmlRppxmxIl1LPrXMdkIGjA2rOwhOOvukzPgpWr%2Bqp2ULenEmKL%2FEyrg4dnL4hNLXB97U6%2BZDGbMDSQviqy36fNn9ZediClPb0uUqfsu7jVvdrhbZIAOlxvYHKDr4%2B%2Fx%2F4gfTTU5P014GFx0Ovd5SSHAOhkvoYMnBP9Sdn8AckvVlKGdqqqU54oHByYV%2BCFTfvIkrY3brLuzHKPQbMDnf0jUilAIDRaKM9AF4MFOh4RgDaVVvNWYTZbVrfESku98CRuYeJj1Iul4sQTsK4s1cSpqtVZBoKkvlXJ%2FMFwaOOZTJqMSGY8GwazrKC7DLHIuSsVMvHHP1LTGCAgVND9%2FE6LrbTycFZQqQFFdTCyd296d3%2BkdN9hPTnw96DlGqhwtYzNNfKB7NO4OrlzUiPC1QBXJ7H5Meih6%2BsJDZOiOwdS3Z51y9y8IylCzDuiaXLBjqkAaYS5PsSpYdl5dlycyTc8fViqKLeMSakWys0dfsFZXZAwV5wcWAgiVugMWbSsroppoBPrvrB%2BcDqjTZ2SliC2IYQbLvT58ycDiXRHUrq1yqyHomIGAw1k8FKGnriqvop6rLnS%2FjxEICh7EMFA3IemKRcOLHYD3ZzEp5IiHDXOEwRJWjQ0pff8RyPMaYDuhJW%2F2%2B9uaFLMU%2B37ZSI%2FOraHDU8S6HZ&X-Amz-Signature=46aa1f3239c08de0dc4c5c9616dbc3693e74c0648b4887638e199bc27e3d77f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y3DWK4Q3%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T211002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQCahXRAHA7h6bt88a9Pc9IZdx33rU88eK11XX%2BT38a8fgIgbRZN2GD2cwa%2BG%2FC50UE0XcBaAQdCXukx1dud1H6S8Jkq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDMacQiX0Jhen81TTVyrcAyj1sGSN0T2XdYoFlmDjUkmBrho8QlVrKv0THUPzkty7sxeK1HfP6y%2B8jfgWgODFJhdzxjfpyuW1aT243mMmEDRuRmM%2FN5LfTa6vphrNmJvP9K3p9ePmqxTYp2tGn0%2BVzwd3KP0GGbbyp9CHzcQxi4go%2BzE2boVmt07JV9Ad%2F9J5yeGpo%2BSK8dTYkoQmbJVymIHqbUiZtc6%2F4ocRZZ9a6KuCma1okZ1kBLdDrDDMRFgGaKrwVCkAvH0r31%2BjFrKh%2BfND9r3GpsmWy0ixWqUCXOFbfFyNJWhwRyyUbr8NmeOOS4Lo4sFA4AW4nPNLdym9eIn2ISSox%2F4aQYmypo6kDEfb9sCfIlE69DKvA%2BRyUPlK9Zv5BXeWwreP%2Fc5c2NKJFnuwjdvzRhbOzxImITfFR%2B1ycww7mvKzlDHPmY8T4jRiMGOpfQL%2BPjZAvOt9TEPFl31BH%2FklpoEJyGW7nlpm3o5%2BIvbn2MQjbs2xENOgu1Ad52N4%2BW7rb41nV0lnC%2BQR%2BHHkpA9heJOrjUygsyRjg3%2Bgr%2FulTHW9Fafdug9riP%2BTi6k7mBiPe%2BoAZjIB5eIO5yStCTel7HP0Z3oOTiu2OD7oINEI14OpBbqw1eWBv2DfhxpbgzHM6M4RdTwfMJqJpcsGOqUBmpYNu3z518Y30gDUywYYU46l1f5r%2BPlv47VIr%2FEEira9Qm9f6F7VH7Ej1oDql2R8nou7yztp0hg7pL8%2B2LnS1%2F4f9b%2BQlGdgpL4pw5cHl6GzOUEyzSxdrbbO3icupFbeStl1R4yK75qsruSe71p1a08mjc41QttXWy13lkZuaBIIem9rXPmYmoTYnGidAt14AnlmiMAlrZ4krJyeFjZIdaKSRXfZ&X-Amz-Signature=00c2fda9dd0cc99ecaa350a65bc9c60d4b1f31228da905c38fac3131c1928e34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WVZJXXMV%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T211002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQCTaKt9L2vUe1rGoCmRmN5a5GLbpgrQ9xQ199yrG8LnMQIgKrPkwS1t%2Fe4mLNvxZPjVKohRkjYEHIqvLISJEeD0Wwwq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDD1egB3pCFyYBvgHLSrcA%2FqXJkrcv%2FVNqWp7esCmyiEdofV2kDy43RSCK8cHtzJLSg9HII9FPjKT2GMJDOT7yqkUJIakvbyWUos98OFApZrrbuCyHDMw7dqPjLtHeW952Zn3%2BqkcZ3ShJR3cnICHI7siJ7zYftXbAeZRIlWjL3ty61ds2RbwDB44e4AtsGPnC6wmVpw6kixCUdqLgbIn5dpOxxTfjhivzK1%2F4JfLLqAot%2FLWeJnq2jLVTRSveT%2Bi%2F9LZtH5Vk2g8KyoENnO%2Blrlo4a8K3oIj89G%2FQdJ6YdPyijZhVZYd%2FjbD6J%2BOAXaf0nojCL9HwEkPrEKxnN2KXTEbIfBMnIbh9aTuPsXEKqLKbu5DQDSMQtGBi0RLDuKRRxGPsOVnHSLzKbjxy7dxTwuJOZlwCPYynVAI8PMs%2B%2Bsh4hY9ZRfvOmq8YlkeGZ5bdkl8UCrSWqjEt47WsSPOOzxlhYJQdu8Lb2vyyTfml8yuMUAE3G0xwc564xYTX77vWwCi5HN3xcHzTiLeVD%2B%2BFbX%2B5JFUoUjHN%2ForlbJ%2FyMFRchX55k5QUT0ibNTgbVvptn8jT237LegsX40eLQSHF9xSXjIC84ed7zCe%2BZTcBngvMM7ygJ4W2ML3rtsQqqffKgdagcyEhaBAXl1RMJ%2BKpcsGOqUBeiB50rkRzTaGAFN8GHXGAavD2RrAzIMQlAI5ft08IP%2FBGzjyGLuumw1Q0CqD0IJOFPt0j29HwUD6bmYc3JuF79bJfjM6Xazcja3PEpWZ7RphQNrQ7KMOx5LbGHaFqnuOJ4JztdwsAHPtVjN%2BbtflpSsXE2wYyCKGG%2FKnNcmZ%2BpQjkc%2BFMmDihk1hGDlEXqMwU3ab2CFgfy5fKbuDXpZOhgmPpwtD&X-Amz-Signature=d9f59918bc3079b7a01049e0582cc961ccd6545897f1c67ad2c0d951bd059370&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PKSY7FL%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T211005Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIFZ%2FkSaabJXx54qVT49x%2Blqq9iZF2Gmq0yOnp4Ti4c6cAiEAzvX4CahWAC%2BgXrfNmJBUuDQaPoQg98vMZ3BUJadn8YAq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDPAkzwUt9eUCQ9VJfircA%2FCIm9hSrBUItVaREUOMSqkJGJGEcJukA64JbYmln5EJFIE2XdQ1uYS69ADR5GS7pM%2BK0Jj7qOGG1sUmI0GNjsndvcnq0%2BcTuWlwDaIYZ2J%2FHedCMetk3C10ayznjHVw3l%2FfX37H9uaVsLop4bjIgrEyIjXzew%2Fq9tkul1ADubJQOh0WqgcK4N6NIaiSiL7WUC1JAVozPq1IuyOqsjQ%2FSF2GYTB164OzWZSoxauxfpGLKBum5OP6fLs7JO6mjT04Ryes5x8LAvTmusGLnNuqP0xDYNQ4f5%2BpmUmo46ahIIS9cjWbw5%2F63%2BdYuyphZXGLFEevEt4wM00un%2B3k7D0W%2FdYO6urZhSU1B5qgaghi7H%2F2w8dvilBjaAb%2BO2jHKMHXhCxpPK4gI8KmDoz5cEf1DHwWYBwWMMDWCoYTfVtpP3Zg6919gXiKBLhZajxf0tB9SAEcFmt1PMFHZEPJn8ncG7sEZO9rRyFCeRL5xz%2BsXsrur5DahwrsYUh2Wqx9kbpxz%2BFJ6B46nFfZvIB9%2BT2k8SxN1DLXI5myS%2BYLqioJN7tBX4TKNuafBPLB0IHVtO4MuvQ5k4IP0yq6Eg%2FQJuUUrQHM9TgaUenXrJOil7KModzyo4q48K9PwpW4lel5MNKJpcsGOqUB%2BvSucNpyOinZtUVjMMPfoNPwMhOXRHVKhFg9gO7oGUQfHMTeJUDrvkbuTSt3KECBSwxStbeG1LNPgy%2BevvZ7oxikq9PG6sy5S3KHNPBTlaApQA6D9H6hlb6ZOCdNpYJyOteGQG0M%2FTi%2F9nfD5wY1UmS8D9OUg0%2FqmAHLFJm7ALz5wcNPIKpQZPE4rp4Q13TQx0fGPrt0bxgtxKC%2FXkf1A6Jf4dTd&X-Amz-Signature=3927a9e2f823f8543531495b11c8473a18b3b7fac243d2e84a572af6ce5e5e28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PKSY7FL%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T211005Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIFZ%2FkSaabJXx54qVT49x%2Blqq9iZF2Gmq0yOnp4Ti4c6cAiEAzvX4CahWAC%2BgXrfNmJBUuDQaPoQg98vMZ3BUJadn8YAq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDPAkzwUt9eUCQ9VJfircA%2FCIm9hSrBUItVaREUOMSqkJGJGEcJukA64JbYmln5EJFIE2XdQ1uYS69ADR5GS7pM%2BK0Jj7qOGG1sUmI0GNjsndvcnq0%2BcTuWlwDaIYZ2J%2FHedCMetk3C10ayznjHVw3l%2FfX37H9uaVsLop4bjIgrEyIjXzew%2Fq9tkul1ADubJQOh0WqgcK4N6NIaiSiL7WUC1JAVozPq1IuyOqsjQ%2FSF2GYTB164OzWZSoxauxfpGLKBum5OP6fLs7JO6mjT04Ryes5x8LAvTmusGLnNuqP0xDYNQ4f5%2BpmUmo46ahIIS9cjWbw5%2F63%2BdYuyphZXGLFEevEt4wM00un%2B3k7D0W%2FdYO6urZhSU1B5qgaghi7H%2F2w8dvilBjaAb%2BO2jHKMHXhCxpPK4gI8KmDoz5cEf1DHwWYBwWMMDWCoYTfVtpP3Zg6919gXiKBLhZajxf0tB9SAEcFmt1PMFHZEPJn8ncG7sEZO9rRyFCeRL5xz%2BsXsrur5DahwrsYUh2Wqx9kbpxz%2BFJ6B46nFfZvIB9%2BT2k8SxN1DLXI5myS%2BYLqioJN7tBX4TKNuafBPLB0IHVtO4MuvQ5k4IP0yq6Eg%2FQJuUUrQHM9TgaUenXrJOil7KModzyo4q48K9PwpW4lel5MNKJpcsGOqUB%2BvSucNpyOinZtUVjMMPfoNPwMhOXRHVKhFg9gO7oGUQfHMTeJUDrvkbuTSt3KECBSwxStbeG1LNPgy%2BevvZ7oxikq9PG6sy5S3KHNPBTlaApQA6D9H6hlb6ZOCdNpYJyOteGQG0M%2FTi%2F9nfD5wY1UmS8D9OUg0%2FqmAHLFJm7ALz5wcNPIKpQZPE4rp4Q13TQx0fGPrt0bxgtxKC%2FXkf1A6Jf4dTd&X-Amz-Signature=0bace23f86ee6d06e1e5ff91b19c007f567c84cd09a7f34d250ba0ae3d8c9d9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWHFJOVQ%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T210955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIGfvc%2FQiQyNi2VZH6xF8rfkgS5lil2XpzfSiHyJgZMu6AiEA06sHsrWPG%2FURPX0fEkrdmQuelEVNOrgS5ryQR2bvjYsq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDCMg3%2FjVTu2aN8iObSrcA%2BcA0pgiTnZ1HjzTcWrA4NJs750OTz7q90z5xxVaBZ4rhCtrC6f2wk1EgFazVyVEG3x%2FG6sa1Pfe6E9u7u8GuM8xZbPB92Ud%2FuZ%2Bt%2FXXI5DfCQ6XDZCgQKP5qRx4fb1v2JZU1Y2kYO4v1vB6VfCIoQyRVdFA2S%2FOM%2F9%2Bdvg10Kt86C5D6GUFRUrinPTLld5be8XdTVb%2F1cPQPKKYYcQqmfYVuTEaeHwvwbI4xTw8j%2Bu5FK4s52QsFU%2Fkx3m%2BZhNAfhNAv5A8W259fRoV%2BXRwxsQJs3xSPt1mAPeThqw%2F1nKuha%2B6eo4zmMOWkmPv89yefM%2Fqu7FkigY0Zd8he9kMEQ0r%2BrOxa%2FmtPSDSnQPWe3pDFC69asrIVe%2BKgGOIfi56U7pmizKPXyB2cAOSik9jyMhIkzBEryFc1Z%2Bn%2Bfl13u4y0yjtPKA0kakz3X3ur6ueduaTHipjKPXBxdl1071h5kpZ54h6tz03q2a6Kkbsp0HEyU4d1E2l7C9h1BLxeYOGF0Hqxw%2BJfKaVbSX3MgFme8F1G0PqSHYlXoKlKd3E8V%2Bu0OSnVooa6FudN3O%2FnYpM4vDfQx8EoIKbEzRUy2QaE14ca4l%2FUBb5fRoez%2FMC1EI8n%2B1P%2BdxeHJXf2RL%2BMMeJpcsGOqUBuBXQgKN3Hm8IRZZbJfLvrJm4gkXqZzcyiX5N0PNTiZ1l8pgDTiCoim88sl%2BhszwLO66Ylo3gqQ28k8416mI7j6oSGI7alN07nGZ%2B4XDanCdmEVNwx2js3%2FUXMIE3a8cOyU9SaUwMmOjjcfSCJsJxNrxzHQ90KFbjqXs%2F7qAs0tHYb2%2BYDzs6uKMgQyjpM6GO0bh8eMrXSYgS3PJMqSaxIVIQrJg%2B&X-Amz-Signature=27bfb3a5c48d14ef0becbf5ade88ac5a45e30a76e75e84854bcb234fa6ab35e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZUSA7EL%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T211008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIFFtl2f1R74j8%2BTbKLbyRVmfIR%2BrAJkDf5vCZT7Lq6ipAiBS70QykovJHYnkuHzo0ndCmx4UEGnY3y0P6qOIdHejpyr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMZkDwvQxDRezV8xijKtwDW6xl1YUB%2FfwuCVoZ1sUOX2HOl5m39yr2G4wPuM2h4GmFP5wni2QOxTRzjKrA9m%2Fq25TeK%2FnA61ynUj85kA9%2FRkwIt%2B%2Fx5qgD8utUAaqu1kC1h4c9eCD%2FQjU5ZahSBHfHtN8YPIBnt8Pe3ZC7UsIyE1wKJqtAYfJv625jj2ZmB90bOik%2BFcGYjfkvEyUK7V2kRPhUzVDY52kHt2lBYxk9izEClkh3VzY2hu1ro%2BzuUsCS4SZPTCPpQcm0jRtIbK1M3Az9HxGt9wKzjjqIUUap2zJbdaxQYdNGo7vTNSCGsANGiEHICqrmdSnDUOFUbxsA3V8uQTuDzMk8WVO0I1SKKlbKtTbh807%2FOWBTYNEh8urLTjLJuAETMDQ2p6SDbvM4oRtFbElgDzrbaUvaKsijHgfpCEKkwmRyJ3M7U%2BCTKrloWw6CpWZxbVw1qP6yCl4JL8qOA6h35PXu7LDJ2hgD8dsYrSMp%2FX8%2F2SG2o0jgTiPrPEZMT8U4ua%2FWfKR5Rdv9l6Z26KWEE3dOOvb1Ft81UKtU3NzI0ZA4dk9NVczroojsaeA1K%2Bl4wMYIpSEUrZ7U93H3KJR2m27tb6ItGyftJe7mpEt3bJL9RL7u0BpvvmoEVQK3DAMy5Q1IyU0w7omlywY6pgGIn5l%2Bj215oOvjsyG8qFPNjyXROAbeXDl%2F7sqg%2B4hO6zpm7gnHi4QD63MPHfFiATSTCvj6uGfTjQ%2F4Yfu73e2EBtszyPiHFyFyreyQb%2F7CrblVlwVgq06dVDvMFb%2FXNC056ZIgMpouKncRnd8K2wFWZy3C8FC7e1yHuD0EGoN%2BZ1ATzeLi3rucxbCnrK9hoCbhiTx1ToWXBNl2tepopJPovvKVJI5Q&X-Amz-Signature=7573500345505c8717468c90d4b1b40884c5a848705518d95edf05f23b710365&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZUSA7EL%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T211008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIFFtl2f1R74j8%2BTbKLbyRVmfIR%2BrAJkDf5vCZT7Lq6ipAiBS70QykovJHYnkuHzo0ndCmx4UEGnY3y0P6qOIdHejpyr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMZkDwvQxDRezV8xijKtwDW6xl1YUB%2FfwuCVoZ1sUOX2HOl5m39yr2G4wPuM2h4GmFP5wni2QOxTRzjKrA9m%2Fq25TeK%2FnA61ynUj85kA9%2FRkwIt%2B%2Fx5qgD8utUAaqu1kC1h4c9eCD%2FQjU5ZahSBHfHtN8YPIBnt8Pe3ZC7UsIyE1wKJqtAYfJv625jj2ZmB90bOik%2BFcGYjfkvEyUK7V2kRPhUzVDY52kHt2lBYxk9izEClkh3VzY2hu1ro%2BzuUsCS4SZPTCPpQcm0jRtIbK1M3Az9HxGt9wKzjjqIUUap2zJbdaxQYdNGo7vTNSCGsANGiEHICqrmdSnDUOFUbxsA3V8uQTuDzMk8WVO0I1SKKlbKtTbh807%2FOWBTYNEh8urLTjLJuAETMDQ2p6SDbvM4oRtFbElgDzrbaUvaKsijHgfpCEKkwmRyJ3M7U%2BCTKrloWw6CpWZxbVw1qP6yCl4JL8qOA6h35PXu7LDJ2hgD8dsYrSMp%2FX8%2F2SG2o0jgTiPrPEZMT8U4ua%2FWfKR5Rdv9l6Z26KWEE3dOOvb1Ft81UKtU3NzI0ZA4dk9NVczroojsaeA1K%2Bl4wMYIpSEUrZ7U93H3KJR2m27tb6ItGyftJe7mpEt3bJL9RL7u0BpvvmoEVQK3DAMy5Q1IyU0w7omlywY6pgGIn5l%2Bj215oOvjsyG8qFPNjyXROAbeXDl%2F7sqg%2B4hO6zpm7gnHi4QD63MPHfFiATSTCvj6uGfTjQ%2F4Yfu73e2EBtszyPiHFyFyreyQb%2F7CrblVlwVgq06dVDvMFb%2FXNC056ZIgMpouKncRnd8K2wFWZy3C8FC7e1yHuD0EGoN%2BZ1ATzeLi3rucxbCnrK9hoCbhiTx1ToWXBNl2tepopJPovvKVJI5Q&X-Amz-Signature=7573500345505c8717468c90d4b1b40884c5a848705518d95edf05f23b710365&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XRXUBBWE%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T211009Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIH4odpNWnAJN%2Bzbczcq%2BWaW4l86qzKRkdSXzQH%2BMOsp1AiEA9TFmFMWSP8PbF1yFGdeaLreU6J6Uen0JoMQbaJHamsYq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDOLRBwyG69NBes15jCrcA6UXwGZu%2BMZg34f1TZ%2FZRfD2Vb7cadvsf5ioPZjNb8bTNJJrHt3vDh1cIYqWAjoDJiCJFCqZoneDtbGYGl%2FxzqaVNTddhe%2B%2BtcTNiscdnWKJulL7eLYqohYhW5fpdflAJFDmwKZNn3ToW6p8n9czx4Mif8QPJOW3afkpMjXBTedweWaDWaBMBMORF%2BJYfplaI4PWGNUIQEl6dM0Rdvl%2FmuwpoJrjxj0wz1eC7BEDZjRhtaRmEaysmWifSE5MbYA0I3P1npqzEZcPlEJvnnIBPP5rMG7QHT3chGqGRfpDyqnXYPwI2PLgmiofNCML0ArGWSmwntpmM7QtSn7eUambFVprHE5SubG3VIteHbbjkmEXELt1M2H%2FeeeOlyrgDhpqykDhHmi2%2Fb856AZj7UpMC1oG2emcQKMM2XUwN%2BVNXvFunBbB7%2FYkPRbzMrGE8P6Uad3PfLw6gnU6znjQP0Z1T9VHmuTAExYF1JQBucbGndtUkV40tdv3Z4d6bk71i81LlZdosRL%2BOjyEUyThcy%2F9xR1bEa8GiDFt1z4bSJeMdQ7Dkf5ox1pkKUVxdM09lpA0GbrogDiXgXpzdO3RNXMsF5sFV%2B8NPgWbYT4j0TGJYU3neFYFIv%2FHg2bKXdvoML2JpcsGOqUBXl1ESt5%2FTX77fttUsxs050HTYrPpVU9vAmmVjn6EugzBJyAFxsHWlILz6hghQhWYZ9xO8fvBtsX9oaBksAIWujO819G2UgmhzcYSEuOQbjrp%2FN9wlUJaBLxgRbyAWdkRbo%2BLb1z7ljNYjap7V9aEzfpgx%2FIOnc4Ip%2BnUODrDN7qL7IBpu4vnUUHzrERE3laVs9JeB3iQ3L5k4ZsWLu8A2m%2BgA5QH&X-Amz-Signature=87331a7a951a536325ce0a6f56f9d6caf02803fc3344cab7afe446eecb372d3c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

