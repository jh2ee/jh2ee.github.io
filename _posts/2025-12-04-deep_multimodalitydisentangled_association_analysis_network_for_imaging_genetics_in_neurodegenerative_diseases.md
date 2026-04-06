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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBQTJ3WP%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T010801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDBWcHrpVTMOHvy%2FNQpPh3nx1VXQLEZlD%2FrneFWPKfbRQIgd5eAZljsYDgcL54LblP32AMW1iNaHIqaAkwgu%2Bsj28EqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKMfTGCtRUvA19Z5eyrcAxcbFPjaTSvykVGdla52VVGAcSFXhogNlF2Rg2wZ4DLpKPGipj%2F%2B%2BNDkuef2k2GKYjYoxqYKxx3QTJioLI7Ctd26RR4uwTFCXfs1n8L8pfaZteasJDVNpXJ9j7%2Bit3Dr9yww8%2FtPBfsa3qZI2kFOX50uCIbGS%2F3tCwD5I0TjAWETH5q3sE4WqKJnZiM6nHUCjtelnw1ulkz03Clt4r5bUWAexsJ3GMRAyyb%2FP1wkdK9J6wbsrk4xsu%2BacctJXkMlPYw%2BVyFvM8C66S6shEmYJU5Fy4bNdCl6tWsgRtxQJ622nQFDfwpoa4Wx1NBJv73AUa4ysRhcy2VNrDKLFbKbuK20r1Erh9rWLT%2BYrjJgOQOi4PpmAKpMUlNIxFSdriPvjZ4pQdTJNQy3c4eMhfZKKNj2TqgGEOy3w51%2F%2BdwatDWOgF0FLQDv728dBcI%2FVbjUHcv74ZpPXETVFE0r2eEXEhygb4Wpg%2FPWqTMpgMMvhzeaqkAyFvIZmDIUs%2B%2Bg9Zetq%2Fgky2D6fi1MZkm7ZIYtf9Tznx8stb%2B2qEyjtUw7mvTb9q5wdPwfPVsJfxPvwyB7GLH3CmGk7zO0ggvGKKfN2vS9j0wbLZuz980QYlZ9V18Wo3lKGle8El7p2KDvMNXzy84GOqUBGvDS5lclGfhT7JAdGF1E3%2BNmNjk4vHqZLFi3VSEiOlmZeSt2HEgn0Z15oceZ7zpUHwdrZg%2FtSaS4j6z3Ch%2BP5T0oWRkZP%2Btu5YmaJ8tWOgo23XRI1ghZsoAaI%2F3TPkxRSEb2HQjy4ldbiP5PmsPbnGbiXrCMXqKP7xWiBr7GsuAbB21Fu8dnS1C3iZTYkWDoL%2FpNMkD3bONTr0sWmuF1Zm5bYqwK&X-Amz-Signature=b848110924cf24a8cfa9250812a211ef8997d4e7d04b791ee6bc1889568bd8db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBQTJ3WP%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T010801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDBWcHrpVTMOHvy%2FNQpPh3nx1VXQLEZlD%2FrneFWPKfbRQIgd5eAZljsYDgcL54LblP32AMW1iNaHIqaAkwgu%2Bsj28EqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKMfTGCtRUvA19Z5eyrcAxcbFPjaTSvykVGdla52VVGAcSFXhogNlF2Rg2wZ4DLpKPGipj%2F%2B%2BNDkuef2k2GKYjYoxqYKxx3QTJioLI7Ctd26RR4uwTFCXfs1n8L8pfaZteasJDVNpXJ9j7%2Bit3Dr9yww8%2FtPBfsa3qZI2kFOX50uCIbGS%2F3tCwD5I0TjAWETH5q3sE4WqKJnZiM6nHUCjtelnw1ulkz03Clt4r5bUWAexsJ3GMRAyyb%2FP1wkdK9J6wbsrk4xsu%2BacctJXkMlPYw%2BVyFvM8C66S6shEmYJU5Fy4bNdCl6tWsgRtxQJ622nQFDfwpoa4Wx1NBJv73AUa4ysRhcy2VNrDKLFbKbuK20r1Erh9rWLT%2BYrjJgOQOi4PpmAKpMUlNIxFSdriPvjZ4pQdTJNQy3c4eMhfZKKNj2TqgGEOy3w51%2F%2BdwatDWOgF0FLQDv728dBcI%2FVbjUHcv74ZpPXETVFE0r2eEXEhygb4Wpg%2FPWqTMpgMMvhzeaqkAyFvIZmDIUs%2B%2Bg9Zetq%2Fgky2D6fi1MZkm7ZIYtf9Tznx8stb%2B2qEyjtUw7mvTb9q5wdPwfPVsJfxPvwyB7GLH3CmGk7zO0ggvGKKfN2vS9j0wbLZuz980QYlZ9V18Wo3lKGle8El7p2KDvMNXzy84GOqUBGvDS5lclGfhT7JAdGF1E3%2BNmNjk4vHqZLFi3VSEiOlmZeSt2HEgn0Z15oceZ7zpUHwdrZg%2FtSaS4j6z3Ch%2BP5T0oWRkZP%2Btu5YmaJ8tWOgo23XRI1ghZsoAaI%2F3TPkxRSEb2HQjy4ldbiP5PmsPbnGbiXrCMXqKP7xWiBr7GsuAbB21Fu8dnS1C3iZTYkWDoL%2FpNMkD3bONTr0sWmuF1Zm5bYqwK&X-Amz-Signature=b848110924cf24a8cfa9250812a211ef8997d4e7d04b791ee6bc1889568bd8db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YWIVEUO%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T010805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC2jeoP%2Fc%2FRKr78UUqIaae%2Bp9yYsZsQ9vbKSML5antFnAiBtw%2Fnd5quwZ8et3l7IHxPzX%2BmDXJdqYnMLBaquxw7DQCqIBAjB%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMVLZZrQdPRANBrAbzKtwDQhf8mYVP8jIgcXgm%2FRVsqd4y6NMWz9Qqib4UXC5cai%2B0Tp05ZcjLntToaoEuihFTZxxpwCJoyX%2FjC4RjgO6PLenS7dfZGrqAyIT%2BGQybR9%2BZH6aRoT1Zui7OOH8MnEo3up5Qzx%2FVd9PqX1NM5TKeFY3VZDmnNSX4embF6GDo8bhMwtF5jgHVW2CnH7uDZG%2BkgHPCdU0TCWVD9wURb7HRaCbs1B7eiq0A3Xs0yCAjMEkByEFtiLoaq3yECOLY0lFekYVFXjBOqcn4a8lixvdMyZwLrDBhuPYo5OLfl5qziXQpRwDQgpkupuRS2E%2FXrQYz04%2BT5qscAZa0IrgjujgVn7vU8ga2C2xcnRhK2GLopJBimsAIFokL5tvMFIrGnMdH0nAtE%2B8knF11g5Qo7uuxb5UrqNRBHEf5dRaWrUfN0SmrYhpbx5Fose1rVXRne75MG43386MRrcqr6Maqb1w1QaT1lMbPb9SEfczLXKANeZkG3STgvebt9e4G636s1lA1oSOZP4x%2Fed%2BLeN8lzYtQ9H4gbMhBKImDgyZ%2F%2BBLOTmlxkZhl4awD7syrx8so8%2BwGZ%2BV93%2Bseo5qU%2Fi02%2BVPjDo4DppkbjoPwBLKFbmjrjLOkc5AfPXqwCC3375cw6PPLzgY6pgHOYDMQ4E2hhSB9i8DqwXX6CjTPKZGrm7Id6OaurR%2BG5gxSgStxrOYX9Lfpbm8dQeUsSGJfQN9Q3J6FnE24cVd7Sj2bQKV4PpPkVFr9HKpBMUsUkLv8%2F79srL%2FLJycOE5dNsT9kMpjdR2RmrI8RH8VhPbS2Dw18Bbj4bd1qfnM1VIAhBPhUfOiW5a4pF%2BhL%2FvosxQAaaUtX3rvSdFwqGSHgIe3ZhVs8&X-Amz-Signature=0b360b0760854ee847beafe8d5ea40fb4b5177390c8ac911fd51d471a3a67570&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZUETB2N2%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T010810Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQClsblVG2zdWBJRrfFftN0dXnhv6wBbP0Tto8GHCCEkpwIgeOvnBUpwfIoWwLUxZZPthrdTqBP6g7qZA%2B6uwVSy6L8qiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBmPXjgrk2O8rSwgHircA4AmR5QD165YOvNMylHk%2BxwSun27eFx3BRLnx0dbdF344SVsuQtsC%2FSNZPhIXx%2Flt9O2BhDQQP0V0U%2BlXyr2TLee8PSUPv8wEStqc7rsaQGnCD0pda8YHjSJLNFXCy66kFNlOICoXXbEKvXa7UQ3dsnCUKQ0zV7CDRQ0P8MhFdyhoWVnjnQ2IVk3aUSsXBXjsHpIr3noeBEL7uJer%2BiMl1fOeSxD7FvTcV1uOE1PSdvpgIa0BpuYztQjaxOnIJKSI5zFlzEmxJM5u0crJMct8rIei6yyP%2FMoagROvbW8h%2BYSGSZjUSQ0lYvaYwVdDEBIAf7p4MqCj30xD1YJtXbQ304FhV8Z%2BR154OwV0P8MmBanmuus%2FC29S%2FC2UDID5Acotrh%2FJdbQ8vy1Q%2FML9E4%2BkOOMRDIMdHqbaV%2BpT6PC1LZdGeEQot6RmCYUkF1ORPnyg37TRabks4%2FSeU%2F5%2FM7sprMJs5wqyvu4fhRrnKVio3ncbnAcekSTMmdeNAqcm%2FM4g0qR1O4hl6fKgnoUD7dBxxWZbDcDMdLofpq2rrQcor7S2WCyFLPC1ApRnlUBKGRBFazS2Glutw6pgjkHh5dGvbVUpklzu94UTVJTG6rZRV5BZFqnCzlYWAQ0qVyQMJP0y84GOqUB%2FCBhTyjOpRvxUp6Oy%2FaQsXAzoe%2F0XqWeCZKNvZKGeU%2FbySaLP7OfRtx7faTwy0zSYQHLRr8pzyEaQPOwrawOCZBdKq%2B5FaLF7CbJetf%2FbZmPXEkUCDFeWLGH2BgqcnG%2FTfBXaGUTHgL46R0bL8%2BOsl7YaZXklsr5meKmBu%2Bddwm9GsOuHGvtqoBIuK%2FYeAzEO0d4m%2FbuY2HQxAikxel0bvTx%2FUaa&X-Amz-Signature=da30ea5da82ebae610b4aa9a8dd25e0ed689b2763c7f2f9e17af13fc4221ac27&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZUETB2N2%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T010810Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQClsblVG2zdWBJRrfFftN0dXnhv6wBbP0Tto8GHCCEkpwIgeOvnBUpwfIoWwLUxZZPthrdTqBP6g7qZA%2B6uwVSy6L8qiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBmPXjgrk2O8rSwgHircA4AmR5QD165YOvNMylHk%2BxwSun27eFx3BRLnx0dbdF344SVsuQtsC%2FSNZPhIXx%2Flt9O2BhDQQP0V0U%2BlXyr2TLee8PSUPv8wEStqc7rsaQGnCD0pda8YHjSJLNFXCy66kFNlOICoXXbEKvXa7UQ3dsnCUKQ0zV7CDRQ0P8MhFdyhoWVnjnQ2IVk3aUSsXBXjsHpIr3noeBEL7uJer%2BiMl1fOeSxD7FvTcV1uOE1PSdvpgIa0BpuYztQjaxOnIJKSI5zFlzEmxJM5u0crJMct8rIei6yyP%2FMoagROvbW8h%2BYSGSZjUSQ0lYvaYwVdDEBIAf7p4MqCj30xD1YJtXbQ304FhV8Z%2BR154OwV0P8MmBanmuus%2FC29S%2FC2UDID5Acotrh%2FJdbQ8vy1Q%2FML9E4%2BkOOMRDIMdHqbaV%2BpT6PC1LZdGeEQot6RmCYUkF1ORPnyg37TRabks4%2FSeU%2F5%2FM7sprMJs5wqyvu4fhRrnKVio3ncbnAcekSTMmdeNAqcm%2FM4g0qR1O4hl6fKgnoUD7dBxxWZbDcDMdLofpq2rrQcor7S2WCyFLPC1ApRnlUBKGRBFazS2Glutw6pgjkHh5dGvbVUpklzu94UTVJTG6rZRV5BZFqnCzlYWAQ0qVyQMJP0y84GOqUB%2FCBhTyjOpRvxUp6Oy%2FaQsXAzoe%2F0XqWeCZKNvZKGeU%2FbySaLP7OfRtx7faTwy0zSYQHLRr8pzyEaQPOwrawOCZBdKq%2B5FaLF7CbJetf%2FbZmPXEkUCDFeWLGH2BgqcnG%2FTfBXaGUTHgL46R0bL8%2BOsl7YaZXklsr5meKmBu%2Bddwm9GsOuHGvtqoBIuK%2FYeAzEO0d4m%2FbuY2HQxAikxel0bvTx%2FUaa&X-Amz-Signature=6952de15ceaf6f737f155d4055aca51807dc9f95cc474bb8aa147438396affba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DGGG3NH%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T010811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIET8xJ9R4ECzAqufdLWGqJYqCwH6rsbCWXuEW8GEVX0JAiEAqmOSjnfVtGwGod%2B5j7Sm8paZmzg2%2BkzJu%2BVAa9fo1LcqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNzPcGPSfGX7%2FSuS2yrcA10nMSZMV1b5lI5RtlJMTV5KR1H8i5bgq4CX1YNnQ9zj%2FuZI2Gsdbp153wCvSilZgth2Qq5fcMLpxSfbDos5iiFr3POlDxH5b57BG%2BBkjLvfvZQmkSFuvCOCUQC%2BJfawhknUGbkuwdwzztSpYSMEUZo71S5HB%2BOT4Hdcih%2Fv0Q2PG45H67alV1wwcMV%2BV2t4yBnJ8%2FlP8Ut8QzEbc%2FJ8QHBfpHwjeCVBfQJfPRKBXLXW4OzIrHO9KkxQh8tQWmjm41uMUKu4RgolFP6myPwMF6knwwU2oKgvZzbVb8oeguNeM2b0jYm9NYJ%2BEBQvWkMxeIPwCFh7gEaVMH1%2Bnm1Nc94hwX9n%2BIKrA%2BG3yLFcUS45e7OEKmsJGVeuwbjN2F%2BXWiyMK4HeNN%2BDvcQDpzlFiZH%2FagAihbeCbIynRni51znPCqSQWiMnmYTpxMTq9Jz7Xso%2BL2T67Dkk83hcPre6S%2FQIAeM8jLVdOE6IKbSXh9%2FodpbxgIku2f7z%2BGIGX%2FQ%2FGn7GSaq9aLcEhhNiJDeJ7VN6Yh%2FIrrjet7MC15xgFjGFZwdrIvOvq7nbvEia7rJFlUevtSc6pzznp7wY9rif7usA3Sm9RkumHI8EwdrFkYxA7p0nsx%2BjvUwYWPWNMOfzy84GOqUB5xNjSy37zeVeURJKkQUWZj%2BRctMPxpp2SOvNZYS2mw9HrM3ounoeglPeykcamPvrf4qTnysRsbn%2F1KjZhg3ZAQc7P0OcVjI2oYzce5WFxdR1FAd3MAOpbYDmG2pXyX0MoZqbQcFD5iTZEMPc8if6jN9KYzHz4AYvT5qVkj4aLPFxaPGmHLmYj3s8VzekFaCyO9g8ghyU%2BxdsozZ08EuaGOAniMT9&X-Amz-Signature=5a784a12a0270eaec6c5446c1a36ca1e6dc2b7345fab7e3045e901f0e1a172d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666YXETZLS%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T010811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHPg5UQKZY6DzaEyXEzwDZ3N3TlApRPmM9kwBoBys%2BxTAiEAj8vC1PllhXHPaCf9EDIeJHIN8u1fZmBZxfg%2FD%2B4UbTYqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKBKYRAj%2F%2FSrvLNKWyrcA17FjAga9Qb26JwzlblMjv6NDz5s0GUkplL4M2cmQcin%2F4qiBocXL7tJG4tWlEz1QlHvigV3Fd%2FL%2FzJn%2FFBIigZfWBO9OEx8uP4BXYGVPQhsWTNEa73fYkPvb7%2Fmk1TXFeSxBk6FHXoM2jrRwb0Oy2xGLJAQmu6xgPAVTW9QSFE1CFSLU2FAd3qMUb2Xqbhumq8YD1jqlKc6D%2F4LoboVKWC2MdKisX99emQD3%2B922Kq20i2WS8l6wIYk2Cctn2aLHPQEsaomYJQm35%2BMXRpZKcK5xcC6M6uue49DrPXGSqCGgVLADqYbOMFztozYy5BPWvyppQva1u1N5mjoHG8IVrUZrlx2gFXav%2BfaxklUMmn3qtEIoAFm3krdgPQaOCoX4Q%2FaE6uWV7iolIdang%2BxDREBzdmT%2B0jp%2BgyzT5bSJ8JhvQAR2yO1dOoow5qb9ilKhicPOm%2FWG7gHNJXV5xF%2BwOmZCFC7%2BCIxpEGblKc501NGNz3qa9I1KQA8yHxMEi%2FsMHVf06OAzIKC5AhYH3LsPtwfj0UwM7oJK8s5zk4BPF6SB8NSNz6aTjynGaKZ7L0j21yHwa4hl1F3B%2FW%2BQnEgoLME6ct%2B7%2FRo5KYf15srVqRLKbwWhUZkdoEevKy2MMDzy84GOqUBGKnwHOP62hSd4n2YObmss5WsaPYKVWzgNg%2B8dyx4aJ5X3Us5DNDsRb5ZXNczL%2BORM7gms%2BI%2Bo%2Bzki0DfNAWKqJeNAnKa6IhkU5agJI98ry8I0ZUVxwb0pM2UBXcj2KLruD2Ihq3geVLngXk%2BvkorIpliH%2BiB1D5HWDt8bh68RzAz7AZqszmw4gwUumbvtG2dZzCpkB0g5lfH46gQsW3ifSzZk9UP&X-Amz-Signature=28f36c58ab998ba4023e7ad9f1000e5932f1f0c49622923a4636b49a0fabc54b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BFJMBJE%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T010816Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC3cJYN%2BXxPdAUg8jupjnzpPg6KuJOLo0LqTBLjQ45mmwIhAIiIfDCTXa4BdTBq6cDlHL%2BdhzjAac0clsK%2FHmYgNWLrKogECMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzp%2BIDq9KJTx%2BVA3xcq3AOIOCH7SLXDlheaScJgo6qeqKKzGSGECcU58MRV0hVms7DyNUuX3YEQwXI82eMmDxbjvsO92XXxqPdVUJJ8NqwKRkVEqVD1gik9Gw2Cxk4vVvvVhAw7GqaORLShZFAteNblTBwVydDi2%2FVg3bSnlfYbMz9oofR%2BI%2FpQdSc5OusY8GdS3ngnexoEd132dDuY7JU74zxqLGn9We0X4n7jH%2F4RcueFrxMOdHpMMrqZqenoWDR1R6Fp4y%2BouSI0X1w%2Fr%2BNFFs5l6UGbuSRz9QhTCeKyxlT8Etg5xQuXBA4fS9hupC4MHWcPszvZxAV6sgbUaYPPbVsQEGYts5jWdZoo%2B%2BSCY2ihC2t7tDUDHzI4VVYQA8Rmh4v%2F%2BjwX3uJdKjfZBcCfvOSVv%2B1RM5jBiqdlaTaywuAIyOG6KTsXIvztLQlYLN0qoUV9pd8PlalSQtJzNiMxSU3rM%2Bj757jhCaYH6VAiKFsr2jcGVq8TwO6Hw2E4XIbbhpwch1LInxzb2%2Fjh8vv2BJNTUmwiaAoBqPhSVZtScFiPjF4f7pTWDy%2FMFqhtp9c4O6MtRUTfVJoNrKRqp1Py3PUtYxMBH6xHBJ8ixGz8ZHLw4KJOmwsnJvPKrweRNfjRu83oYVJrsKlKnDCX9MvOBjqkAS7d9BZMuv0S%2FdE2kRrBFBG8hzwWLjJfi0y5v2VmnQ4TfOL2US78LMfnZPVKymFgxrkFYu2n2QFxB1ApWkwqCRMcnvZz4DVd2ZtlRREpkYFBoIy8liHfyRpFhwqrSyKGsfRGjQOoF%2FAn8Cv7oBWCh59mv8O2EepasaaCFn1hgKIUH7kJZZc0gu5lFqjU%2FL1zjFaLKGIxektIjetUH6cYm%2BBjbum6&X-Amz-Signature=812899ad4b0112be34aded67124e95fd20dc1afbf16a02b453577c385dae5d09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y2D74R4T%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T010817Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDaasdCPekPLU45IupgltgSXKKTpJntoM4UChGKSrCcpAIgRt7MFNWz8RrTJoJdIjUkgkYOiSAskS3p%2Bk2vvaP0lJgqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG1ylnr2nc4OBgX14SrcAwIbMdAi7sjhnDxbybk8T%2F4nDLHZ2OKYlR6hcRGtpvyKnnOrRqwQSC1oW8fECgNLFgx1eibPCkHVazJaa6tFCAB3ghGshpDFoE%2B4rirGT0mfepl9QZChlFp56npANKZTgtDa5Sqv1Rv1M%2FkdjTsU%2BMQfFmVENR23XoFabr%2BfnKNN8rG75y1A338aDgg2XWdyx4MWz%2B%2BGcpdj1t36zIY9va%2FnCQz6YlyLMHwy6gYSW3rDtmLsCJijl9uIasfQCQOt3uLGqc6wPC21%2Bl6vu6oWKy39iEfVwJcn5lmvY%2FDn04OJTvy4%2F5azZhZbO6mwRIev%2F6es1VcpSL28pKeHUHOcF8Kf9hdwqnplo2lZ6ryezaPaYCow8hJa2lNmVcrhTQUFWol2T3NAwu%2BICzmQt9oBMBl9flghsWGzgM07ciqfrFuALv41900HCDro1%2BC1g%2Brf7nZgHJkS0r5M79kN8Khea4ELY3b61S2QSE7YhvQOKwGpR0SpckHiBCF4wmAIsU%2FU6McWt%2BF2lgrJ6D6R8KMbDoOz2%2FTBBBJyH4AI1x3U8OPf4qOO6hKMyz6%2FK2%2FMRgXuZbLQyuS1%2B6IUv2zulsVehPklD3jGuhmgauK%2B89jlpa3Jk9ZkYqS3VcTVekpsMOfzy84GOqUBANRTvlsEBPxLhLQFL0JNIEaTUnpq6oWsD7gGMSM2cnxg0t45eaCP2mWpWvMdlXEqZkZ27z9inn5rw4mkUWWpUN8xiu6o8PyE1pZo%2BEnu3%2BbmoiZRSgl1AN%2BLrcKhy6m7TZoHcrRiyLPoiRLvOZ9EaAwkwiG2Y1Itb%2FNDMQrW9r4KDg7O51aa9KHDPXA9mM%2FywHpHhs3%2BPpEgynI0NrLGykGBgXQE&X-Amz-Signature=6ae152feb23a1818ae9042f1bfa653bb8ad60c15225dc142b3524e76005045b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y2D74R4T%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T010817Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDaasdCPekPLU45IupgltgSXKKTpJntoM4UChGKSrCcpAIgRt7MFNWz8RrTJoJdIjUkgkYOiSAskS3p%2Bk2vvaP0lJgqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG1ylnr2nc4OBgX14SrcAwIbMdAi7sjhnDxbybk8T%2F4nDLHZ2OKYlR6hcRGtpvyKnnOrRqwQSC1oW8fECgNLFgx1eibPCkHVazJaa6tFCAB3ghGshpDFoE%2B4rirGT0mfepl9QZChlFp56npANKZTgtDa5Sqv1Rv1M%2FkdjTsU%2BMQfFmVENR23XoFabr%2BfnKNN8rG75y1A338aDgg2XWdyx4MWz%2B%2BGcpdj1t36zIY9va%2FnCQz6YlyLMHwy6gYSW3rDtmLsCJijl9uIasfQCQOt3uLGqc6wPC21%2Bl6vu6oWKy39iEfVwJcn5lmvY%2FDn04OJTvy4%2F5azZhZbO6mwRIev%2F6es1VcpSL28pKeHUHOcF8Kf9hdwqnplo2lZ6ryezaPaYCow8hJa2lNmVcrhTQUFWol2T3NAwu%2BICzmQt9oBMBl9flghsWGzgM07ciqfrFuALv41900HCDro1%2BC1g%2Brf7nZgHJkS0r5M79kN8Khea4ELY3b61S2QSE7YhvQOKwGpR0SpckHiBCF4wmAIsU%2FU6McWt%2BF2lgrJ6D6R8KMbDoOz2%2FTBBBJyH4AI1x3U8OPf4qOO6hKMyz6%2FK2%2FMRgXuZbLQyuS1%2B6IUv2zulsVehPklD3jGuhmgauK%2B89jlpa3Jk9ZkYqS3VcTVekpsMOfzy84GOqUBANRTvlsEBPxLhLQFL0JNIEaTUnpq6oWsD7gGMSM2cnxg0t45eaCP2mWpWvMdlXEqZkZ27z9inn5rw4mkUWWpUN8xiu6o8PyE1pZo%2BEnu3%2BbmoiZRSgl1AN%2BLrcKhy6m7TZoHcrRiyLPoiRLvOZ9EaAwkwiG2Y1Itb%2FNDMQrW9r4KDg7O51aa9KHDPXA9mM%2FywHpHhs3%2BPpEgynI0NrLGykGBgXQE&X-Amz-Signature=7a2dd2b461444d7ceaa68208cf304ad8fb69de116c8d8e63cab26547b97aa07b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UT7FAHCK%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T010757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDuHrQRyHlWOk%2BfpRUx9pysK1ECAE11n%2FkADrir%2FtjqBAiEAgPm7Ddofh0o8nO%2F9Ip7%2BwMaagn%2FvY1h%2BDuhtyx8oB6IqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAbf2%2BhCk3Z7Mld2NCrcA0A2SWDfmXr8EFQ6otqxo67c3N12GjBdqJOvXpHjNYhfTRiaRym71nej8ZcCZjxiR73edEwm16I4pFFMoU2HuwKZvFIwuyWrVu0NQsHR03puL2WyO5F084kxbC3YJHoB3DqZA%2B%2BbeI4T7meqB7nbR8HY1YoFYehglSmWv826F%2BZsKYHvq0rJUeCF%2FrCveT58JaQtOKHbPIM%2FzwCARxlJm0%2FtJaC3Murofx74i2f8rcPGOPFs2FCPShsPxFe5RqMmXHgT7hdTkpMLojgmvP7zQkwdQpfdedq8pjW6FLTUT%2BzCTdv%2F%2FIusckPF89C9edSW6casHbIPJrl%2FlA50XLL9P5887BdC%2Bwn%2BXhgenz0g4U%2FAoxVhNtDVq5OtMyJ1hp6n8huMstLX8G%2BEIsHuRBYF7V6V7u3myjTw3Qtk0JW55zPoO8NoEbiH8jPK7Rzr0%2BmfLwjn8MbpNZnWasE%2FqJ8gyz%2BOmcYIfDDEcO5G0LyTkLlegXYGngwoQSZpND4RHW9E7DS%2BWXrmI%2FsTq%2FhXSioTe5B4ut1gnEWfpTD5I5Iz5Oi8ZP2KgU59FSSbDGfRVHY02GmoscEnG9BblTGDiEwarrTpufO2nk9DGxIOldHG8SqsOrqq4%2BEi2qTGIKlTMKfzy84GOqUBWkkicjipjxFnWiPsCzVPdVm%2F222gFi%2FpV94hhACuedsFWGU6in2Adq2tCtLJ7Oxbp%2F4nBXPYyPumltLltcyxP6mRvF9yrVTDuKQ06xI1rZUz%2B0Vpy7kbFm2TxtN%2F4RnLuG3Qrhaeo4z3ZpIGxHQJ9%2BDWfR7V84Z27JSudY%2BfU7l02cIflT5LWZystnVv2qmoAiT46YP0tEPnPxSC6FQmuPTpdn3a&X-Amz-Signature=8200c38f4fa58a27c858e6db9f2682d7deff7c203271da822c6f879a5b076743&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625TQKJGQ%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T010819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAGmCgCgTbjZzBwns87c%2BxB78UR%2FQUKDGlfZJzkrVgPDAiEAoVUft5XD%2BMy08%2Bm7mikZuGtOh96BwWXEBkflKcbrTaUqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFmPON3vQ4Ce6pfuLCrcA%2B0%2FbiVAJgZojn2LzmCpAI6ayPTfEIvSljxSfqahDBPTMa41ZIURYMFQL2xapf%2BrzJgVH7fBWyQnC4dIXAlHJHQmdWMt6ux8yryWJ4Ks0YNVyLHWtrvD%2B3dbbmCA0EB0Xu%2FXMWf4RuTqpTh%2FUV4s3%2BhFXjbM2HX1nnjrp4FUEmWRTkKUXKqoFKM8cOkzbHV38nt6Mibx1Sy0x0WQgwy1SlBwnSJ9PyyTveDRPxjiHkTEy9e0MTTdexml9LczUqECecCrdtmHASPY6%2FSEzEQ7VJayW5n42xhUIsgdfZYiLV62ZkKtV8tI7csojsXkfzZ%2BEoIOmHeHNiaI2qClJawm2P78O%2FaDsf5IB12WwRcIhv8T3j5BeuFOuqQEP3sLHZIEhQJcHKCQzXPZ4cpyBL7tAOqsuWT2cTZsj6KEyruVg76890y54hPLXhaJuEQupiA8mMMzF1H%2F5hl5MoluBeV6yZRAVaA9fSRk%2BW6DLnVnIv6HqZ%2BKk5STeJWWbpV%2BKm%2B%2FWUyOQq04dTOTPsnkM14%2FFw1zQvcKW4s2uJYJxO1ITU4QnILnDlUSRFmU656L9cMHueqtOJENpfUcp3QodckUuy2%2BaOZ7gULsxGKBG2HTXPerOpizXagO0719mJJ2MPjyy84GOqUBQLuz5Abjzw%2FwS67rE8l0KQa8SC7ss0PSv5PHNST9J0%2B5%2FZ0WG%2BHTNxpY0jsf1KwHjfb%2FdBB%2Fz25QEoMDA8az2DndpB9tvgUL0xvv%2BG1Wo10hU41r8dSaP97ovc79J%2BZ9A%2B4qvmVvk%2BQjjzQV%2FfYe%2FyQVQ67B%2F0knJ%2F2So8lJlZsFo6Sa9uo8ks5GNSbwaE98AmzG3wAIjR5cSvQlH2XZxc0djWpV&X-Amz-Signature=e23e4884bd66bc75a959f6653b794b57271e0822245e4c0c0e3b16b37b018503&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625TQKJGQ%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T010819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAGmCgCgTbjZzBwns87c%2BxB78UR%2FQUKDGlfZJzkrVgPDAiEAoVUft5XD%2BMy08%2Bm7mikZuGtOh96BwWXEBkflKcbrTaUqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFmPON3vQ4Ce6pfuLCrcA%2B0%2FbiVAJgZojn2LzmCpAI6ayPTfEIvSljxSfqahDBPTMa41ZIURYMFQL2xapf%2BrzJgVH7fBWyQnC4dIXAlHJHQmdWMt6ux8yryWJ4Ks0YNVyLHWtrvD%2B3dbbmCA0EB0Xu%2FXMWf4RuTqpTh%2FUV4s3%2BhFXjbM2HX1nnjrp4FUEmWRTkKUXKqoFKM8cOkzbHV38nt6Mibx1Sy0x0WQgwy1SlBwnSJ9PyyTveDRPxjiHkTEy9e0MTTdexml9LczUqECecCrdtmHASPY6%2FSEzEQ7VJayW5n42xhUIsgdfZYiLV62ZkKtV8tI7csojsXkfzZ%2BEoIOmHeHNiaI2qClJawm2P78O%2FaDsf5IB12WwRcIhv8T3j5BeuFOuqQEP3sLHZIEhQJcHKCQzXPZ4cpyBL7tAOqsuWT2cTZsj6KEyruVg76890y54hPLXhaJuEQupiA8mMMzF1H%2F5hl5MoluBeV6yZRAVaA9fSRk%2BW6DLnVnIv6HqZ%2BKk5STeJWWbpV%2BKm%2B%2FWUyOQq04dTOTPsnkM14%2FFw1zQvcKW4s2uJYJxO1ITU4QnILnDlUSRFmU656L9cMHueqtOJENpfUcp3QodckUuy2%2BaOZ7gULsxGKBG2HTXPerOpizXagO0719mJJ2MPjyy84GOqUBQLuz5Abjzw%2FwS67rE8l0KQa8SC7ss0PSv5PHNST9J0%2B5%2FZ0WG%2BHTNxpY0jsf1KwHjfb%2FdBB%2Fz25QEoMDA8az2DndpB9tvgUL0xvv%2BG1Wo10hU41r8dSaP97ovc79J%2BZ9A%2B4qvmVvk%2BQjjzQV%2FfYe%2FyQVQ67B%2F0knJ%2F2So8lJlZsFo6Sa9uo8ks5GNSbwaE98AmzG3wAIjR5cSvQlH2XZxc0djWpV&X-Amz-Signature=e23e4884bd66bc75a959f6653b794b57271e0822245e4c0c0e3b16b37b018503&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYNHWLGK%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T010819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFLVNOGdnns%2FFf6IMBTaUCTV138SYbqcmaM%2FNj0KKBvXAiEAmWsoO8kL6sSheahs0F3ZewdXPHHT2ahe%2Fqqt89Ijlc4qiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK%2FUW%2FVmtw2gJisEuyrcAwbxn1VfGguyAk9%2Bx88g2tvea1Lx1Mk0su9q0d8ZJMs22g%2F18f16tt%2FgBzuMBgW2o4tOzdo8drgG%2Fzra89gNqNyZRsNFRdy8F5qYgM2H1SU%2F3gTBMRHzNCMv8OcZAZZdCX9h9ya9AJaqEWcyOV%2F6fv%2BQ6WK2WbtYUDlNWlcFNmTMdYtHWXg%2Br5WdBABGL2FrvKAD2lp1INeYpO9Yrt8oxhCBPp3bBzubCGFOtHpKYft33re80x8faGfN3ou8VlJSxa6HYuyZDSXj%2BK8K7R7ySkXrB69N5v2czRA0kLVUJbcQpVqJn1Vc%2FQ4gXeNKzg%2FSYj738wriBKnkLsBc1yNzWnIdlHWP5sjaD3Z9nmOBAwFBo6UM%2BomB%2FaJELUQRBDDSrGmK%2Bm0o1veQ8VPe%2BmfIMEox1%2FpDs8x5im8tX%2FhswTYDwaIjTrzMckN9%2BzLXUmjUpjSV9NvT9Ay%2Fz1qegbgZoWyXq%2FZ44Eqlu1%2BRi%2BxQE1rIAtDwnilTvcpRTn7fkb5vI6TEPkAozt8D9pvX4cSUMlJIgpJUvIQOvZCdO07NKdlG%2B%2F%2F%2BITFTcn5wtfKIr2bWYXnSpg2bR8568i2LVmKLGEmASs9DK8Vhq5QAP53haxp8L1k1u%2BeCDl9%2BGoYeMP%2Fyy84GOqUBOFzk3fwf8tJpCYLv2wrFHWqJnVBTUX%2BjelfAA3b6aoiugVQAjUk56GsobqiGmqXfEdpsZojfcAsnOj1%2FNXHJACv35joGNlNQ4%2F%2FRKANIpZEaIpCsijeJWFlJWxkelfnhv6MPiTMDwcG7iFd3mbnrnQJJU2XCYAhJoUzDde6nRyPh5ECXd96GHw11OcXgLg00C65EXa5tkTm%2BC1hqsDqA3wiwsEWK&X-Amz-Signature=0b12cb5e49e93fa5b238b9172b00e85330805c06b966b9e8e9c09f0a45b685b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

