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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9083ea56-691a-4752-ae26-47f403431ac8/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZVB5PSY%2F20251007%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251007T132125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJHMEUCIAIhy2uAWHD%2BNyKPl9S%2FTYIwXybRvOtrizeBkUE1aClYAiEAwvDu9WUKK2s8%2FPyjLJXntcW9BymuucHaG98n0bmSwW4qiAQIpv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH1Um5ZrUZV%2B8eFtkircA%2FX7bfX%2FsiaF6%2F6ZOjXJ8cGo3V6neZcJtLYhZw%2FCsVaBoNIn6k4YWBUVDE8lrzn1kBLU5tVphtkjhro4G6ODPRLdFzdu2HlCIhsjNh47m7zlPVR%2FuVTwanf3DadtNehyLCWA0wdx3STtkBZZy18R7iqg1Tiwy%2F3L036QpGuIngn2cRshQGnTe2JcolOydS78wd0BmsykJeedIBUKEtvM7qPidLIQEZLpzf%2BBQnpSVAyeIk98lhOi0zFeUQhRphiatLUcEChFEfFNKSXetrMkCF0w9ogAyFkPbqAtwMbjcQl5THbZqNHvsltCTD7UIT5GxhMe2X8YCDxaAY6TT4gkjY3sOGYY3j%2FwUmNOeMxYLzNBY9Im%2FTCCXXSjnc%2FWF0Tr56Mgn7cU5%2BuL7z69hK3lUqof59PrKbcoOmcMCi6ipLOwvz9eHK0FXP6IcUnoDzzTBd2eulJbypSnCb11S%2FMgz1ajJb0uo7u6T%2FgIBNT9wU5dY7ld8hubh%2F71Iw8K2%2FmbNDfTj4ZJ2rZXHe0iTqJOmr6E1s16SQEAnLhg2N%2BBPF3mZ1NTl811%2BQtZ8%2F5CEfsMm0m8JHeiBftBoXoVFB2VxfWjhwzv5B4%2BgnZJ2kOuUT9WquSqeq5Q0HAM%2FWP2MJ2elMcGOqUB4zLCxYt%2FwfJkW4woFjktqQhnYZuNUXLDsC2ZsWEUJw3Jl2kYYIBikmUiL5cPA3Mjj%2B0cmt%2BGGgVEfdQJ7PxIHav%2BD0s%2Ba9zGqn%2FrI8Ncl5%2F745ocu02jO9yke%2FhuojAbzOmGltX3zI5N7SNscgjNYyoMWMOkFy0hmxtkukzL%2BMxNu3d7Ju0EwbQOU65U7BXxt042wfnAE%2BQKSgAbwcMFM4hw9G4l&X-Amz-Signature=6becc3971af9b253d38c7e3b05065631ed07fa64c77a6fb052aa985e85477799&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/116d70b2-1963-4810-9167-f4c7d8a06e8f/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZVB5PSY%2F20251007%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251007T132125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJHMEUCIAIhy2uAWHD%2BNyKPl9S%2FTYIwXybRvOtrizeBkUE1aClYAiEAwvDu9WUKK2s8%2FPyjLJXntcW9BymuucHaG98n0bmSwW4qiAQIpv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH1Um5ZrUZV%2B8eFtkircA%2FX7bfX%2FsiaF6%2F6ZOjXJ8cGo3V6neZcJtLYhZw%2FCsVaBoNIn6k4YWBUVDE8lrzn1kBLU5tVphtkjhro4G6ODPRLdFzdu2HlCIhsjNh47m7zlPVR%2FuVTwanf3DadtNehyLCWA0wdx3STtkBZZy18R7iqg1Tiwy%2F3L036QpGuIngn2cRshQGnTe2JcolOydS78wd0BmsykJeedIBUKEtvM7qPidLIQEZLpzf%2BBQnpSVAyeIk98lhOi0zFeUQhRphiatLUcEChFEfFNKSXetrMkCF0w9ogAyFkPbqAtwMbjcQl5THbZqNHvsltCTD7UIT5GxhMe2X8YCDxaAY6TT4gkjY3sOGYY3j%2FwUmNOeMxYLzNBY9Im%2FTCCXXSjnc%2FWF0Tr56Mgn7cU5%2BuL7z69hK3lUqof59PrKbcoOmcMCi6ipLOwvz9eHK0FXP6IcUnoDzzTBd2eulJbypSnCb11S%2FMgz1ajJb0uo7u6T%2FgIBNT9wU5dY7ld8hubh%2F71Iw8K2%2FmbNDfTj4ZJ2rZXHe0iTqJOmr6E1s16SQEAnLhg2N%2BBPF3mZ1NTl811%2BQtZ8%2F5CEfsMm0m8JHeiBftBoXoVFB2VxfWjhwzv5B4%2BgnZJ2kOuUT9WquSqeq5Q0HAM%2FWP2MJ2elMcGOqUB4zLCxYt%2FwfJkW4woFjktqQhnYZuNUXLDsC2ZsWEUJw3Jl2kYYIBikmUiL5cPA3Mjj%2B0cmt%2BGGgVEfdQJ7PxIHav%2BD0s%2Ba9zGqn%2FrI8Ncl5%2F745ocu02jO9yke%2FhuojAbzOmGltX3zI5N7SNscgjNYyoMWMOkFy0hmxtkukzL%2BMxNu3d7Ju0EwbQOU65U7BXxt042wfnAE%2BQKSgAbwcMFM4hw9G4l&X-Amz-Signature=e9c283dff35d06ff921d3e15558485deefde9f11b62374d497c04db6f6c75c63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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

