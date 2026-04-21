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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RSP4AXZ5%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T165940Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIG7vmtTtvOcDnwlQzWf%2F49WtMXzMkdUdP0XPqrufwuKeAiEAmZ6S%2BMgGKbwVlnHzSpHtvyuFl2dEZnf62iiTmt20jtgq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDEYA02K1NzA%2F1MMwISrcA1RlYYsVP7n5Bm6DCvqYv9ckDqEEOru54AbVmcFKCmkG%2BCuW%2FaSSQJxFy5%2BAzCm4f4iD%2FRzsK8wuU%2BJjUQmvefs1mAyC5CggZpkt%2Bo4ub0j2os0sHHfu30aUGpIuKVqH0NUQop%2BOsPh5kKFPE%2BmOKqDC9bMifQmeMQf02wlVe0s7H1qUfHx2lM%2F%2FvALGWlHBSBCAN%2F%2FRi11JcGSQkpWAhoNR1qlZ3Kr9t9Ed%2FMCbbMcCsFrGD%2BQP8t5wwxhNUDItXWBhS45ZU00fkPTNi2oQKOkLdldPpTyJ8Kt8LIQKrnBYYcRADlFMA3mrUbPs9h4Hbv%2B6d2jFL1eRZl1wsRyhvaxILgZQIqa9oJdNxX6p6YWtYixCzFcIBMgYwDmLnHu8iOLmXHNT2DxUU5FdPHDKskvh%2Bb90ZbCz4ExLK5SutzD6zA75flBB%2F5I6UTD%2FUEwsLWzWcYWmqWpsj1IeRxT%2BCDmMPgVBmyNnK5mvyJT1EIj6wswIFCOt1zxg7BsyYG2mJWSaSZwHxCoG5fOaIJkX7735oMef5v8X0yXSZw83hYAdmjSTY2r7gxUKSRDE1Mjzhzd%2FE%2FpuvTQUcle4WMavEdT7Unv1fqNtI%2F%2FjjoamQcnw4Gq6wJkeBy2SDueYMNbYns8GOqUBUiOEm8xbjBl44OYgH%2FNVee7OKtIYXUl226E%2B%2FTT5%2BqK0f7QNfoB%2Bw50wUCHBCua4I%2BH1m%2BsLw7vriVsZMPON7gomF2Sf41Ckcll%2BXGylZuNKuMFcCJtrBH81fNJSX31WIWiyIoN34U9fK%2FziwfOFdJBccnAxqSofagjuZXpRmmTFmbFYBLSmFf871UP1ZTr9%2FAEU0URqcid8kFy%2FgjpqAvAlvZ7S&X-Amz-Signature=97ccdb0923f808ea8b678ff8b9bc8dabda50d04d2cf8ba438a12feb856a4ae9a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RSP4AXZ5%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T165940Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIG7vmtTtvOcDnwlQzWf%2F49WtMXzMkdUdP0XPqrufwuKeAiEAmZ6S%2BMgGKbwVlnHzSpHtvyuFl2dEZnf62iiTmt20jtgq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDEYA02K1NzA%2F1MMwISrcA1RlYYsVP7n5Bm6DCvqYv9ckDqEEOru54AbVmcFKCmkG%2BCuW%2FaSSQJxFy5%2BAzCm4f4iD%2FRzsK8wuU%2BJjUQmvefs1mAyC5CggZpkt%2Bo4ub0j2os0sHHfu30aUGpIuKVqH0NUQop%2BOsPh5kKFPE%2BmOKqDC9bMifQmeMQf02wlVe0s7H1qUfHx2lM%2F%2FvALGWlHBSBCAN%2F%2FRi11JcGSQkpWAhoNR1qlZ3Kr9t9Ed%2FMCbbMcCsFrGD%2BQP8t5wwxhNUDItXWBhS45ZU00fkPTNi2oQKOkLdldPpTyJ8Kt8LIQKrnBYYcRADlFMA3mrUbPs9h4Hbv%2B6d2jFL1eRZl1wsRyhvaxILgZQIqa9oJdNxX6p6YWtYixCzFcIBMgYwDmLnHu8iOLmXHNT2DxUU5FdPHDKskvh%2Bb90ZbCz4ExLK5SutzD6zA75flBB%2F5I6UTD%2FUEwsLWzWcYWmqWpsj1IeRxT%2BCDmMPgVBmyNnK5mvyJT1EIj6wswIFCOt1zxg7BsyYG2mJWSaSZwHxCoG5fOaIJkX7735oMef5v8X0yXSZw83hYAdmjSTY2r7gxUKSRDE1Mjzhzd%2FE%2FpuvTQUcle4WMavEdT7Unv1fqNtI%2F%2FjjoamQcnw4Gq6wJkeBy2SDueYMNbYns8GOqUBUiOEm8xbjBl44OYgH%2FNVee7OKtIYXUl226E%2B%2FTT5%2BqK0f7QNfoB%2Bw50wUCHBCua4I%2BH1m%2BsLw7vriVsZMPON7gomF2Sf41Ckcll%2BXGylZuNKuMFcCJtrBH81fNJSX31WIWiyIoN34U9fK%2FziwfOFdJBccnAxqSofagjuZXpRmmTFmbFYBLSmFf871UP1ZTr9%2FAEU0URqcid8kFy%2FgjpqAvAlvZ7S&X-Amz-Signature=97ccdb0923f808ea8b678ff8b9bc8dabda50d04d2cf8ba438a12feb856a4ae9a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662W36WXU6%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T165940Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIF%2FAEDhIOTVxaY72Qi%2BnwZoCTUTguHNUGQ%2FI6f%2FYGobkAiEAgawlD6vYdUnPvsh7kmE8LH%2FYbhJVVDk2zSULXRqC2dYq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDG6OavX1BPfzRW9PXSrcAzczfR15uIHz83DnIwAvpQL9cpO0H7b4oRiA3xu2wIhAlPVpZISx2O6K8OZD51MVZbGgTkpqCF5M0ECQarOaDt9pjBxhwl0depYzHXeUT6TBWMTy3EXogb6MEoLkxhbbZN1HMqOiZpuxGMqowrwAn2pB4fO59HrQgmp0tjq5AdeIo8iPny0IBEjfvQM68edGw51HWJH4aBXttvsJ04ndfadur6xS2PrAFjZ3AM70PkOU8Qx80hgdHsm7ixTvKLgyIL0GsVY0eAsz3uY32aqpCRTK7288eP%2FyIV%2FKbMo1B4JTelnb6AbSPvBAykjSTEJnmMWLXQmKjt%2B1pWK7ysbz6asZsd3uEcOmz5TG5ImO8ofn4P%2FBRrQCYgY6qp%2BwOId%2Bv3MvJCF4GgpiyhsSd4F022zWjXePfqrUwS6XNz2l7A8Ygfjwq75tRoA41aFl5IJZbTmnqnZFdMf3TDUJG9r%2FIPWvCBGHIstfcIA5t5kZebAwBAED66XB%2FYAqbKM1VXzAyP4lc70xI4%2FYlkGF442nm7scHLAmSxfNxWwZR2ZNPOIx%2FZVLRUEdIkeM3I0ETiw7g%2FTjKyfmXu19W4hsgdoKTl9J3jlzQj2K%2BLbPv8%2FhZajvxm2HCeqgw4m8IKTuMJezns8GOqUBOeozHYHnNxeBW2H4ET28JRquW4fvbGoOCUCP6Y5r8fvN38LlBlkzveJVJcI%2BhJu6Biw7I0yWpFIbDw290qpF95iYgbaivqJAzmN28ajqpVTpc%2BEoVMGW79EjnVCEeiCdqbSx15GCoNbol%2BBKbF98AHOUWI6%2Bl9P6q1Y2kAmIiAI%2FpyjvmwiSjnigjpdnImZX9Kl408zvzsIKkQ2GrZ%2B6B6ozSo84&X-Amz-Signature=3524eac18ebda508e2354935bc241c6c69b2dac91751efe8743e89d000e5a88e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466622T6QWP%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T165941Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQCKXwIN8v3W1I4Sdu7r%2BsciJw3pFRWmBIR79lzDKDguNgIhANGVIS8D%2FwkfE%2FdUUNNr7XFnnWE7bH6t2iIz%2B6t9pDIxKv8DCDoQABoMNjM3NDIzMTgzODA1IgxC50zsqZdL3FPgIBQq3APApwSsBiSfk6VqHSoB7FVpDrAsMCtiUUQgEzXOkROlR9G6ztKb5F0WbE4S9s58fmEh2Dyau%2BlAJrGQxJSO%2FwKBP2AQSfL%2B6LLX8rWJwJZ5yL%2FzF96KXk6VjEc1mfFXgnRuxx7fR9wSe4jWz20MwXVwB2vc6D32LHefWfB1N3aXFDzDNlbZayEqW6MF2kH4BmiPvcF229yG3fyl%2F9EuDcnBU88%2FyWdhn0I%2FLZ8AxxOVmWq5AaC0uIJt%2BY8%2FsO%2BMfnVmSpojxRTrRE7kKd0zXQUHWrW%2BE1xIBLfg1YIO%2Flh9XfTJizuR8IHwMD0pzIG%2FYQ%2Boxt3ZnUN%2BYTpvmw31mk8wEGYnRMvgJcx3qwZ4PiwLSVHmCgaj8jTCLk7BJkDRekVs5n%2FXKeE1C8R3DMruOh0mHB2P6B2tka5XIZgui9i%2FMIcd53QWVn9VSatFJ9YeWebYDX0FuzCGFJSmRbe7iI1Z8Muu8L1idv7Hn4mhImAmhKypKTaaMAuEdJmW7ni1pd31rjN7epDj%2FhiZj3aDUP8oGNjrVT%2FO1MGwWB89zGWj0lhjiFiYQ%2BAqcFQySGll%2BPjNEuKodDeqG1gxvNh%2BtLp5WmsIIItnEYGlg4tIaUC9xVv7ENEV6lNbVbDBIjCi2J7PBjqkAS3dZh5E246dtsagnHnBb50FI0sK%2BAgOD1JchEYd9py83xf4ktNWSgLSlgnkanb5s0oOF5hHmOjKYAwsQ4%2BN58rZF9FpdHg2%2B7q3H7v3UL55Vp0MyHwcc1YNhzOCE46%2FdfmUlGoGdW1JUt6EEoGIyo25M%2FapQEV7vYlbRF9z0pRKuaBIvPce%2F609uGmJXztGO%2FLp8EgVzuq2XaFO%2FHCwqatkKPO6&X-Amz-Signature=f8cfc0cc738db554cbe7b8c8e37b756783f75ad15ae6f408f96d53e84ace7c19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466622T6QWP%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T165941Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQCKXwIN8v3W1I4Sdu7r%2BsciJw3pFRWmBIR79lzDKDguNgIhANGVIS8D%2FwkfE%2FdUUNNr7XFnnWE7bH6t2iIz%2B6t9pDIxKv8DCDoQABoMNjM3NDIzMTgzODA1IgxC50zsqZdL3FPgIBQq3APApwSsBiSfk6VqHSoB7FVpDrAsMCtiUUQgEzXOkROlR9G6ztKb5F0WbE4S9s58fmEh2Dyau%2BlAJrGQxJSO%2FwKBP2AQSfL%2B6LLX8rWJwJZ5yL%2FzF96KXk6VjEc1mfFXgnRuxx7fR9wSe4jWz20MwXVwB2vc6D32LHefWfB1N3aXFDzDNlbZayEqW6MF2kH4BmiPvcF229yG3fyl%2F9EuDcnBU88%2FyWdhn0I%2FLZ8AxxOVmWq5AaC0uIJt%2BY8%2FsO%2BMfnVmSpojxRTrRE7kKd0zXQUHWrW%2BE1xIBLfg1YIO%2Flh9XfTJizuR8IHwMD0pzIG%2FYQ%2Boxt3ZnUN%2BYTpvmw31mk8wEGYnRMvgJcx3qwZ4PiwLSVHmCgaj8jTCLk7BJkDRekVs5n%2FXKeE1C8R3DMruOh0mHB2P6B2tka5XIZgui9i%2FMIcd53QWVn9VSatFJ9YeWebYDX0FuzCGFJSmRbe7iI1Z8Muu8L1idv7Hn4mhImAmhKypKTaaMAuEdJmW7ni1pd31rjN7epDj%2FhiZj3aDUP8oGNjrVT%2FO1MGwWB89zGWj0lhjiFiYQ%2BAqcFQySGll%2BPjNEuKodDeqG1gxvNh%2BtLp5WmsIIItnEYGlg4tIaUC9xVv7ENEV6lNbVbDBIjCi2J7PBjqkAS3dZh5E246dtsagnHnBb50FI0sK%2BAgOD1JchEYd9py83xf4ktNWSgLSlgnkanb5s0oOF5hHmOjKYAwsQ4%2BN58rZF9FpdHg2%2B7q3H7v3UL55Vp0MyHwcc1YNhzOCE46%2FdfmUlGoGdW1JUt6EEoGIyo25M%2FapQEV7vYlbRF9z0pRKuaBIvPce%2F609uGmJXztGO%2FLp8EgVzuq2XaFO%2FHCwqatkKPO6&X-Amz-Signature=41a85971a50a3584566562ad75f13d86c17eb6349f201de740144d18ffcca266&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646IVK36T%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T165941Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIGBA8oGSuwZkY3rA7Q2YwocFQ6MZyxWUhpjxa2Kg%2BkPsAiEA3lveCmQ7S%2Bm8QpA9s%2F9Lkj93ZVngxYAd32sbXzHu70oq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDK8A%2Bnzot5exgqE53SrcAwzR0%2B2XdVFGd9Kie9oK9hfqogEWzPkSFtSP5cxtuRbHoDIqiVzuIBsvOBHImn4zfgnfikp64npWFd54w5QuhpzkoK%2F%2Bg7LS%2BMetJSA8iyP%2BBVU2oAz07B1mIJKz%2FWEI42zkptj3hWqoMwBqXItcHQ7rrc9aJ92354g%2B3IVZpPzaMwK5vY0B33LxpWKV9vv6duakHrTt6A50FtXgco1qEirL4JAEbjT4%2FFtEpOHnTutqs2EIPfhg9GsMfb%2FY7UV6zK8YVVQT%2BeYkWMETw2sNF1etkdEiVr4JRJyikaus%2FRQ9HT3JbNNoc8ignwG3d1z4VfkhUYyvA58WHPXEpkAn2HsnXQ2HD3X54qjzc%2FvIRqW%2Fu%2FSEE%2Fi1D7el25eCu4hoTqXV1%2BWmP9JsLr8fLTj4e4uWRuUaHhj8ItTlKhjEiemWkIcQeEWgWBtsLfh0%2FGluD3yL7F4oLBC2ln5UxCfYclLn5k6ok7Fr52Evrq0DeBLyRwyH%2BBhEE7Vw%2F%2FNey307LtkFAQ7REQYJHCpjqeVmL%2Bs9t%2BsPd7qCsVm3FYnf7%2Bd231efhHiZ0Az8vjdOlATl%2Bdl9dA4Oo7rr2rOE2sZGkLbHTjfTUsILCSu1dHbEZ2bFUgymr%2FIuAKfWa4YlMLLYns8GOqUBcF7MtYaaf8JyQ3dFgVGBSzy69WpzQMjEoMlIOlq%2FKuEpJAkRAw%2BT0r4uuc7H8aU3j5rg0mx9Mvs7R2kVgH%2F5u%2BezKfwbwvsM7yw5xyUItn0UK5wGnhMtbw8BFidVAKRzE0ngOBOdSAmw1WDz5pTS3xNDlgu4PZ1rBO%2BVdC0p7cKl3Tr%2FRq2Nj545xjSLG7Ao14ql2I%2BNiA4b814BIfX3BKrfoUe3&X-Amz-Signature=d64da26c6de1f494d2a0e9b4d9fdc99020668a4822dbf1886924e8ecfaffbf04&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674PPP7SO%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T165942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJGMEQCIBG%2FyBbX46ZQSeaATDYjAIT8BLJYeD2bvGseh9UgM1dWAiARDqbbtIjChPKmA9%2FKNB6bxo20D5qXdKSE4LlcRpY0NCr%2FAwg6EAAaDDYzNzQyMzE4MzgwNSIMcDXLDYLp0UzJtK1RKtwDNCfzHwO3wlzVWOONo%2BpXuE5AhWCOyMO0TVvF%2FJsfooOuN5XLOr3ldAv8SRawW05B0vjGkznWkk0uSt8TXFt%2BDPfsYyXFot3gp1iboiHk0mfwMtDWPU3aMOEfA0yFeV%2F0Cx84duF4N3PLKS3G9nOnzKlcsXnKPSix9Ao1vgYCCX%2Bxoe6u6%2FOSikLHuQ5tnFqb%2FGTQKkqVdoyTPcZbU5domRaEeCMuZYlNF8LcIvgNcBbRsnAtW7IvthCFEUvIjuIYqYb%2BKw7KIXeObLabk1X7d4PRcIXWuGG4rVvNJmcOX9KCr9l5D%2FiUsNg%2BivT%2BWDTq7M4L55N48jXJ0PoIp21%2Bwm9fpMB%2BXRTBco4MrA5i7i4S9A5I1e61OQkUeZINBfePrAfSMQf%2BfUTKzzysER6KY7dvLk8AUPhoJ4LsZ6wtBiVF6FeCZK%2FLwODzaGyXew4GwljkS5%2BkJdJgESD4HsG5Zs1LFdsUiMUOhR%2BkYMZ4pfp%2FWpj2%2B5vymAwkUKD9vMU8DNwe4ospA7YOx21HCekIbNRoADL%2BCZrhW4jsvc3hQCQds8lpfmQ7sqZdfEj%2FSv%2Fsg9IQifsxthJYItilS3PgHT%2BQpIp7TymSp0UKLi0bddriM5gmksgy9EEEicgw3diezwY6pgH2HaK1o5Hk27dBc6lf0ZSlSR0T6x2IWrx7PvTfu6TiwNeHA0j0xGUBXGpW2JzOGxYxSL6OuC3RNMECaQYHWguNHbmYWUXJrZB%2B4XPQIgYxi3YSbyMfIRehpT88karHjq1doPpqWvKogWTpO0JeaLk%2BA7bLgW%2BMnF5%2FwG8WFeF0SI8TeKpZD1UYAou0m%2FSLOC%2Bj61pLjY8KstgjriYQPULIhc4OBLvE&X-Amz-Signature=bb14d283099153ef5c0d576d6acf7193b721bd83fd7b15c959f8b1cb90366481&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UXGTHQLH%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T165942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJGMEQCIFN410g4pz83bCvt890PV8JqTmLypXRxidb4do1n8tRqAiB4LROZm%2FGhCUmjFQEN0j6VzTBMOaju%2BTUOIYOoIcw7qir%2FAwg5EAAaDDYzNzQyMzE4MzgwNSIMHJVFegr01A5cQmQsKtwD9rlSUjo1re8sWaOv7imUOvt7FBXwZE%2B62HXZBeo76tpompdjvmNaZJsfwvMBAJNfiCMiEtylHTt3H6SS3ykgR0eh5Ikd9bfdkYQ6mInBx%2F1q73ANuBDNggnTgejFmNH6mmIrEk8QynHTG7GfcsV446hK6sGFloX0XeBPJQBUXt0yxapgdvYWI6D5kAjpara3Qw5rbaB%2F7iBNVefVU1Y%2FZW7Z47NVOH3VALdOAsNUM%2BlccO%2FaR0kUROYov3qlV7UfCRjJY1iaHTdZ1Zz93l2oDpahQMdeNVSlgSYjxNFSFR4IJIkiXoxxLnMnGStZnWilITCUjxUOIVw2RhqQ%2F8NhaP6LwlbNxEKQ8dpaqz0V0mI1IafiOyvlFZ6LETLE6YQaU8JkSKWT%2F%2FUIcno1WmTsATjwqdwq%2FCmK2qXEj4OLip1ZujJTpfJFnUt2p6LQMN%2FaeoUw7lSe9UoB2KhmIou2g0qpitdsSaUa5XUVjoijUMC6gZ9x5laxiJGqvJafDwSc7K8jg24p3DZIchG0tFkXprpTWGnT2bA%2FP3N7BvGCynGDXeLv0gY%2F9lskeEiHlpbzesSmWDdxogmo2d93Rmn2EK9llWxGMZdaYmMHmXKUC%2FwTV%2FnHof1I8%2B%2BNsmowgbSezwY6pgGZo3YtPiRqmn20A1kAPs1Xxkfs4l8DCQxrEaqnCaCpQJb4VMT9D4eUsKrSrjIMb8cfyuKguYJmdDFMTA5%2B8pNhtLsCwUtH9cRKEU6HsygjE7K%2BrtItDZHgfWtSgk%2B6V2zRgkrvILJJ1V5rQx4lpxCGHCNFGfClIKtIBsf3hFF7%2FCpO%2BHCdRZ7W2sxFAPeV1%2FI7v83V9d%2Fkob2qK4S%2Fps6haz%2BEWijv&X-Amz-Signature=4a7b68183e41fd85231bc5718e495ad995de1486b6b84632a85041ecc2595053&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HZ3QRIZ%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T165946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQCCyOpgqgLASBQ4v9P0cbkJZg%2B14CNFAJDH7KUa09FFKAIgQQ7Tt4eqy7tbkhjpNOMRg4VGSe7e6vd9wtRvjjk830Aq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDBco61OJJrCO8whnUircA4xFadllWyM4NLk0JCruW2H2E4OXYkEcP8YF5j561QrtnF7cD9%2FN8oC%2BR1Hdmr8OC8Fqq6Do6VMenB8KnU2qkZU%2FZzmkVHdrUdCY8or0T0bWDrci42gTDU42%2FVC70cmikBqknCsY3cz2yAplLqMnu0yd5tsglG4VFmWn3O4Vzh%2Bg%2F9unRtptNL0NmUtvQ5oHgdV7jH5lFlN2dhvLTMMMaqf9b%2BNRRufJq1BdUejhLnjr6sqWdgFGQ4LUnhdEhpZ0W%2F0EfhsYAzNVzd5br0BPsK5ac18M3nKvNY3u%2Bhu5bwF8LxGp3a60OqzaJxReq2ZSkphC1lLZSGo3N6ewwCHAPpFSrmzBb5FMB%2BrKmjBGSXocqwKcS9rCeFn0VNdHclEdgKXVEhz9ySfcSKL2h2AhwTUQtabVbbGpnXoNQwcwjSe2lCaBgOQwlBGm6PZrPAqiRKNA%2FIK7Sq%2F10%2FQeuM6WZEu6K1w073GZT6z%2F08FsWLRv0jVskeM%2BYHyGrrHvIIvgUT%2B89IksTqOfwDTaHGGeRFI%2BrDK9Hsz1q3ppUOqtAnduNslaByfxxeYi1E3v0kHq%2Fxmx%2F%2FDpbG%2BH54eJj3zR9JcqCn7QqmEy%2BbdsEYFXPrE0iJ4lmd2h72EsBcixMOawns8GOqUBxOZcz6%2BKe7CC%2FomBkd7XjJQbBfDy4IA2bzydax6yqk78I5Qv5kPcxHhaR%2F%2F7JWAHs24UTNZX27WS0kFbMk42QTBYtkEy4IFl0h%2BayEQaYz4phmZIH6vsFT4VH5agrgL7ZZOiNJjQ4xdA35%2FutmobvcBUD1pExiARzbcRksX5N0vRJHASyxCtoVeTQHnsbTtWJeqQLwAyZVlGDClQlwWek4EoXHjZ&X-Amz-Signature=25ef03d248203670beef64597835a5571362823ee743196bd6e56825fe5355b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HZ3QRIZ%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T165946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQCCyOpgqgLASBQ4v9P0cbkJZg%2B14CNFAJDH7KUa09FFKAIgQQ7Tt4eqy7tbkhjpNOMRg4VGSe7e6vd9wtRvjjk830Aq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDBco61OJJrCO8whnUircA4xFadllWyM4NLk0JCruW2H2E4OXYkEcP8YF5j561QrtnF7cD9%2FN8oC%2BR1Hdmr8OC8Fqq6Do6VMenB8KnU2qkZU%2FZzmkVHdrUdCY8or0T0bWDrci42gTDU42%2FVC70cmikBqknCsY3cz2yAplLqMnu0yd5tsglG4VFmWn3O4Vzh%2Bg%2F9unRtptNL0NmUtvQ5oHgdV7jH5lFlN2dhvLTMMMaqf9b%2BNRRufJq1BdUejhLnjr6sqWdgFGQ4LUnhdEhpZ0W%2F0EfhsYAzNVzd5br0BPsK5ac18M3nKvNY3u%2Bhu5bwF8LxGp3a60OqzaJxReq2ZSkphC1lLZSGo3N6ewwCHAPpFSrmzBb5FMB%2BrKmjBGSXocqwKcS9rCeFn0VNdHclEdgKXVEhz9ySfcSKL2h2AhwTUQtabVbbGpnXoNQwcwjSe2lCaBgOQwlBGm6PZrPAqiRKNA%2FIK7Sq%2F10%2FQeuM6WZEu6K1w073GZT6z%2F08FsWLRv0jVskeM%2BYHyGrrHvIIvgUT%2B89IksTqOfwDTaHGGeRFI%2BrDK9Hsz1q3ppUOqtAnduNslaByfxxeYi1E3v0kHq%2Fxmx%2F%2FDpbG%2BH54eJj3zR9JcqCn7QqmEy%2BbdsEYFXPrE0iJ4lmd2h72EsBcixMOawns8GOqUBxOZcz6%2BKe7CC%2FomBkd7XjJQbBfDy4IA2bzydax6yqk78I5Qv5kPcxHhaR%2F%2F7JWAHs24UTNZX27WS0kFbMk42QTBYtkEy4IFl0h%2BayEQaYz4phmZIH6vsFT4VH5agrgL7ZZOiNJjQ4xdA35%2FutmobvcBUD1pExiARzbcRksX5N0vRJHASyxCtoVeTQHnsbTtWJeqQLwAyZVlGDClQlwWek4EoXHjZ&X-Amz-Signature=e687cc4ce6b316444bd6a5ce29147b1a7515613ce801ff6ac09ba0334ba337ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UOE5EYM2%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T165938Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQDWCPBi%2FMbjf6ESXIGCuHmXJT4TFYXl9ikXCEsgfJk0EAIgXk9q1evgf3omK2e6%2BD6%2F7yJnD6MEYOYIS4qqwpLwU6gq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDPd0%2FYZO8bhZBOKawircA9UMhyq%2Bh9m0oZmTKbM5IxTZKW37ZcwAuczT%2FjvUeYkCxQ6TsP83EHlS6n61UEYU0ApopLLkDSP9Nr4ANs8DgntCx7Q529ulAOB47nTkwOh2Xx%2FcxJvRANe4hPhUc1QmHikz4BWPD%2FL9xb%2F%2B3m26DjgjAlai5bKun4z5mKJHwRbEwFOWEskwQLQEpZ8y3L%2BzZd3KLdIev5sdTXSR3mFlT5PQkxnTjv%2F8Il42KfAXwTjdVuyvyJlm7g0s1juCGHAOSUKwOSa5nAa3f7fZr9GxI7gSxnDWXTBbP85%2B4XB3QpxSA8VAr6y9bQthWjzx456dZSu7vKvVKc3IoNsXz%2BtSYwBNgm0ZQ7bijnr9T1uI%2FscOkxbdE2hD%2FwvWB3vWOErt31lXK264AfGrUhzEkg2llYbcts62N%2BLX1rc7naX2uEOzLNGoP%2B7XtoK3a0fWgwfHihOgQ49i1p0cvAPMrdanGgVe3ne%2FRdNBH8lfvr2WOZrQ4QxUO0zZ4sGjGW64M4xIsTEcvl1MzI%2BlNre2Tur6MHbcU83iJZvA3AWTU%2FoSjFQePMBGVOr0gHBtWPlVHmBl6YMN%2FgmK1MzxitJ0OAuejz2eWJEqdW7gAl850vhAYwwcI9%2BECpsuRIpaiANVMNuxns8GOqUBiHD5UtOJsNSz%2FqDqdn9A%2F%2BNjKV08M%2BH%2BYCcA00s8IaQzhtLv8%2BTIIrd2gVCkNQIu5eM3ANPJwM6FkQG9jB6XjMjcYksMJrR5%2Ft75HsmMDAGGLBHSjQwpIP4GdJzJHGKIN7cMA%2FQ7LfGDt3j6SboixLZ%2BPLsjjoKpaLkByFR8mas2JTbq5ptR6IPnpo1sV9o21%2FZIvtk3W9MLXNKx5Ca5t%2FXuwwkg&X-Amz-Signature=4cbf9cd2d55eee3fc2cc16614ce16fd87a2203547141e86438258ddd68a50b08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZRH6MUX%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T165946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIF3vmrsE6vS5oRAgsxUvZBBifDvETZl3mmLgWaIjjxgoAiEAyazTAKVC%2Bckh5EJQu%2FtaGH4KK7%2FPYreiVr3Ium%2BB190q%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDEcHjWAzYlx1uAH%2FQCrcA%2BU3bmG6g80C51P32lriKzCj%2Bzz20K1eIXtM%2FrCSOcg6uP6wHrNKlW8d1nHVVQsdzP6tfuyBbogComP4TAr4maI3RDnhpB8I6tPQrhQRr%2B2phy9oAxjclQ%2By%2BLrgunjojWE0WBh2Uar%2FHIRfRy%2FpKbSlvYo82YQ3bJ8%2FK6%2BtmXIba7jvk4ah%2FtzOGO2bIgnxyc5TKAoCtfwjuRw4KkT517CBPqXulg3S%2BH1xtzDph3yhIVZZbqL3SBbbFeoHBNtXlclxqoUFp0sU37WfaRB9Ui%2B6oiVkLHImWMfWJSMHgGSrslfIq1sJPAE2ot73SC%2BGqwWHGKvrFuXObL6%2Fktr%2BcqR1IPyrIMScYBrPKdnkESqoyt38%2B43r7eywKcQrVPf5E7m%2FgI3MylgxSFr%2BypvFG4Vm161V9Ux0RschTH4euipGgCtcCVS1HOo37STctV%2FtL53D04KYtkFO3cy6mXbM0%2FLNwohWFRshpGpV1aNmmWs1BaHA94NfUoyQS93H0bmuriyfvdscd5xlFtPNJUKpvMNVcUOXdIyaZm0pywONosMY5ltWn%2BEaW9A19TpWGAl5YU4RqPbXvjdcIG1DJRN%2FsN7GTbDYiNGCIvoZ7tIAhw2v5VNVin4dpMb3iSDBMKjYns8GOqUBJp0BP87%2Fewz4t8x7kAlnW1kQCSlCNyjNcDsaA4J20v8%2BzLubh%2B4mUefxwgbcMMGLEwTQdQq2lGSZQ5BC1ciBnYRK%2Fr%2BC19gWz6fz%2BNcmOan%2BAKFlcTbUiCQaBck2LpFwfex3Ss7IC1VHGnMuqXuGGaezF6Jp3h4QhQzium6oiVBmWMsj02VGbFcvezsA4uO7gO3TlCfFLFQ%2BQ8ormZOqPcuOQLHf&X-Amz-Signature=ed08176414fc246e47b6a7870ff0a3384d708fdfecdbb3618d677cdc0a343d2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZRH6MUX%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T165946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIF3vmrsE6vS5oRAgsxUvZBBifDvETZl3mmLgWaIjjxgoAiEAyazTAKVC%2Bckh5EJQu%2FtaGH4KK7%2FPYreiVr3Ium%2BB190q%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDEcHjWAzYlx1uAH%2FQCrcA%2BU3bmG6g80C51P32lriKzCj%2Bzz20K1eIXtM%2FrCSOcg6uP6wHrNKlW8d1nHVVQsdzP6tfuyBbogComP4TAr4maI3RDnhpB8I6tPQrhQRr%2B2phy9oAxjclQ%2By%2BLrgunjojWE0WBh2Uar%2FHIRfRy%2FpKbSlvYo82YQ3bJ8%2FK6%2BtmXIba7jvk4ah%2FtzOGO2bIgnxyc5TKAoCtfwjuRw4KkT517CBPqXulg3S%2BH1xtzDph3yhIVZZbqL3SBbbFeoHBNtXlclxqoUFp0sU37WfaRB9Ui%2B6oiVkLHImWMfWJSMHgGSrslfIq1sJPAE2ot73SC%2BGqwWHGKvrFuXObL6%2Fktr%2BcqR1IPyrIMScYBrPKdnkESqoyt38%2B43r7eywKcQrVPf5E7m%2FgI3MylgxSFr%2BypvFG4Vm161V9Ux0RschTH4euipGgCtcCVS1HOo37STctV%2FtL53D04KYtkFO3cy6mXbM0%2FLNwohWFRshpGpV1aNmmWs1BaHA94NfUoyQS93H0bmuriyfvdscd5xlFtPNJUKpvMNVcUOXdIyaZm0pywONosMY5ltWn%2BEaW9A19TpWGAl5YU4RqPbXvjdcIG1DJRN%2FsN7GTbDYiNGCIvoZ7tIAhw2v5VNVin4dpMb3iSDBMKjYns8GOqUBJp0BP87%2Fewz4t8x7kAlnW1kQCSlCNyjNcDsaA4J20v8%2BzLubh%2B4mUefxwgbcMMGLEwTQdQq2lGSZQ5BC1ciBnYRK%2Fr%2BC19gWz6fz%2BNcmOan%2BAKFlcTbUiCQaBck2LpFwfex3Ss7IC1VHGnMuqXuGGaezF6Jp3h4QhQzium6oiVBmWMsj02VGbFcvezsA4uO7gO3TlCfFLFQ%2BQ8ormZOqPcuOQLHf&X-Amz-Signature=ed08176414fc246e47b6a7870ff0a3384d708fdfecdbb3618d677cdc0a343d2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46664N5FT7X%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T165947Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQD8aQKsXUZnO8HFKhNFDNQN85WFi5iDdIH7pZYtN4xQHAIhAOD0%2BiCQagOkBYtyk5HJXwtmTz43ciufDsf7hINSylUCKv8DCDoQABoMNjM3NDIzMTgzODA1Igw9%2B9DxzFV7aoCIfpAq3APrI5cfZVZADUwlrD80zxfhK2os4STizMnEJiEMZ8bN%2FwHzyqishQJVkfbKn6PQ%2B%2BO%2FcBGObQL%2B7n0AKecnbPcaOPxt7U2pgfkQUWajyEAPnIUuyKK3HkTQnN7n2nRybrCdjtlWPaSTQfDtTtWpo4r1KRZgLbVjbwX%2FFxz5EdZFva0mXawURnldJFJnbqeLosnOyH0j3rW0vEFpI0sVFzmHPHAyZs82Kw8jKB0042wPhMY3%2B3N6kGgWQC4aMEGH4YmBqYyugQ1BxzwWJXWoWVPL%2F97Sizr84mWxiOvDeDHTXRjf%2FoM30fvHxWzw2sRC2yCsXOWii6KgFweVrQHgqV5OIiLwzKlZPIEN8ukgOogvWu%2FsAWE3SQ652j3pLN9x%2FaKAdR8%2Bjso0qIvnuIht7H81paEEVYlN6l01jwE9I7o80o5Gh3goGUI1RPIEk3nDVDQ6Qev5CaVJ%2FfmMRZNJSgXZztoQvaPXYGHSS4ONKZsChDZRul0kKjIXoDQbe2AqjFF1N2yMsdBVRgMaA5m3I%2BJWIZQDDO6J7jFwWx3EmX926WsbUkCoO%2BlnkPYO1a1lK8tTlShjQACeDZSdKHEoEDTIb9ZfXJ8L9HeMA2qDxLoh8vRRm5Z1c25MH9zyvTD1157PBjqkAZShbhXhjhlg02xgCKkG%2BVKylKOvzN4pm6wHiy%2F40Z48BkIkD277a1j2cxrxdGaWEPxivNfkpMGMf08DJGC7NJAaxMOPqj94SIr4rZwHvJxs5k5s6jcnudEuUqd%2BeTgEYOdhe9cKRksX%2FFwQW8KVZCdnnPyV7RtYF7rB7zyJUVDkwZXcdOJprdF9IkR4euMddWnOAtD9roWVcQP9%2BYSZsphIyzUw&X-Amz-Signature=b3db9a9e85d75a4aeb4e3b4f03162814421ad8dafd1c20f3b6cdc07e0f9407cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

