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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633HQW4YG%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T114811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEs6oezPXU%2Fq22Fu0yfn%2FSnNbKGjeBSh%2BqKjq%2FzC3k3kAiBDvSe%2B3EvrF7Q7BUBuMPFs6pMOVMISIyBMMsODTBUhDyr%2FAwhLEAAaDDYzNzQyMzE4MzgwNSIMtVfes99AjGRvhXIsKtwD%2Bm6iUhhz5g89szgJZlisSYTvJTxiiZiCUQ0k5Qk9sTwmDKbVzVbA%2BHKfIUQHF8HSZQCti%2BhKPq4k053DS7eSw8txjpu1Sn4Qq%2BT8Ex%2FclMDEU4EfDHbAZAJUFouZcWwjX6WjmPtYtCvkcT2os7IvvEZvewbb3STYNSLA1KHf3qveqgjEEy8DRoSus4hyune3wE%2B7dIzIHjmeSaqWHKaLw05kczmMz6GNAVV0X0XTznYor6t3vzbVEMENuU9WAD8nkZQNUyXxMrB0TVa4KEc5M3YQqtKEJRoK4rOdUA7l6zAiVhjZDqmdOy1JjdUmZ63GxYYivd5X3KLnOQJ39XQ7VJVwXsVq1Oi0X4cg6eYaHBe5ldltuP6BeHhux59LomWdSjgOo00WFumzmdsQNwI6qobszPBIkzQFiMEGrl2i3dPlZCddE6KuUeeqdd4QSvwSYDfQhdDvkXr%2FxTyFfofYpnLKPuEXK94iqVQj7f92Cm4DaZg9%2B0eYO2oARReSlW2eQqT2vYspGuavrOQlhU2C6R1K9T8gipax1ObexRlHJQ8Cml0XzVgnPjtJsA8jxRk5z5TOri2iezhnp0Uap7SZY73za3GujVdWqgyqHJQnoVS1fse6%2BTE4t8SUTOQw38SizwY6pgFU%2F6JTWFbkLYc7JKELXkKmB6jKXXcaAEFu1kPqNUk2ZsxE%2BK7AzpbwGOhBAF5dE5ZwIIy5Yp2m6ECC%2Fuj8JediMwCg%2FdCj9f3hdgFTyFs%2Fi0J%2F2PHo5glJ3qE%2B8Fv8yUR%2FUo3Gvb1xLk%2Fknv4RnDDGsVEgu75mz%2F1skJeZKuUxLb1%2FCQXLvR0r2DkLFDUic6OGPQhfUfhkqolMRWZLiy2VTKg%2FUsAs&X-Amz-Signature=ed742a035389e98f9c9d6ae3b79f794c7ef0c960c0550cb86162150f4b7e9fca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633HQW4YG%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T114811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEs6oezPXU%2Fq22Fu0yfn%2FSnNbKGjeBSh%2BqKjq%2FzC3k3kAiBDvSe%2B3EvrF7Q7BUBuMPFs6pMOVMISIyBMMsODTBUhDyr%2FAwhLEAAaDDYzNzQyMzE4MzgwNSIMtVfes99AjGRvhXIsKtwD%2Bm6iUhhz5g89szgJZlisSYTvJTxiiZiCUQ0k5Qk9sTwmDKbVzVbA%2BHKfIUQHF8HSZQCti%2BhKPq4k053DS7eSw8txjpu1Sn4Qq%2BT8Ex%2FclMDEU4EfDHbAZAJUFouZcWwjX6WjmPtYtCvkcT2os7IvvEZvewbb3STYNSLA1KHf3qveqgjEEy8DRoSus4hyune3wE%2B7dIzIHjmeSaqWHKaLw05kczmMz6GNAVV0X0XTznYor6t3vzbVEMENuU9WAD8nkZQNUyXxMrB0TVa4KEc5M3YQqtKEJRoK4rOdUA7l6zAiVhjZDqmdOy1JjdUmZ63GxYYivd5X3KLnOQJ39XQ7VJVwXsVq1Oi0X4cg6eYaHBe5ldltuP6BeHhux59LomWdSjgOo00WFumzmdsQNwI6qobszPBIkzQFiMEGrl2i3dPlZCddE6KuUeeqdd4QSvwSYDfQhdDvkXr%2FxTyFfofYpnLKPuEXK94iqVQj7f92Cm4DaZg9%2B0eYO2oARReSlW2eQqT2vYspGuavrOQlhU2C6R1K9T8gipax1ObexRlHJQ8Cml0XzVgnPjtJsA8jxRk5z5TOri2iezhnp0Uap7SZY73za3GujVdWqgyqHJQnoVS1fse6%2BTE4t8SUTOQw38SizwY6pgFU%2F6JTWFbkLYc7JKELXkKmB6jKXXcaAEFu1kPqNUk2ZsxE%2BK7AzpbwGOhBAF5dE5ZwIIy5Yp2m6ECC%2Fuj8JediMwCg%2FdCj9f3hdgFTyFs%2Fi0J%2F2PHo5glJ3qE%2B8Fv8yUR%2FUo3Gvb1xLk%2Fknv4RnDDGsVEgu75mz%2F1skJeZKuUxLb1%2FCQXLvR0r2DkLFDUic6OGPQhfUfhkqolMRWZLiy2VTKg%2FUsAs&X-Amz-Signature=ed742a035389e98f9c9d6ae3b79f794c7ef0c960c0550cb86162150f4b7e9fca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46622SAM26M%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T114811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID9N0QNvsfPnKCoJdCJ2Q7DdJorK6fFyiBAk2qZjlnesAiB4IdW3WgavQBF4%2Fde7Y%2Fmw8UNj5XyREuE%2BR%2B4xgaYJKir%2FAwhNEAAaDDYzNzQyMzE4MzgwNSIMr1262PDN0ZCu2%2BRHKtwDYLQt2y3J49vNr%2F3WmKsYF%2BexIgi%2B%2FyGZbZPGu3IQNvnc3BcHWDWIHUaQju6saeJir7e7nbfdLCJQlaiDA57gSVILydBFuzZk0HMM7%2BNFc9uYoz1uPcR23fJqUQSsjE1Ex4%2FR3YCVhQxJMKFLI37GmFFId9EUEiNQoy6T4eLOI6GCEM81xOOwKkx7uz%2BE7hobYHZZcriG3PW2s%2FEn5oRAVw5odcm9B07WEjOMESZuhaKnl888iUpyalL%2FR3%2FLLxaeRVBUt9O7B7OIa3wfQWUoSKDCny3Wi%2FYXAK%2BrxqTR7r2GuklwN0V%2BolpoqlkQP68hVJLhVGAJNQITpCkpMwUKBwEc2jKg73uRM%2BihJ%2FrLiKZngJ%2BPYoaQIhMmh51RAcKRkAkdcjgt%2BmJe4ya5%2FZWEGa8nX4B9KcqRfTyMRxdVC6WGU6vCjdHwOzuvm1sxVuvGG3o2dWtj8SMNNao9vpCnweKiX5piJ0fiW1oskqFc%2B3nuKzy%2Fx%2Fjew3dxyxXI3W61XkVy44kjWRMaPTSlnuWyAjwpzCcFowfPHmoPBWHXN3cSJueAIqKbO8DNlSY7T2VFtp5efmp1FRiAjhlPGsyPOs8vSw7lHHElaCcs5wXcO8Bc1PqtKFwm2%2FoRG%2FMwz%2BmizwY6pgEoqW%2F3iWTmEnxIjMBm79z8Yl%2FvRiThrCHf68ql3lvqCal12p5H%2BLJe45YzdS%2B02zNntgBE0QZgTTFqOHySyXzsBTretXSpKND96zkere8befiJjoIczSGgJDiPbqMj%2BBCeXNB4pny3qtWq7PIo4PasqLrQ2yK1Z%2FuyWTBDF4CHiM1R4uqYyVmmmKYoPKgNRgDwDvByl99JnYYrswJhn0xPdyPAnaER&X-Amz-Signature=b089c21919fdfb05af32baafec952a3edc1bca955e2e5000b7d30b73f327bfe1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVNIM3LJ%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T114815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEmTHNBUmSJatVVbrgPWBw3e%2FR3wufIavM6dvbKgfY5GAiAth5bhOM82vwATj5bObH2lQGSjF7VwEMs%2BTFqGS2bmFCr%2FAwhLEAAaDDYzNzQyMzE4MzgwNSIMwY8Qf90iVqGT9V9RKtwDJMWbsOxSTD9gYGPC%2Fj%2Fz9xmtPPo%2BN%2Bo90bGgWM%2BFRzXkUObSYo%2FmpTZYFst7DQgqjuXF3IE1at0XJjp5AqSf2ZyFtEvYWtJolKqg6%2BWndBBlpcPHbNykvRKsAHVXrzyQFeaoa2rFMvh04Icn9x%2F8JYVJyyB358Cn2FYnvlQday9hLYSbjVm5%2Bh1aibSFbnBrZ7IAEDXWyQtKy9D%2Fjghkyjgj1ZqxZevY0ruqmjFWnkfebXUny0qGf14S0viXVBSAJzpds4ar20B2GiMAlXOcr9dZ70hgla5PCjlHZtufF4WLr%2FCHDwemO%2F5Yv5Ej6zzfgPInCtjdCAsXInOrVGnZIPhdTl%2B2plf8lV8tChNT%2BVkCv2sZn%2BUeVgyFL6Udd6vmclPzVyAriCiG9X8%2FxNRuBauaOh0FpW3wGzf%2FJ0nCLq28UFxW7kKh13Q2SZ0FaQQX9vkPdegJJvAhXFOH3CjzYH%2FuFLbVGqV6Z9vi0I9Prua2%2FDPkkVPH%2Fyi6oFZf4A1uR18POcYhN%2BrjcyWliKCStdUShd6uGbL969z3ZbizJIir4w4oWIqKqe%2F1vhwNtWu47dpppQM07ObnJDzT1JpsZkIfrapvS4yNWklH2faP2iEukziqjmfT8OlKD60wscKizwY6pgFktorzopUDBqaatHbtKQOsOD0%2FVcna%2BCCury%2FmHs7fhWawgUHrsRXIrRuSHt8uBUWiCpC4dWBa4%2FMBz8U98JwRfUlAOdcZ1k2YHckXmNEQt4OFX4%2FUREr3kX2gH3x%2F1haYDjiG9M7pSxXvF4LdZWs5WjCvNNaNJoT4jDtmHUtYF4TOvNmmh8TwPVhcBifSW49oFdG%2BhKLbbNEjpVFDrav6eGqcpEEa&X-Amz-Signature=db407845ace9c6e918110075d108a8044c0adebacfeca0936d8d87682e3cabfa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVNIM3LJ%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T114815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEmTHNBUmSJatVVbrgPWBw3e%2FR3wufIavM6dvbKgfY5GAiAth5bhOM82vwATj5bObH2lQGSjF7VwEMs%2BTFqGS2bmFCr%2FAwhLEAAaDDYzNzQyMzE4MzgwNSIMwY8Qf90iVqGT9V9RKtwDJMWbsOxSTD9gYGPC%2Fj%2Fz9xmtPPo%2BN%2Bo90bGgWM%2BFRzXkUObSYo%2FmpTZYFst7DQgqjuXF3IE1at0XJjp5AqSf2ZyFtEvYWtJolKqg6%2BWndBBlpcPHbNykvRKsAHVXrzyQFeaoa2rFMvh04Icn9x%2F8JYVJyyB358Cn2FYnvlQday9hLYSbjVm5%2Bh1aibSFbnBrZ7IAEDXWyQtKy9D%2Fjghkyjgj1ZqxZevY0ruqmjFWnkfebXUny0qGf14S0viXVBSAJzpds4ar20B2GiMAlXOcr9dZ70hgla5PCjlHZtufF4WLr%2FCHDwemO%2F5Yv5Ej6zzfgPInCtjdCAsXInOrVGnZIPhdTl%2B2plf8lV8tChNT%2BVkCv2sZn%2BUeVgyFL6Udd6vmclPzVyAriCiG9X8%2FxNRuBauaOh0FpW3wGzf%2FJ0nCLq28UFxW7kKh13Q2SZ0FaQQX9vkPdegJJvAhXFOH3CjzYH%2FuFLbVGqV6Z9vi0I9Prua2%2FDPkkVPH%2Fyi6oFZf4A1uR18POcYhN%2BrjcyWliKCStdUShd6uGbL969z3ZbizJIir4w4oWIqKqe%2F1vhwNtWu47dpppQM07ObnJDzT1JpsZkIfrapvS4yNWklH2faP2iEukziqjmfT8OlKD60wscKizwY6pgFktorzopUDBqaatHbtKQOsOD0%2FVcna%2BCCury%2FmHs7fhWawgUHrsRXIrRuSHt8uBUWiCpC4dWBa4%2FMBz8U98JwRfUlAOdcZ1k2YHckXmNEQt4OFX4%2FUREr3kX2gH3x%2F1haYDjiG9M7pSxXvF4LdZWs5WjCvNNaNJoT4jDtmHUtYF4TOvNmmh8TwPVhcBifSW49oFdG%2BhKLbbNEjpVFDrav6eGqcpEEa&X-Amz-Signature=038ec239b08c1df057163c3b287dc5cd36029f0d59626601846eaa9abce91cd3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCTFNADU%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T114817Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCsAccYE80SuA8Z66DROpt2mDgPNI0pr7BlYu0tKyi13gIgBzfI2pap2R%2BKxpeJhKH6EIKGbVv23Ai7tcipIP79gM4q%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDDc4aRrhjWQOSFeP7ircAxkJlYoxrJl02FcTHY9UncUFKicQ2pw0Rfmk2NgEHyjoBnVeCuU3o81uLP3O1bhLMbwiNRJqOJLqKTW6AQWNLbTzzRD2lu765BKfJfE77HeQdC1T0K%2FYsfX5gLl9I1ma2PSq11wsO3UNkLodh4LnO7YpDJzGP%2FfXcWTLUfzu7nAgIX1gtJDEZ1Ej%2Ffp%2Baqc3pzjaUSvc9JeputaTgIzUZdvTDVFKOei8mzPU%2BumZjzaJc72WPVzV2f%2FRKiYxbRGx9c8FNfmqdk%2FKErB9nwNpoD%2Fcbt5qvWtkXb5pkwQxbnGUAKGpLTAocfLt%2FWjIhAG13%2BJvq0dfftNUYXAjxuGrAdEbCPqDDmrT3pmUd4obZPmKA74UwtUjKq7aUBBEf20S2%2BYjJNQzUvBuCtRE71Zn0sNV%2F40VtvV52h6KFbCmMvKiBSfJ8UcqjXKxP4Se6WXeBhViiQunA7re36jrI6JqtFt3yUAA%2BSivz3U%2FrgK0rfteCyA6Y7QRsjVwOSHeNkBu42P5M5pZzTOWib8MMqDsE5drExpBOomwrMjHY8r7AH9f6zGb8p4os0lLM2G0G8xDN27ALntnoYcCye9tZnNpbMlNIobXn%2BWmqsuVtAub%2BTjx3HTHlQ7RJJlcosiMMJDFos8GOqUB3lAayO4cHiz6KnfIcEAY0Vlz%2FMkA4eJCwqRxXXD6M7J112Oz07vBaSusTpcW2ONsfhQ3vYsfK%2FWHVSqmiwCZ9RvHzv8Pl3hgVhhLBm%2BgGcUe5KZ85Z00up1aVBgA3nVqPJ0x6tKERQfYdwcab3kXbgaMX9r8T%2BAgQFqtw2FOPKVqPdyyTd4M0rEfACbIZAv6puNzq4y2YVGwASl1RStJXixBDGr8&X-Amz-Signature=14bd644bcf3ab234c3d406949f54b8d6440f6e3c2ad04f5f5b461e568b2e8de3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ROYKOPQ%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T114817Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFpiCtH5KyTzNaVveuJCN8l%2FcnREEwRsggcM0Wo8cifiAiBI%2FKVRpmPmIsE0qBWX3FjDfJ6UUawgLviq%2BPZAnAE2iyr%2FAwhNEAAaDDYzNzQyMzE4MzgwNSIMKMo0u7vQZs9Szi3dKtwD%2FtcJ6skev%2FsSECHxkFpuu5VfDyf7mhpDDFOgQ%2Fc4PTK6HivWq%2BkCbo2Q5ed0N3ytTnp4EQadeBWxTMgHXPTjh4dp6gcA65P0Ye%2FCZcpWrtq33ldfU0t4W8Siz%2F%2B2bn64T7lsWm5hk7lHZcriExsb8UOVmor0AlanICNdPa79xURjcJrZt1KLWpo53QfXWqhkdbNzyBfMqX2g%2Fvv%2FINQuHc%2BkGATcucZNsUV5TR5QEvk5ONiwSeMMj6BSGDGSByhGlOaeGckgbiBTgmM%2FRNrEIdmHrfMOqvkgDfgEQXlFW358UU%2FdurvTOtIhIH5NQQZtLQ7RS0sizKLd14Ak4sgb0n2CDa%2BxHkMYdJlxXPF%2FhKk9x%2FXiGtBKfq42xRJA5MEJZHmAGcaRTEyI6YSslbi%2Fs9VTmEYZRc5Psbcyr9CY8SAy3H2ggi0nW763pvT9tto6K19X%2F5WRGvVlFh%2BFfABu7LZftCRR30qlkEnSeCPdCIDRO0ZpbeAVyOf%2BVwogbuc2nFnyAAngAXbyO7Y6sgMTWBliKrLHpUcGylBy55AQv0kWn8HOKmcXMxNOF%2FvTMBMzM6HxjcHfPkZShKy48LSYeZJ9sxQ8zQb%2BuniF%2BzPolBEdY5par%2B6vIet4%2B5Mw3%2BmizwY6pgGMGLswW%2FPPpaBb9s8%2F%2F8u3ueSBE2QvqaWrZM3u9tfJ22l7V%2B%2BLln%2B6bW9kCJ1m%2FZY4xg5v5iU1UfoFOPRn1WhEJ4VOzG%2BMg3BO5n2N0IZ6JXBdTZeQM7kWyAexPiCySgttFjqKnJgEzPFJ5UmRzDmxnIlB2SrQprTgWchM9iR5Ole%2F8CAyl48bWs3p5NpEfdRHcQrbYc8fY3sr1OJErJhd9v07dSN%2F&X-Amz-Signature=d0712fe6a11f54f699da76cfabcaa1134ce8a82fad32c90c9d859eb8afbea2e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3VTN4BE%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T114818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHkfvntKrBPhlNc9anSqM%2F9FheS7Xc9Oga%2B9VJZEkM%2FNAiEAkhm8ayUc0ZfhpjFzTLol0tqR1CAMr66zgn%2Bv%2BvRsZdAq%2FwMITRAAGgw2Mzc0MjMxODM4MDUiDCSEYtfIVVc7PxjWoCrcA39xPTl8hgQdk0JLLx%2F3OW%2FogjVH23uq%2F3at8jLIwjLDqlMhQzFjiVDO15byF2KfmyU8fD2mqkasuAaFeeM5za%2Bcig72zHLJLMPamMdVwHO541E9o3AZK6REpYeldXeP1FYPdVxJ1k7OFecs3atLGtaQMkvMGLiOIKIEvaFefhJHUo0nPbWxxjothogGBPMhXnpcSgtD%2F7myVMWptWAUYHPpO9GNA1gNjxvWrqGfAvCj7uXA94oB2N75WY54Bf2dTTkamiOk5TatV3X8z6enLiX3LXgcuzuelE2fMws4V7aTtk9gISFiojOWRnML4vxUwUHXiZwJyA3dSrFZKJMpbvW8gzQhdQ%2FosSjQjLVyycy021i1hJ1cGJ7s7gzrFzxc7dZRUCpeLnLeSvWFcPeo4jKbLxGV9OQrdf%2FCvJDmuras8oWiu9fdFYu1FuIf0kO89d5j1suUsCyz71m7ExKIxpq5KfrENTfm59hgucfA7UNlaTl%2Fa3%2FVYkIdS6AcoyyB2CcZpnMNXyVvI6590o%2B8ifZOeeQaNyI76gE2OAhONEKoZSgJYFgCDKZ7U%2BrhurFKBH11d%2Fklb5PObe8%2Fp2dThg3uoWBJMTY%2Bg%2FdTVLt%2BTMMQI2RHVrGiou%2FB1Dz5MOnpos8GOqUBly%2FG63Fe%2BLHSwv8d0vpfMmmRI1ejE%2BDTshkSw%2F082AQadzkvWpZ%2Baoi6x57yXWzfk4WHgO86l%2FdImTd4NStjmyIax2lpVB1y7j5WPzc1e3YQslnWHJlrf6qLTS81ifKP%2FBmNO0D4%2BgaGBxfsJmyQXfrz8TTPEt8WLY%2FKDc%2FeblpKgBwxe639KE%2F8TbnVyi0La5rk%2Fcuv8jYoy7ZUktndfHao0ZFc&X-Amz-Signature=4239ecfb3c83527fe87c5429ea1b5c1dad3fe5b5c873eb5f3ad17f19aa68ceb0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WAXBR2B3%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T114818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBmBOFr3eMqG6tUdxtxagQjGaPrXeNVU8cp%2B5UjC9sm9AiA%2F795XznXhSAEjq4ioO9Koq0pu3HpoNudx8%2BC9%2B0PJOSr%2FAwhNEAAaDDYzNzQyMzE4MzgwNSIM2q5JDi6R%2FNXWFaEUKtwDXsbs28ks58o%2FD%2Fni0I%2FB7tXOcTXd7P%2BQydAS5p0egwb02g%2F8wA71Uj0WwwaELMKfEk6qQnb2ii6P6ymNtewKRNww0Q0WkMhT%2BMGuPHRXKXZTpl%2F%2F9qh3Xp5QUmlmA6hFG7MxE4fkfK7MiNezuTfl%2FCcj0VsBXagOGOXcqYJ3dctPK%2F69exlwDeQMYaHloOQBT8h2VyifHyiPg44dcpnJBp7i69NrRi33x8tlZAlo92Csenydd6RAgDvx6%2Bj2KpH07%2FqHuGj%2Bv9Y4xeJ4QOcWoR89CgHiaxahjMvvD5bOgK1r%2FxNX0PNRVYrIItPmOw9drShLv64hAG%2BsQQ%2FeGDomf6OZoGLnUbkPDW0eFi9k9SvhDBIUzfXlUlFblS4QYzCx44hfFdFExnUQATR2qNbsOg97Wb0LJZMkaGY46se%2Bm9FojQTFl0mwl8l6MIFW6RpfJAFPpX5qPFn6PDKGWyFSlfEaFja4jBbDO7Zp9dD39OERmvJhz%2FN9IAb95sMe8xQiUj5C4GFySEvrLmeB5Ye5kVR5%2F6J15DcSvoHvWB%2BkMYj9nGQWJzllAV5UZmPuYvj556ABPO1%2FdKz%2FcE7s3f0V0hT%2Fo%2BlECWyqQ9kPbhZiNjVrBHgxEGW5p8AxJLMw%2BeiizwY6pgFictbqEhqn18esIfXpjngYgrt%2Fh7Iq5ajD0uai03YKtcrkptMgyME5nsJ16%2BFD%2BSsPvCheZZkayWdx0Do%2B5ilbttBoiqhKosi0RDIf6ybKXPiRVPI9Hs34PsIEjo%2BB3Lz4SPyT4R1js74DdASA84wwM%2BVqhERIr3vDoSRpUK%2BqEn3pQvMswGCRaJ3fpi8Aozp71IJJ%2BF6P2Es%2BySPG2UFoaeYcx4IM&X-Amz-Signature=b9e9faceafba5606411cf605f281a23d3fdb68bae33164a669f087bb4ea3b599&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WAXBR2B3%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T114818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBmBOFr3eMqG6tUdxtxagQjGaPrXeNVU8cp%2B5UjC9sm9AiA%2F795XznXhSAEjq4ioO9Koq0pu3HpoNudx8%2BC9%2B0PJOSr%2FAwhNEAAaDDYzNzQyMzE4MzgwNSIM2q5JDi6R%2FNXWFaEUKtwDXsbs28ks58o%2FD%2Fni0I%2FB7tXOcTXd7P%2BQydAS5p0egwb02g%2F8wA71Uj0WwwaELMKfEk6qQnb2ii6P6ymNtewKRNww0Q0WkMhT%2BMGuPHRXKXZTpl%2F%2F9qh3Xp5QUmlmA6hFG7MxE4fkfK7MiNezuTfl%2FCcj0VsBXagOGOXcqYJ3dctPK%2F69exlwDeQMYaHloOQBT8h2VyifHyiPg44dcpnJBp7i69NrRi33x8tlZAlo92Csenydd6RAgDvx6%2Bj2KpH07%2FqHuGj%2Bv9Y4xeJ4QOcWoR89CgHiaxahjMvvD5bOgK1r%2FxNX0PNRVYrIItPmOw9drShLv64hAG%2BsQQ%2FeGDomf6OZoGLnUbkPDW0eFi9k9SvhDBIUzfXlUlFblS4QYzCx44hfFdFExnUQATR2qNbsOg97Wb0LJZMkaGY46se%2Bm9FojQTFl0mwl8l6MIFW6RpfJAFPpX5qPFn6PDKGWyFSlfEaFja4jBbDO7Zp9dD39OERmvJhz%2FN9IAb95sMe8xQiUj5C4GFySEvrLmeB5Ye5kVR5%2F6J15DcSvoHvWB%2BkMYj9nGQWJzllAV5UZmPuYvj556ABPO1%2FdKz%2FcE7s3f0V0hT%2Fo%2BlECWyqQ9kPbhZiNjVrBHgxEGW5p8AxJLMw%2BeiizwY6pgFictbqEhqn18esIfXpjngYgrt%2Fh7Iq5ajD0uai03YKtcrkptMgyME5nsJ16%2BFD%2BSsPvCheZZkayWdx0Do%2B5ilbttBoiqhKosi0RDIf6ybKXPiRVPI9Hs34PsIEjo%2BB3Lz4SPyT4R1js74DdASA84wwM%2BVqhERIr3vDoSRpUK%2BqEn3pQvMswGCRaJ3fpi8Aozp71IJJ%2BF6P2Es%2BySPG2UFoaeYcx4IM&X-Amz-Signature=f546a7723b07624ead63a3716a029f105e1456f1d9df8772b0cffde8a738241f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TF2EL7CS%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T114810Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDNlAHwIJLuKQcDua053GBzEkyXoA%2B8U389Q5IKuLsKTgIgR%2FZ2DIUlnVzqoN%2BXa7naku7%2FGGSo%2Bk02osFUbqa5F5kq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDErzYi%2FynGf3uh6KuSrcA%2FNtuGUdyCbyOGnh0IJvZBbIsrKNslxQIkBd412ds2ERyB8%2B8%2B9CZ6OtbhmZlxMQJMlzXbgn%2FXFb7g%2FEtojSQ4xy19IO60So%2FvUFDKB29toB%2BYgRa9yWlbi1MgEsUGyMGMghYEdatCtcdq25yxHS%2BoOas%2BcceIhJuq5BqY2Ot9C%2Bm2WrJFqC6qku7m%2FzEXh4NMC8oaf8fat3%2FnHPeZH8wYIrGdrfRMO%2F1cu2nc8XowUxMUHs%2B6oSgT%2Fe2plx7ZiYPd2ziRMIrp7NjK9pp2EObmyTCgc%2FFrmWwrUf9mOOgItf0kam1a0Yzp037pipjlH1LwtdXknI82%2Bqph0jyl5496x%2FbQVno%2Bc5vaY4rvzZUB5asxEWnfrxmBxhI54vllXNpN%2FbvyJEKyO%2Fy3cmnMm%2FApzz5rFvdCQeww6isNBQbuu2dHpBNKhHGm9G0kY6yyoyMYizRkE8FAcRi8%2B5e3O1UyKskqFeEG2N2Rx3XyJ0KWJ6IUlLIGWmrcQ9hGinVQiGqncubbW973WWq%2BhMYhYSWie4gedI3mZNPaAuSCtZcJMiGT923JUvy0tdagU7ECugBVQxqcvp8XlYvvgE0XTQ2Y4fd11g5gijPTzRp%2Fwq%2Bjp8P7wMc1pSAGZ3g96TMKLFos8GOqUBiEJhtUQBIF1HvPaQXZCyLySfmLchTonXPqc0xziARSq09mtCgRfraIc1%2B0%2FXIWfg2vjFp7V3Kk%2FORNkIMw9pN30lqPHr84ZOs67FjEbxn8sRl5Xe%2FEONLuxkkl021FcTkjhtPM07M%2FEE85SI%2BsFI4hXovYeBAdksbqUmpnqaQ3pUy12qLg2cDFBfGvAZZNoFS8S6c9UXmzEQXRb6FpA%2FbQYLXmNr&X-Amz-Signature=42167d81b17df5539103aacb1961fdf495a2c553bc53870f7ea9c589c8bdf134&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SWTBTLZB%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T114819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDKk2XnwkHtjVj4xSs47xTgHVNtmLtRxy0Iv4qlTaT%2BmQIgPVRTwdrauljch2L6hMIWI3rYNKd4NaYqanOOcYth0ccq%2FwMISxAAGgw2Mzc0MjMxODM4MDUiDG5PeJDowrxq%2FctM5ircA0J0bOT9EOyNjHJVUNUZf0%2FEWI5a%2Fa%2BZ%2Fy87d%2B8sXV0H28K9m7qh2v5emsbP1mA7XouyPjGAEk5pXXKZIuTW8TLITe1bMPBZLlhpz4WHQghxmc9AgphnXO64D5szGz6cqzMTG5nS9rfYa6XPUCLKYze5p9UDsjJ0viYUKtgvdfyYoOwiCFIKMdjNa5JqD1%2BNYdxVQtm2mNbknX0CUfqwCcXABma7toISQnZlpb%2B2BlPf3g%2Fp0zo4aUwrFxP17bJIBOp%2FOK9cnflev1Q%2B8irqLvdEb%2Fwr7Osc8ROVL1ZvXbnSSRxJpsHeHehgNRewcE5rQlVpYX%2BbdSvMexD7U5CP0WzZTQdugkV0TKYduwKRRi%2BeTviZXH4pBf586KqSRj0x9ShknrcY1P4puFUwFFu32Wkiafmlle6U%2B1t9zn82anB7%2B6EauOTG8yydaln6JMVH5jLJZrhbaUos98KjUjgYxyleMhLUonZtQIr%2FU5tThkTstjBS%2BKxeW0%2FqQ8hhPdxB96drGtvTxIMeyPygkq7%2FAH%2Fg5KFCBBL1LuHfOOPjhdgwdPOhw1%2Bg9PkE%2FSyFoAtlgamWrxOnMfyGEidZxRGGLT9r1G8MxganLE4cUmeWjE0msIMGLmc9KqUpcjC2MLDEos8GOqUBFphkelYBZ%2BqkUUrclBgewFBKP1vT9TDuxAF3Tosj83qE9MqWih8c%2B4%2FyLHwzdPR4%2BCrGPkzmmx4d%2B34VXzM4AuzPjeojUp1y9uKBAcRqlrZLzwnP5cch%2ByCIoMJ86CWNIRq6Wyd6Xb1mJo72RrIAhhFngMo0Lrms21ajkfGyFYVIEv5RlPe3Thbq77%2Bm02lrgibvoXgXzurbmQeM9xKsKIS33wa1&X-Amz-Signature=e1a1554ff1113d8d93196deb4c779313ef582605ede95dedf8886c78810558da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SWTBTLZB%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T114819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDKk2XnwkHtjVj4xSs47xTgHVNtmLtRxy0Iv4qlTaT%2BmQIgPVRTwdrauljch2L6hMIWI3rYNKd4NaYqanOOcYth0ccq%2FwMISxAAGgw2Mzc0MjMxODM4MDUiDG5PeJDowrxq%2FctM5ircA0J0bOT9EOyNjHJVUNUZf0%2FEWI5a%2Fa%2BZ%2Fy87d%2B8sXV0H28K9m7qh2v5emsbP1mA7XouyPjGAEk5pXXKZIuTW8TLITe1bMPBZLlhpz4WHQghxmc9AgphnXO64D5szGz6cqzMTG5nS9rfYa6XPUCLKYze5p9UDsjJ0viYUKtgvdfyYoOwiCFIKMdjNa5JqD1%2BNYdxVQtm2mNbknX0CUfqwCcXABma7toISQnZlpb%2B2BlPf3g%2Fp0zo4aUwrFxP17bJIBOp%2FOK9cnflev1Q%2B8irqLvdEb%2Fwr7Osc8ROVL1ZvXbnSSRxJpsHeHehgNRewcE5rQlVpYX%2BbdSvMexD7U5CP0WzZTQdugkV0TKYduwKRRi%2BeTviZXH4pBf586KqSRj0x9ShknrcY1P4puFUwFFu32Wkiafmlle6U%2B1t9zn82anB7%2B6EauOTG8yydaln6JMVH5jLJZrhbaUos98KjUjgYxyleMhLUonZtQIr%2FU5tThkTstjBS%2BKxeW0%2FqQ8hhPdxB96drGtvTxIMeyPygkq7%2FAH%2Fg5KFCBBL1LuHfOOPjhdgwdPOhw1%2Bg9PkE%2FSyFoAtlgamWrxOnMfyGEidZxRGGLT9r1G8MxganLE4cUmeWjE0msIMGLmc9KqUpcjC2MLDEos8GOqUBFphkelYBZ%2BqkUUrclBgewFBKP1vT9TDuxAF3Tosj83qE9MqWih8c%2B4%2FyLHwzdPR4%2BCrGPkzmmx4d%2B34VXzM4AuzPjeojUp1y9uKBAcRqlrZLzwnP5cch%2ByCIoMJ86CWNIRq6Wyd6Xb1mJo72RrIAhhFngMo0Lrms21ajkfGyFYVIEv5RlPe3Thbq77%2Bm02lrgibvoXgXzurbmQeM9xKsKIS33wa1&X-Amz-Signature=e1a1554ff1113d8d93196deb4c779313ef582605ede95dedf8886c78810558da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QI2HJLBL%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T114820Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD5n9ACwup0NOwsUWTbVUGmVC4RCmO%2BpGCIcQTYEMLh5AIgXGm74fZcZZD94KDxgM7JmJ9yg3xS%2B%2FB8PW0YMCT0VI8q%2FwMITRAAGgw2Mzc0MjMxODM4MDUiDC15y4UEYGoUvp%2F7iircA66PfEpv2obx8b5aPL7HeWS%2BAcopw3zc%2FDgoKWpn4eXorTtydOT2W8to3%2FiuSpcRKlkialmpjr7hX0TnhUO5I3NNN5bPrkh6OGvwTLJvAwWMc2sDAGaF9FehB8Os0PmpoWcSJKp6lNoyF7NRnBn7ww1M9azHcdoiFYCa5KHpvIFeiJFd%2FFqMZGEpld7MeXqhZEbhr1Fy0zcp3bnoK82yi2zFh%2FW4t377zzdQt1CgKmfqyckDns%2B3sY6JwIxCwL30yy66OTKHjx8lCKyUnyxyDYAB%2F2ewZLZetiSsQYSEs6s50WukKYMK8p8DisT55n0gmF7pxozudjmShTMp65by4cEwBiMIlP5VH7OVKvzl%2Bj4cvR5Z77e7lODzWHw%2FmwgXKgsCHMrLe9RsijsgRQFYeW7ZEunx4vfoFCed%2FT4U3jalpQRbYqONSEiopor48Fd7maXv55Qma3cj0C4bAD%2FVYUPL8wyXMEW%2FMyEQhYvuRBTaetd4G2twthat%2B1zGaj3IwEpgDnCIMBcamni7BwFFGdcBMz3ptXbJ9ORLoVp7nTeUJae6qSrVi13cVDFBrS2RVs87rirtP78gwPAO3X8XKvEWWgRjENxB8G%2FS517MoaUYjOy3A3OfzixnWH4CMO3oos8GOqUBIvFP9kTVZ%2F6egdmSuU8LsYSNOshFe6PDhThbcD2iBfDHtgQbsBMzh7tm%2BAfCeBBopEmNWpNjuUYzpYy%2FVt3mt9nx8AR2%2BNgubZCy4wN3S4s51ulq3ibbHwhOejA3ndZYFN5r5CpEt1RrC%2FLpUclSdmiGwraSY1h3HbO1T%2Fj7v%2Fij9IRWxQRlkohxsFu%2BIWCh%2FCZwJv4akXBdtoDQKQzBROHPq4pA&X-Amz-Signature=8a808df9510e9f987060674ce376e0a1bbb5671ea325da192b90f8c8313250ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

