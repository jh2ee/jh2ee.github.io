---
layout: post
date: 2025-08-07
title: "[논문 리뷰] Differential Transformer"
tags: [Transformer, ICLR2025]
categories: [Paper Review]
---

> [Ye, Tianzhu, et al. "Differential transformer." ](https://arxiv.org/abs/2410.05258)[_arXiv preprint arXiv:2410.05258_](https://arxiv.org/abs/2410.05258)[ (2024).](https://arxiv.org/abs/2410.05258)



## Introduction

- Transformer의 핵심은 attention mechanism
- attention machanism은 softmax 함수를 통해 token의 중요도를 평가
- 그러나 LLM은 context에서 핵심 정보를 정확히 파악하는 데 어려움을 겪음

	> [Lost in the Middle: How Language Models Use Long Contextshttps://arxiv.org/abs/2307.03172](https://arxiv.org/abs/2307.03172)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9083ea56-691a-4752-ae26-47f403431ac8/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y3ENDXQN%2F20250820%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250820T170059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA8YFMBtiaMwQBMzbb8OlzIt0CE%2FrxHO8gv%2BC%2BM7EFlRAiAf1rJAX7OGvwwW%2BDGow3oaqMBEdQE1Bhg%2B0oC1mmnYNSqIBAja%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQoZc%2BQHuMatXoqd5KtwDjJnf8dzWMm9sYWVITIuvAscSMDC3DpxEY15YVtK4wIuirX3qfGnFmSGFRx4tmBqtN8Czng1%2Fhevn6pREQzmOPbudSc4bD63Rc%2FLEqKLckgOtfq9wtiB5UBGpZNW%2Fpt%2BhpR6c%2Bd6BTdOJjFlBpaJiAwr892EWW946hJf0GSj1gHc14RMPjJN6WjXt43n8%2BUn1z2yRy7Vh2jJGPnKf6OVmC9H%2FhQO5meYPLWn91qS0SSJu8RGgSUVX6HXz%2Bt1QkHbdAHV%2Bu6YjfPd4lTR1sRgoDk3TipJuXFkEag3KvpzpyQ9H09vZvWwyqLuE0FgY5KKoPNkJRrgrC%2BqwfONpm31JnYuX0emJsc%2Fz6OpqzR4YoB7uCg5z4lA7nz3mChQb1%2FT4e7K5cpypT6GOo2l5YSEi5%2BML4LFt7UXFsCYulKb3m%2FAq5DYGSsoFYohB2ob5N579MwvmVMZPvBGs0%2BTbI%2FC1MKgbzAecjXvT3DnfPk%2BWlIGKdjHxkQRNm0aULfRGEUHyPdT1VOOZ5NZ9FaaVb5XojhRXMFSEfR4p3yjsVCuxfZSWi2avtFN%2BmE5vUjSJA24v0EwOYb%2FUAWIF6g9g6oBDOVPTusU%2B9PZqQgL6P3MlX0Jw%2BsO6ERH%2BZklb2MYwvPCXxQY6pgEVzPCxtES4rzZCncYBXlVChy9L5Gd8qbS3I%2Fwjj3S4p%2FWAPZQ6EmH0h7xx66eWPNilfepkaLYxXn7NEPDCDQApa2SiW6uyqdItxtKBZart5a74NTYj0IclLI8nCs%2FdpdNbkwAZMrFMV0VZlL%2Fij14Inu12qNvuXJtgBFK0M8%2FTa7Y7X%2FomTLKRdQ2PWLh4GQO1KH%2BrsSO5PXKsN7lT9tFDQO2pt086&X-Amz-Signature=b4f0867db101a35872f167cb2b0e9ae87d3968e7de130f2a5518ed0b5b27f801&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


Figure 1의 왼쪽 그림을 보면 Transformer model이 정답에 낮은 attention score를 할당한 경향성을 확인할 수 있다.

- 현재 transformer model에 나타나는 _**attention noise **_문제 해결 필요성

	_**→ differential denoising**_을 이용한 _**differential attention mechanism**_ 제안


		<span class="notion-red">향상된 성능은 Figure 1의 두 세번째 그림 통해 확인 가능하다.</span>


> 💡 


	### Attention noise?


	: 정답이 아닌 token들에 나타나는 attention score



## Methods



### Differential-Transformer


기존 Transforme architecture와의 주된 차이점은 아래와 같다.

- Differential attention module
- pre-RMSNorm
- SwiGLU activation function

pre-RMSNorm과 SwiGLU의 경우 LLaMA에서 채택한 방법이라고 소개한다.



#### Differential Attention


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/116d70b2-1963-4810-9167-f4c7d8a06e8f/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y3ENDXQN%2F20250820%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250820T170059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA8YFMBtiaMwQBMzbb8OlzIt0CE%2FrxHO8gv%2BC%2BM7EFlRAiAf1rJAX7OGvwwW%2BDGow3oaqMBEdQE1Bhg%2B0oC1mmnYNSqIBAja%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQoZc%2BQHuMatXoqd5KtwDjJnf8dzWMm9sYWVITIuvAscSMDC3DpxEY15YVtK4wIuirX3qfGnFmSGFRx4tmBqtN8Czng1%2Fhevn6pREQzmOPbudSc4bD63Rc%2FLEqKLckgOtfq9wtiB5UBGpZNW%2Fpt%2BhpR6c%2Bd6BTdOJjFlBpaJiAwr892EWW946hJf0GSj1gHc14RMPjJN6WjXt43n8%2BUn1z2yRy7Vh2jJGPnKf6OVmC9H%2FhQO5meYPLWn91qS0SSJu8RGgSUVX6HXz%2Bt1QkHbdAHV%2Bu6YjfPd4lTR1sRgoDk3TipJuXFkEag3KvpzpyQ9H09vZvWwyqLuE0FgY5KKoPNkJRrgrC%2BqwfONpm31JnYuX0emJsc%2Fz6OpqzR4YoB7uCg5z4lA7nz3mChQb1%2FT4e7K5cpypT6GOo2l5YSEi5%2BML4LFt7UXFsCYulKb3m%2FAq5DYGSsoFYohB2ob5N579MwvmVMZPvBGs0%2BTbI%2FC1MKgbzAecjXvT3DnfPk%2BWlIGKdjHxkQRNm0aULfRGEUHyPdT1VOOZ5NZ9FaaVb5XojhRXMFSEfR4p3yjsVCuxfZSWi2avtFN%2BmE5vUjSJA24v0EwOYb%2FUAWIF6g9g6oBDOVPTusU%2B9PZqQgL6P3MlX0Jw%2BsO6ERH%2BZklb2MYwvPCXxQY6pgEVzPCxtES4rzZCncYBXlVChy9L5Gd8qbS3I%2Fwjj3S4p%2FWAPZQ6EmH0h7xx66eWPNilfepkaLYxXn7NEPDCDQApa2SiW6uyqdItxtKBZart5a74NTYj0IclLI8nCs%2FdpdNbkwAZMrFMV0VZlL%2Fij14Inu12qNvuXJtgBFK0M8%2FTa7Y7X%2FomTLKRdQ2PWLh4GQO1KH%2BrsSO5PXKsN7lT9tFDQO2pt086&X-Amz-Signature=f249ea29231c1be2f64eb659e233d662c3c9f48008108792052b44492f8371ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


Differential attention mechanism은 두 개의 softmax attention map 간의 차이를 attention score로 계산한다.

- X \in \R^{N \times d\_{model}} : given input
- Q\_1,Q\_2,K\_1,K\_2 \in \R^{N \times d} : Query, Key
- V \in \R^{N \times 2d} : Value
- W^Q,W^K,W^V \in \R^{d\_{model} \times 2d} : parameters
- \lambda : learnable scalar

라고 할 때 Differential attention operator는 아래와 같다.


$$
[Q_1;Q_2]=XW^Q, \space [K_1;K_2]=XW^K, \space V=XW^V \\
DiffAttn(X) = (softmax(\cfrac{Q_1K^T_1}{\sqrt{d}}) - \lambda \space softmax(\cfrac{Q_2K^T_2}{\sqrt{d}}))V
$$


이때,

- DiffAtten(X) \in \R^{N \times 2d}

의 shape을 갖게 된다.


기존의 Transformer가 단일 softmax 함수를 이용해 attention score를 계산했다면 Diff-Transformer의 경우 두 개의 softmax 함수를 이용한다고 했다. 이를 위해서 query와 key를 생성하는 과정에서 각각 2개로 split 해주는 것이다. <span class="notion-red">(첫 번째 수식, </span><span class="notion-red">_Q, K, V를 생성하는 matrix W가 2d의 dismension을 가지는 이유도 split 때문_</span><span class="notion-red">)</span>


 λ의 경우 두 softmax attention map 간의 차이를 조정하기 위한 scaler로 두 개의 attention map

- A\_1 = softmax(\cfrac{Q\_1K^T\_1}{\sqrt{d}}) : 주요 신호(relevant context)와 noise 포착하도록 설계된 map
- A\_1 = softmax(\cfrac{Q\_2K^T\_2}{\sqrt{d}}) : noise 성분, 패턴 포착하도록 설계된 map 

에 대해 최적의 denoising 강도를 학습한다.


저자들은 introduction에서 노이즈 캔슬링 헤드폰을 예로 들어 설명한다. 쉽게 말해 Differential Attention을 노이즈 캔슬링이라고 생각하면 **A\_1****은 소음이 포함된 음악**이고, **A\_2****는 제거되는 소리(noise +a)**라고 생각하면 되겠다. 


이때 두 map의 차이가 우리가 순수하게 듣고 싶은 음악이 되는 것이다. 


만약 과도하게 소리를 제거하게 되면 우리가 듣고 싶은 음악의 소리도 제거할 수 있기 때문에 ** λ를 학습해 최적의 노이즈 캔슬링 효과**를 얻고자 하는 것이다.


λ는 learning dynamics와 동기화를 위해 re-parametrize 된다.


$$
\lambda = exp(\lambda_{q_1} \cdot \lambda_{k_1}) - exp(\lambda_{q_2} \cdot \lambda_{k_2}) + \lambda_{init}
$$

- λ\_{q\_1} , λ\_{k\_1} , λ\_{q\_2} , λ\_{k\_2} ∈ R^d : learnable vector
- λ\_{init} \in (0,1) : 초기화 위한 constant, 0과 1 사이값
	- 논문의 실험은 λ\_{init} = 0.8 − 0.6 × exp(−0.3 · (l − 1)) 로 초기화해 진행
		- l \in [1,L] : layer index
	- 단순히 0.8로 사용하는 것도 robust함


#### **Multi-Head Differential Attention**


Diff-Transformer 역시 multi-head attention을 지원한다.

- _h = d\_{model}/2d__ _: attention head의 수
- W^Q\_i,W^K\_i,W^V\_i,i \in [1,h] : projection matrix
- W^O \in \R^{d\_{model} \times d\_{model}} : projection matrix

라고 했을 때,


$$
head_i = DiffAttn(X;W^Q_i,W^K_i,W^V_i,\lambda) \\
\bar{head_i} = (1-\lambda_{init}) \cdot LN(head_i) \\
MultiHead(X) = Concat(\bar{head_i},\space ... \space , \bar{head_h})W^O
$$


결과적으로 output은

- MultiHead(X) \in \R^{d\_{model} \times d\_{model}}

의 shape을 가진다.



#### Overall Architecture


그림에 표현된 Diff-Transformer block을 수식으로 표현하면 아래와 같다.


$$
Y^l = MultiHead(LN(X^l)) + X^l \\
X^{l+1} = SwiGLU(LN(Y^l)) + Y^l
$$


figure에는 표현하지 않았으나 MultiHead 이후, Normalize 이후 residual connection이 존재한다.


---


vanilla Transformer를 대체할만한 architecture인지는 조금 더 지켜봐야 할 것 같지만 실험 결과들만 보았을 때 parameter 측면에서, noise 제거 측면에서 꽤 괜찮은 성능을 보이는 것 같다. 구현 또한 어려운 편이 아니라 관련 연구들이 곧 쏟아져 나오지 않을까,,,

